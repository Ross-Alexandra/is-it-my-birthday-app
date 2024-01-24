import os
from mysql.connector import connect

def get_db_connection():
    return connect(
        host=os.getenv('IIMB_DB_HOST'),
        port=os.getenv('IIMB_DB_PORT'),
        user=os.getenv('IIMB_DB_USER'),
        password=os.getenv('IIMB_DB_PASSWORD'),
        database=os.getenv('IIMB_DB_NAME')
    )
