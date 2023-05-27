# SportInterest API Documentation
This documentation provides an overview of the endpoints available in the SportInterest API. The API allows users to perform various operations related to user management, registration, login, profile updates, and password recovery.

URL
The base URL for all API endpoints is https://api.sportinterest.com.

User Endpoints
1. Register User
URL: /users/register
Method: POST
Description: Registers a new user in the system.
Request Body:
email (string, required): The email address of the user.
password (string, required): The password for the user account.
Response:
status (number): The status code of the response.
message (string): A message indicating the result of the registration process.
2. User Login
URL: /users/login
Method: POST
Description: Logs in a user and generates an authentication token.
Request Body:
email (string, required): The email address of the user.
password (string, required): The password for the user account.
Response:
status (number): The status code of the response.
message (string): A message indicating the result of the login process.
token (string): An authentication token to be used in subsequent API requests.
3. Verify User Registration
URL: /users/v-registration
Method: POST
Description: Verifies the registration pin provided by the user.
Request Headers:
Authorization (string, required): Bearer token obtained from user login.
Request Body:
pin (string, required): The registration pin to be verified.
Response:
status (number): The status code of the response.
message (string): A message indicating the result of the verification process.
4. Resend User Registration Verification Code
URL: /users/r-registration
Method: POST
Description: Resends the registration verification code to the user's email.
Request Body:
email (string, required): The email address of the user.
Response:
status (number): The status code of the response.
message (string): A message indicating the result of the resend process.
5. Send Forgot Password Code
URL: /users/forgot-password
Method: POST
Description: Sends a code to the user's email to initiate the password recovery process.
Request Body:
email (string, required): The email address of the user.
Response:
status (number): The status code of the response.
message (string): A message indicating the result of the code sending process.
6. Verify Forgot Password Code
URL: /users/v-forgot-password
Method: POST
Description: Verifies the forgot password pin provided by the user.
Request Body:
email (string, required): The email address of the user.
pin (string, required): The forgot password pin to be verified.
Response:
status (number): The status code of the response.
message (string): A message indicating the result of the verification process.
7. Resend Forgot Password Code
URL: /users/r-forgot-password
Method: POST
Description: Resends the forgot password code to the user's email.
Request Body:
email (string, required): The email address of the user.
Response:
status (number): The status code of the response.
message (string): A message indicating the result of the resend process.
8. Update User Profile
URL: /users/update-profile
Method: POST
Description: Updates the user's profile information.
Request Headers:
Authorization (string, required): Bearer token obtained from user login.
Request Body:
name (string, optional): The name of the user.
age (number, optional): The age of the user.
gender (string, optional): The gender of the user.
Response:
status (number): The status code of the response.
message (string): A message indicating the result of the profile update process.
9. Delete User
Note: This endpoint is deprecated and should not be used.

URL: /users/:userid
Method: DELETE
Description: Deletes a user from the system.
Required Role: admin
URL Parameters:
userid (string): The ID of the user to be deleted.
Response:
status (number): The status code of the response.
message (string): A message indicating the result of the user deletion process.
Please note that all requests to the API endpoints except the registration and login endpoints require authentication. The Authorization header with a valid bearer token obtained from the login process should be included in those requests.

This documentation provides an overview of the available endpoints in the SportInterest API. For detailed information about request and response formats, please refer to the API documentation or contact the API developers.
