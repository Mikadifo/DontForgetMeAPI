# DontForgetMet
DontForgetMe mobile app backend

DontForgetMe is an IOS app which objective is to remember you each time you are leaving home for work, school, etc to take your important things with you.

Master branch is the deployed version in aws-lambda, click [here](https://github.com/Mikadifo/DontForgetMeAPI/tree/local-dev) to checkout to local-dev branch.
## Features
* Account
  * Login
  * Register
  * Update Personal Info
  * Change Password
  * Delete Account
* Things
  * Create new thing
  * Upate a thing
  * Delete things
  * List of your things
* Emergency Contacts
  * Create a new contact
  * Update an existing contact
  * Delete contacts
* Schedules
  * Create a new schedule
  * Update an existing schedule
  * Delete schedules
## API Endpoints
| NAME                  | DESCRIPTION                           | URL    | METHOD | AUTH | BODY |
| --------------------- | ------------------------------------- | ------ | ------ | ---- | ---- |
| Users                 | Returns a list of all users in the app. | /users | GET | YES |    | NA   |
| Login                 | Login in the app and return the logged in user. | /login | POST | NO |    | ` { "username": "username", "password": "password" } ` |
| Create-User           | Creates a new user and return its information.  | /user/create | POST | NO    | `{ "phone": "1234567890", "password": "password", "things": [], "emergencyContacts": [], "email": "example@exp.exp", "username": "username", "schedules": [] }`   |
| User-by-email         | Returns a specific user information by the passed email. | /user/{email} | GET | YES    | NA   |
| User-by-personal-info | Returns a specific user information by the phone, email and username passed. | /user/by/personal\_info | POST  | YES   | `{ "email": "example@exp.exp", "username": "username", "phone": "1234567890" }`   |
| User-update           | Updates a specific user by the passed email. | /user/update/{email} | PUT | YES    | `{ "phone": "1234567890", "username": "username" }`   |
| User-delete           | Deletes a specific user by the passed email. | /user/delete/{email} | DELETE | YES    | NA   |
