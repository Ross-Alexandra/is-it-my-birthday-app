from datetime import datetime, timedelta
from fastapi import Request
import os

from shared.auth import OptimisticAuthMiddleware
from shared.constants import DEMO_USER_ID
from shared.cors_app import CorsApp
from shared.db import get_db_connection

from utils.increment_streak import increment_streak
from utils.reset_streak import reset_streak

environment = os.environ.get('IIMB_ENV', 'prod')

app = CorsApp(environment)
app.add_middleware(OptimisticAuthMiddleware)

@app.get('/check_in')
def check_in(request: Request):
    user_id = request.state.user_id
    user_offset_minutes = int(request.headers.get('X-USER-TIMEZONE', 0))
    
    if user_id is None or user_id == DEMO_USER_ID:
        return {'error': 'not_logged_in'}
    
    cnx = get_db_connection()
    cur = cnx.cursor()
    
    local_today = datetime.utcnow() - timedelta(minutes=user_offset_minutes)
    
    birth_query = 'SELECT birth_day, birth_month FROM users WHERE id = %s'
    cur.execute(birth_query, (user_id,))
    birth_day, birth_month = cur.fetchone()
    
    is_birthday = birth_day == local_today.day and birth_month == local_today.month
    
    prev_streak_query = 'SELECT last_check_in FROM streaks WHERE user_id = %s ORDER BY streak_type ASC LIMIT 1'
    cur.execute(prev_streak_query, (user_id,))
    res = cur.fetchone()
    
    if (res is None):
        create_streak_query = 'INSERT INTO streaks (user_id, streak_type, current_streak, last_check_in) VALUES (%s, %s, 1, NOW())'
        cur.execute(create_streak_query, (user_id, 'daily'))
        if (is_birthday):
            cur.execute(create_streak_query, (user_id, 'birthday'))
        
        cnx.commit()
        return {'success': True}
    
    last_check_in, = res
    local_last_check_in = last_check_in - timedelta(minutes=user_offset_minutes)
    
    if (local_today.date() <= local_last_check_in.date()):
        return {'error': 'already_checked_in_today'}
    
    # If the user's last birthday check-in was exactly a year ago, and today is
    # their birthday, then increment their streak. Otherwise, reset their streak
    if (is_birthday):
        last_birth_check_in_query = "SELECT last_check_in FROM streaks WHERE user_id = %s AND streak_type = 'birthday'"
        cur.execute(last_birth_check_in_query, (user_id,))
        last_birth_check_in = cur.fetchone()

        if (last_birth_check_in is None):
            create_streak_query = 'INSERT INTO streaks (user_id, streak_type, current_streak, last_check_in) VALUES (%s, %s, 1, NOW())'
            cur.execute(create_streak_query, (user_id, 'birthday'))
            cnx.commit()
        elif (last_birth_check_in - timedelta(minutes=user_offset_minutes) == local_today.date().replace(year=local_today.year - 1)):
            increment_streak(cnx, user_id, 'birthday')
        else:
            reset_streak(cnx, user_id, 'birthday')
    
    # Regardless of whether or not it's the user's birthday today, increment their
    # daily streak if they checked in yesterday. Otherwise, reset their streak.
    if (local_today.date() == (local_last_check_in + timedelta(days=1)).date()):
        increment_streak(cnx, user_id, 'daily')
    else:    
        reset_streak(cnx, user_id, 'daily')
        
    return {'success': True}
    
@app.get('/top_streaks')
def top_streaks(request: Request):
    daily_top_streaks_query = '''
        SELECT
            users.id as id,
            display_name as name,
            current_streak as streak
        FROM 
            users INNER JOIN streaks ON users.id = streaks.user_id
        WHERE
            streak_type = 'daily' AND
            last_check_in > SUBDATE(NOW(), INTERVAL 2 DAY)
        ORDER BY 
            current_streak 
        DESC
        LIMIT 10;
    '''
    
    birthday_top_streaks_query = '''
        SELECT
            users.id as id,
            display_name as name,
            current_streak as streak
        FROM 
            users INNER JOIN streaks ON users.id = streaks.user_id
        WHERE
            streak_type = 'birthday' AND
            last_check_in > SUBDATE(NOW(), INTERVAL 366 DAY)
        ORDER BY 
            current_streak 
        DESC
        LIMIT 10;
    '''
    
    streak_type = request.query_params.get('streak_type', 'daily')
    
    if (streak_type == 'daily' or streak_type == 'birthday'):
        cnx = get_db_connection()
        cur = cnx.cursor(dictionary=True)
        
        top_streaks_query = daily_top_streaks_query if (streak_type == 'daily') else birthday_top_streaks_query
        cur.execute(top_streaks_query)
        
        res = cur.fetchall()
        
        if (res is None):
            return {'error': 'no_streaks_found'}
        else:
            return {'success': True, 'streaks': res}
    else:
        return {'error': 'invalid_streak_type'}    
