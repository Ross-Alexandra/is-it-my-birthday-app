def reset_streak(cnx, user_id, streak_type):
    cur = cnx.cursor()
    
    reset_streak_query = '''
        UPDATE streaks
        SET
            current_streak = 1
            last_check_in = NOW()
        WHERE
            user_id = %s AND 
            streak_type = %s
    '''
    cur.execute(reset_streak_query, (user_id, streak_type))

    cnx.commit()
