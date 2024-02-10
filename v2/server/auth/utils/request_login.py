from datetime import datetime

from .generate_unique_url import generate_unique_url
from .send_email import send_email

def request_login(cnx, user_id, name, email, is_mobile=False):
    cur = cnx.cursor()
    
    cur.execute('DELETE FROM login_attempts WHERE user_id = %s', (user_id,))
    cnx.commit()
    
    email_secret = generate_unique_url()
    cur.execute('INSERT INTO login_attempts (user_id, login_secret, attempted_at) VALUES (%s, %s, %s)', (user_id, email_secret, datetime.utcnow()))
    cnx.commit()
    
    send_email(email, name, email_secret, is_mobile)
