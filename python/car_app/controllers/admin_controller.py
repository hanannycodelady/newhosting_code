from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from car_app.Models import admin  # Ensure you have the correct import
from car_app.extensions import db

# Create a blueprint
admin_bp = Blueprint('admin', __name__, url_prefix='/api/v1/admin')

# Admin login route
@admin_bp.route('/login', methods=['POST'])
def admin_login():
    data = request.get_json()

    if not data or not all(key in data for key in ('email', 'password')):
        return jsonify({'error': 'Missing email or password'}), 400  # Return error if missing

    email = data['email']
    password = data['password']

    # Fetch user from the database based on email
    user = admin.query.filter_by(email=email).first()  # Changed to email

    # Check if user exists and verify password
    if user and user.check_password(password):  # Use the method to check password
        access_token = create_access_token(identity=user.id)  # Using user ID as identity
        return jsonify({'access_token': access_token}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

# Admin dashboard route
@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    current_user_id = get_jwt_identity()
    user = admin.query.get(current_user_id)

    if user and user.is_admin:
        total_users = admin.query.count()  # Count all users
        return jsonify({
            'message': 'Welcome to the admin dashboard',
            'totalUsers': total_users,
            # You can uncomment the next line if you have an Order model
            # 'totalOrders': Order.query.count()  
        }), 200
    else:
        return jsonify({'error': 'Access denied'}), 403


# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import create_access_token

# # Create a blueprint
# admin_bp = Blueprint('admin', __name__,url_prefix='/api/v1/admin_bp')

# # Hardcoded credentials (for demonstration purposes only)
# ADMIN_EMAIL = 'kwagalaangel27@gmail.com'
# ADMIN_PASSWORD = 'password123'

# # Admin login route
# @admin_bp.route('/login', methods=['POST'])
# def admin_login():
#     # Retrieve email and password from the request body
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     # Check if the provided credentials match the hardcoded ones
#     if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
#         # Create a JWT access token if the credentials are correct
#         access_token = create_access_token(identity=email)
#         return jsonify({'access_token': access_token}), 200
#     else:
#         # Return an error if the credentials don't match
#         return jsonify({'error': 'Invalid credentials'}), 401




















# from flask import Blueprint, jsonify, request
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from werkzeug.security import generate_password_hash
# from car_app.Models.user import User
# from car_app.extensions import db

# admin_blueprint = Blueprint('admin', __name__, url_prefix='/api/v1/admin')

# @admin_blueprint.route('/admin/dashboard', methods=['GET'])
# @jwt_required()
# def admin_dashboard():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)

#     if user.role != 'admin':  # Assuming you have a role column in your User model
#         return jsonify({'error': 'Unauthorized'}), 403

#     # Fetch necessary admin-specific data
#     total_users = User.query.count()
#     # total_orders = Order.query.count()

#     return jsonify({
#         'totalUsers': total_users,
#         # 'totalOrders': total_orders
#     }), 200















# from flask import Blueprint, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from car_app.Models.user import User

# admin_blueprint = Blueprint('admin', __name__, url_prefix='/api/v1/admin')

# @User.route('/admin/dashboard', methods=['GET'])
# @jwt_required()
# def admin_dashboard():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)

#     if user.role != 'admin':  # Assuming you have a role column in your User model
#         return jsonify({'error': 'Unauthorized'}), 403

#     # Fetch necessary admin-specific data
#     total_users = User.query.count()
#     # total_orders = Order.query.count()

#     return jsonify({
#         'totalUsers': total_users,
#         # 'totalOrders': total_orders
#     }), 200












# @admin_blueprint.route('/dashboard', methods=['GET'])
# @jwt_required()
# def access_dashboard():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)

#     if user and user.is_admin:
#         return jsonify({'message': 'Welcome to the admin dashboard'})
#     else:
#         return jsonify({'error': 'Access denied'}), 403

# @admin_blueprint.route('/check', methods=['GET'])
# @jwt_required()
# def check_admin():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)

#     if user and user.is_admin:
#         return jsonify({'is_admin': True})
#     else:
#         return jsonify({'is_admin': False})
