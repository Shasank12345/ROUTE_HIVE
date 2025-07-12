import smtplib
from random import randint, choices
import string
from email.mime.text import MIMEText
from config import Config

def generate_otp():
    return str(randint(100000, 999999))

def generate_password(length=10):
    characters = string.ascii_letters + string.digits
    return ''.join(choices(characters, k=length))  

def send_email(to_email, otp):
    msg = MIMEText(f'Your OTP is: {otp}')
    msg['Subject'] = 'Password Reset OTP'
    msg['To'] = to_email
    msg['From'] = Config.MAIL_USERNAME 

    try:
        with smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
            server.sendmail(Config.MAIL_USERNAME, to_email, msg.as_string())
        print(f"Email sent successfully to {to_email}")
        return True
    except smtplib.SMTPAuthenticationError:
        print("Email Error: Authentication failed.")
    except smtplib.SMTPConnectError:
        print("Email Error: Unable to connect to SMTP server.")
    except Exception as e:
        print(f"Email Error: {e}")
    return False

def send_mail(to_email, subject, body):
    msg = MIMEText(body)
    msg['Subject'] = subject               
    msg['To'] = to_email
    msg['From'] = Config.MAIL_USERNAME

    try:
        with smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
            server.sendmail(Config.MAIL_USERNAME, to_email, msg.as_string())
        print(f"Message sent successfully to {to_email}")
        return True
    except smtplib.SMTPAuthenticationError:
        print("Email Error: Authentication failed.")
    except smtplib.SMTPConnectError:
        print("Email Error: SMTP connection failed.")
    except Exception as e:
        print(f"Email Error: {e}")
    return False
