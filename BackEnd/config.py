import dotenv
import os

dotenv.load_dotenv()

class Config:
    SECRET_KEY = os.getenv('secret_key')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///Route_hive.db'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_USERNAME = os.getenv('admin_email')
    MAIL_PASSWORD = os.getenv('app_password')
    MAIL_PORT = 587
    ADMIN_PASSWORD= os.getenv('admin_password')

    
    
    


