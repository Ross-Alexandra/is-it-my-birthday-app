from datetime import timedelta

def should_reset_streak(streak_type, last_check_in, today):
    if (streak_type == 'birthday'):
        return last_check_in.day == today.day and last_check_in.month == today.month and last_check_in.year == today.year - 1
    else:
        return timedelta(days=2) > today - last_check_in > timedelta(days=1)

