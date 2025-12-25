_Set Up backend First_

- npm init
- npm install express mongoose cors dotenv ......
- created index.js file
- created .env file for environment variables
- Script in package.json to start the server using nodemon
- Created a folder structure for routes, models, controllers, and config
- git init
- Added .gitignore file to exclude node_modules and .env files
- mongoDB connection setup in config/db.js
- created user model in models/user.model.js
- generated token using jwt in utils/token.js
- created Signup, SignIn and SignOut controller in controllers/auth.controller.js
- built authRouter in routes/auth.router.js
- configured global middlewares in server file such as cors, express.json, cookieparser
