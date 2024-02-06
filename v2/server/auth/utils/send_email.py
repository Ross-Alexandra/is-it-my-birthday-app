import smtplib
import os

web_email = """From: No Reply <{sender}>
To: {name} <{receivers}>
Subject: Verify your login

Please click on the following link to verify your login attempt:
{link}

WARNING: This link is as good as your password, and can be used to login to your account for
the next 10 minutes (or until you use it!). Never share this link with anyone.

P.S. Don't forget to check if it's your birthday today! You never know...
"""

mobile_email = """From: No Reply <{sender}>
To: {name} <{receivers}>
Subject: Verify your login

Please use the following code to verify your login attempt:
{link}

WARNING: This code is as good as your password, and can be used to login to your account for
the next 10 minutes (or until you use it!). Never share this code with anyone.

P.S. Don't forget to check if it's your birthday today! You never know...
"""

def get_environment():
    return os.environ.get('IIMB_ENV', 'prod')

def get_link(email, link_secret):
    if get_environment() == 'prod':
        return f"https://isitmybirth.day/login?v={link_secret}"
    else:
        return f'http://localhost:8080/login?v={link_secret}'
    
def send_email(email, name, link_secret, is_mobile=False):
    sender = 'no_reply@isitmybirth.day'
    receivers = [email]

    base_message = web_email if not is_mobile else mobile_email
    link = get_link(email, link_secret) if not is_mobile else link_secret

    message = base_message.format(sender=sender, name=name, receivers=receivers[0], link=link)

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
