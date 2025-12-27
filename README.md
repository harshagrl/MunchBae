<!-- _Set Up backend First_ -->

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
- configured authRouter route in server file

  --------------Moved to frontend part-----------

- installed nodemailer in backend
- configured nodemailer for sending otp in user email in utils/mail.js
- wrote sendotp and verifyotp controller in controllers/auth.controller.js
- wrote resetPassword controller in controllers/auth.controller.js
- mentioned these routes in routes/auth.router.js

  --------------Moved to frontend part-----------

- wrote googleAuth in controllers/auth.controller for checking user exist or not and generating token
- mentioned google auth route in routes/auth.router

<!-- _Set up Frontend_ -->

- Created vite project
- installed tailwindcss and configured it
- installed react-router-dom react-router and react-icons 3rd party packages
- wraped app with browserrouter in main.jsx
- created routes in App.jsx for signup and signin pages
- installed daisyui for components
- created Signup and Signin components in src/pages
- created pages/ForgotPassword page

  --------------Moved to backend part-----------

- installed firebase for google authentication
- configured firebase in firebase.js
- created .env file to store firebase apikey
- built handlegoogleauth function in pages/signup page for signin up with google

  --------------Moved to backend part-----------
