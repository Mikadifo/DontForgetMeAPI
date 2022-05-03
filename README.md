# DontForgetMet
DontForgetMe mobile app backend

DontForgetMe is an IOS app which objective is to remeber you each time you are leaving home for work, school, etc to take your important things with you.
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
2. Next, you need to create a .env file in the root directory which contains this variables:
```
DB_URL=<mongodb_connection_string>/DFM?retryWrites=true&w=majority
PORT=8000
```
3. Third, run `npm i` in order to install the project dependencies.
4. Last, run `npm run dev` and test the root [endpoint](http://localhost:8000/).

## API Endpoints
| NAME  | DESCRIPTION                           | URL    | METHOD | BODY |
| ----- | ------------------------------------- | ------ | ------ | ---- |
| Users | Return a list of all users in the app | /users | GET    | NA   |
