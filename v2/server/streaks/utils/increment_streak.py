def increment_streak(cnx, user_id, streak_type):
    cur = cnx.cursor()
    
    current_streak_query = '''
        SELECT
            current_streak
        FROM
            streaks
        WHERE
            user_id = %s AND
            streak_type = %s
    '''
    cur.execute(current_streak_query, (user_id, streak_type))
    current_streak, = cur.fetchone()
    
    increment_streak_query = '''
        UPDATE streaks
        SET
            current_streak = %s,
            last_check_in = NOW()
        WHERE
            user_id = %s AND 
            streak_type = %s
    '''
    cur.execute(increment_streak_query, (current_streak + 1, user_id, streak_type))

    cnx.commit()
