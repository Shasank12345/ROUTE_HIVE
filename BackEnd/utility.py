import smtplib
import random
from email.mime.text import MIMEText
from config import Config

def generate_otp():
    return str(random.randint(100000, 999999))  # 6 digit OTP

def send_email(to_email, otp):
    msg = MIMEText(f'Your OTP is: {otp}')
    msg['Subject'] = 'Password Reset OTP'
    msg['To'] = to_email
    msg['From'] = Config.MAIL_USERNAME

    try:
        with smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT) as server:
            server.ehlo()  # Identify yourself to the server
            server.starttls()
            server.ehlo()  # Re-identify after starting TLS
            server.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
            server.sendmail(Config.MAIL_USERNAME, to_email, msg.as_string())
        print(f"Email sent successfully to {to_email}")
        return True
    except smtplib.SMTPAuthenticationError:
        print("Email Error: Authentication failed. Check your email username and app password.")
    except smtplib.SMTPConnectError:
        print("Email Error: Unable to connect to the SMTP server. Check your internet or server settings.")
    except Exception as e:
        print(f"Email Error: {e}")
    return False
