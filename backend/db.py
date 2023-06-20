import pymysql.cursors

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='',
                             database='test_db',
                             cursorclass=pymysql.cursors.DictCursor)


# Create tables if not exist
def configure_db():
    with connection.cursor() as cursor:
        cursor.execute("CREATE TABLE IF NOT EXISTS users(company_name VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,account_type TINYINT NOT NULL);")
    connection.commit()

# Execute a given line
def execute_line(line:str):
    with connection.cursor() as cursor:
        cursor.execute(line)
    connection.commit()

# with connection:
#     # insert
#     with connection.cursor() as cursor:
#         cursor.execute("INSERT INTO `USER_INFO` ('UserName', `UserEmail`, `Password`, 'AccountType') VALUES ('example', 'harrykim1999@gmail.com', '1qaz2ws3', 'Wholesaler')")
#     connection.commit()

#     # fetch
#     with connection.cursor() as cursor:
#         cursor.execute("SELECT * FROM `USER_INFO`")
#         result = cursor.fetchall()
#         print(result)

#     # delete
#     with connection.cursor() as cursor:
#         cursor.execute("DELETE FROM `USER_INFO` WHERE UserEmail='harrykim1999@gmail.com'")
#     connection.commit()