import pymysql
from flask import Flask, jsonify, request
from flask_cors import CORS
import db as db

app = Flask(__name__)
CORS(app)

# Database Connection
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='test_db',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

# API Routes
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        company_name = data.get('company_name')
        email = data.get('email')
        password = data.get('password')
        account_type = data.get('account_type')

        assert company_name is not None and email is not None and password is not None and account_type is not None

        query = f"INSERT INTO users (company_name, email, password, account_type) VALUES ('{company_name}', '{email}', '{password}', {account_type})"
        print(query)
        db.execute_line(query)
        
        return jsonify({'message': 'User registered successfully.'}), 200
    except:
        return jsonify({'message': 'Registration unsuccessful'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    email = data.get('email')
    password = data.get('password')
    account_type = data.get('account_type')

    # Check if email exists
    with connection.cursor() as cursor:
        query = "SELECT * FROM users WHERE email=%s AND password=%s"
        print(query, (email, password))
        cursor.execute(query, (email, password))
        result = cursor.fetchone()
        if not result:
            return jsonify({'message': 'Email or password does not exist.'}), 400

    # Check password
    if password != result['password']:
        return jsonify({'message': 'Invalid password.'}), 400

    return jsonify({'message': 'Login successful.', 'account_type': result['account_type']}), 200

@app.route('/api/wholesalerhome', methods=['POST'])
def wholesalerhome():
    data = request.get_json()
    print(data)
    company_name = data.get('company_name')
    account_type = data.get('account_type')

    with connection.cursor() as cursor:
        query = "SELECT * FROM users WHERE company=%s AND account_type=%s"
        print(query, (company_name, account_type))
        cursor.execute(query, (company_name, account_type))
        result = cursor.fetchone()
        if not result:
                return jsonify({'message': 'Retailer company names does not exits.'}), 400
    #check Account_Type
    if account_type != 1:
        return jsonify({'message': "The company name you have searched is not a Retailer"}), 400
    
    return jsonify({'message': 'These are the company names found'})


@app.route('/test', methods=['GET'])
def welcome():
    return jsonify({'message': "sdf!"})

if __name__ == '__main__':
    db.configure_db()
    app.run(host='0.0.0.0', debug=True, port=5001)



# # List datatype
# num = [1, 2, 3, 4, 5]
# # Dictionary datatype
# info = {'id': 1, 'name': "john doe"}
# # Tuple datatype
# coord = (0.2523, 2.436, 9.363)