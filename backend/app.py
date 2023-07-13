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

    return jsonify({'message': 'Login successful.', 'account_type': result['account_type'], 'id': result['id']}), 200

@app.route('/api/wholesalerhome', methods=['POST'])
def wholesalerhome():
    data = request.get_json()
    print(data)
    company_name = data.get('company_name')
    account_type = data.get('account_type')

    with connection.cursor() as cursor:
        query = "SELECT * FROM users WHERE company_name=%s AND account_type=%s"
        print(query, (company_name, account_type))
        cursor.execute(query, (company_name, account_type))
        result = cursor.fetchone()
        if not result:
                return jsonify({'message': 'Retailer company names does not exits.'}), 400
    #check Account_Type
    if account_type != 1:
        return jsonify({'message': "The company name you have searched is not a Retailer"}), 400
    
    return jsonify({'message': 'These are the company names found'})

@app.route('/api/search-friends', methods = ['POST'])
def search():
    data = request.get_json()
    company_name = data.get('company_name')
    account_type = data.get('account_type')
    #print(account_type, type(account_type), account_type == 1)
    #

    try:
        # Validate user role
        if account_type not in [0, 1]:
            return jsonify({'message': 'Invalid user role'}), 400
        
        #Query based on search input and user role
        with connection.cursor() as cursor:
            if account_type == 0:
                query = f'SELECT company_name WHERE company_name = {company_name} AND account_type = 1'
                print(query)
            elif account_type ==1:
                query = f'SELECT company_name WHERE company_name = {company_name} AND account_type = 0'
                print(query)
            print(query)
            cursor.execute(query)
            results = cursor.fetchall()

        return jsonify({'message': 'Search successful', 'results': results}), 200
    except:
        return jsonify({'message': 'Error occurred during search.'}), 500

@app.route('/api/add-friend', methods=['POST'])
def add():
    data = request.get_json()
    wholesaler_id = data.get('wholesaler_id')
    retailer_id = data.get('retailer_id')

    try:
        # Check if the wholesaler exists and is a wholesaler (account_type = 0)
        with connection.cursor() as cursor:
            query = "SELECT account_type FROM users WHERE id = %s"
            cursor.execute(query, wholesaler_id)
            result = cursor.fetchone()
            if not result or result['account_type'] != 0:
                return jsonify({'message': 'Invalid wholesaler ID or not a wholesaler'}), 400
        
        # Check if the retailer exists and is a retailer (account_type = 1)
        with connection.cursor() as cursor:
            query = "SELECT account_type FROM users WHERE id = %s"
            cursor.execute(query, retailer_id)
            result = cursor.fetchone()
            if not result or result['account_type'] != 1:
                return jsonify({'message': 'Invalid retailer ID or not a retailer'}), 400
    
        # Add the friend relationship to the database
        with connection.cursor() as cursor:
            query = "INSERT INTO friends (wholesaler_id, retailer_id) VALUES (%s, %s)"
            cursor.execute(query, (wholesaler_id, retailer_id))
            connection.commit()
        
        return jsonify({'message': 'Friend added successfully'}), 200
    except:
        return jsonify({'message': 'Error occurred while adding friend.'}), 500




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