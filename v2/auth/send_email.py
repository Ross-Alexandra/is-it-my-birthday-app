import smtplib
import os

def get_environment():
    return os.environ.get('IIMB_ENV', 'prod')

def get_link(email, link_secret):
    if get_environment() == 'prod':
        return f"https://isitmybirth.day/login?v={link_secret}"
    else:
        return f'http://localhost:8080/login?v={link_secret}'
    
def send_email(email, name, link_secret):
    sender = 'no_reply@isitmybirth.day'
    receivers = [email]

    message = f"""From: No Reply <{sender}>
To: {name} <{receivers[0]}>
Subject: Verify your login

Please click on the following link to verify your login attempt:
{get_link(email, link_secret)}

WARNING: This link is as good as your password, and can be used to login to your account for
the next 10 minutes (or until you use it!). Never share this link with anyone.

P.S. Don't forget to check if it's your birthday today! You never know...
"""

    if get_environment() == 'prod':
        _send_smtp_email(sender, receivers, message)
    else:
        print('pseudo email sent:')
        print(message)

def _send_smtp_email(sender, receivers, message):
    try:
        smtpObj = smtplib.SMTP('localhost')
        res = smtpObj.sendmail(sender, receivers, message)
        print(f"Successfully sent email")
    except Exception as e:
        print(f"Error: unable to send email: {e}")
