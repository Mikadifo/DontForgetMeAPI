# DontForgetMet
DontForgetMe mobile app backend

DontForgetMe is an IOS app which objective is to remember you each time you are leaving home for work, school, etc to take your important things with you.
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
## Run local dev stage
1. First, create a Mongo database with the name **DFM**, with a collection named **user**.
2. Next, you need to create a .env file in the root directory which contains these variables:
```
DB_URL=<mongodb_connection_string>/DFM?retryWrites=true&w=majority
PORT=8000
TOKEN_SECRET=<random_secret_generated>
```
3. Third, run `npm i` in order to install the project dependencies.
4. Last, run `npm run dev` and test the root [endpoint](http://localhost:8000/).
## JWT
Each endpoint marked with **YES** in the below table requires a valid Bearer token in the Authorization header. Therefore, make sure to add the token secret in the .env file.

You can generate the `TOKEN_SECRET` using this command in the nodejs console:
```
require('crypto').randomBytes(64).toString('hex')
```
## Changes and tests
First, thanks if you want to collaborate with an improvement in the project, after doing your changes, run the local server tests using the following command:
`npm run test`
All the tests must pass.
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
