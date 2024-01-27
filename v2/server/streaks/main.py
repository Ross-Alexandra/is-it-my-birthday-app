from datetime import datetime, timedelta
from fastapi import Request
import os

from shared.auth import OptimisticAuthMiddleware
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
    
    if (user_id is None):
        return {'error': 'not_logged_in'}
    
    cnx = get_db_connection()
    cur = cnx.cursor()
    
    today = datetime.now().date()
    
    birth_query = 'SELECT birth_day, birth_month FROM users WHERE id = %s'
    cur.execute(birth_query, (user_id,))
    birth_day, birth_month = cur.fetchone()
    
    streak_type = 'birthday' if (birth_day == today.day and birth_month == today.month) else 'daily'
    
    prev_streak_query = 'SELECT current_streak, last_check_in FROM streaks WHERE user_id = %s AND streak_type = %s'
    cur.execute(prev_streak_query, (user_id, streak_type))
    res = cur.fetchone()
    
    if (res is None):
        create_streak_query = 'INSERT INTO streaks (user_id, streak_type, current_streak, last_check_in) VALUES (%s, %s, 1, NOW())'
        cur.execute(create_streak_query, (user_id, streak_type))
        cnx.commit()
        
        return {'success': True}
    
    current_streak, last_check_in = res
    
    if (today - current_streak < timedelta(days=1)):
        return {'error': 'already_checked_in_today'}
    
    should_reset_streak = should_reset_streak(streak_type, last_check_in, today)
    
    if (should_reset_streak):
        increment_streak(cnx, user_id, streak_type, current_streak)
    else:
        reset_streak(cnx, user_id, streak_type)
        
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
