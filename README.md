# MunchBae

MunchBae is a food delivery application that connects users with local restaurants and food outlets. It allows users to browse menus, place orders, and have food delivered to their doorstep. The application also provides restaurant owners with a platform to manage their menus and orders efficiently. This website also provides delivery boy functionality to manage deliveries.

**\*\***\*\*\***\*\***_*Step By Step Notes*_**\*\***\*\*\***\*\***

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

- Created vite project
- installed tailwindcss and configured it
- installed react-router-dom react-router and react-icons 3rd party packages
- wraped app with browserrouter in main.jsx
- created routes in App.jsx for signup and signin pages
- installed daisyui for components
- created Signup and Signin components in src/pages
- created pages/ForgotPassword page

- installed nodemailer in backend
- configured nodemailer for sending otp in user email in utils/mail.js
- wrote sendotp and verifyotp controller in controllers/auth.controller.js
- wrote resetPassword controller in controllers/auth.controller.js
- mentioned these routes in routes/auth.router.js

- installed firebase for google authentication
- configured firebase in firebase.js
- created .env file to store firebase apikey
- built handlegoogleauth function in pages/signup page for sign up with google

- wrote googleAuth in controllers/auth.controller for checking user exist or not and generating token
- mentioned google auth route in routes/auth.router

- handlegoogleauth function in pages/signin page for sign in with google
- setErr state to show error messages in signup, signin and forgotpassword pages
- installed react spinners and configured it

- Set up Middlewares/isAuth.js middleware to verify user id from token
- wrote controllers/user.controller.js for fetching user id and routing the same in routes/user.router.js
- using user route in index.js

- useGetCurrentUser custom hook to fetch current user data from backend using token
- called useGetCurrentUser in App.jsx to make it available throughout the app
- set up react redux toolkit for storing user data
- created user.slice.js for user data
- configured it in store.js
- Provided store in main.jsx
- dispatched user data in signup, signin, usecurrentuser
- accessed user data in App.jsx
- created NavBar component and accessed user data from redux store to show user name
- modified navbar component for owner dashboard

- created models/shop.model.js for shop data
- created models/item.model.js for item data
- installed multer for image upload and cloudinary for storing images in cloud
- configured cloudinary in utils/cloudinary.js
- created public folder for storing image files
- configured multer for image uploading in middlewares/multer.js
- wrote shop controller in controllers/shop.controller.js for creating shop and editing shop
- wrote shop router in routes/shop.router.js
- wrote item contollers for adding and editing items in controllers/item.controller.js
- created item router in routes/item.router.js
- wrote getMyShop controller in controllers/shop.controller.js
- configured it's route

- custom hook for getMyShop in hooks folder
- ownerSlice for storing shop data
- dispatched shop data in owner dashboard
- if shop data exist show owner dashboard nav else show create shop link
- created createEditShop component for creating and editing shop
- added currentCity, currentState, currentAddress in user.slice.js
- dispatched these data in useGetCity hook
- accessed currentCity in NavBar to show user location
- accessed currentCity, currentState and currentAddress in createEditShop page
- created handleImage function for image preview in createEditShop page
- created handleSubmit function for submitting shop data to backend in createEditShop page
- dispatched shop data in createEditShop page after successful creation or editing of shop
- redirected to owner dashboard after shop creation or edition
- created AddFoodItem page for adding items to shop

- modified item and shop controllers to store items in shop document

- Created OwnerItemCard.jsx component for food items

- built getItem controller in controllers/item.controller.js
- modified editItem controller

- built EditItem.jsx to edit particular item

- Sorted items based on their update time in owner dashboard

- categories.js file for food categories
- built CategoryCard.jsx component

- created getShopByCity controller in controllers/shop.controller.js
- created useGetShopsByCity custom hook to fetch shops based on city
- accessed currentCity from user slice in UserDashboard.jsx to fetch shops based on city
- called useGetShopByCity hook in App.jsx
- CityShopsCard.jsx component to show shops in user dashboard
- accessed shopsInMyCity data in UserDashboard.jsx to show shops in user's city
- modified object-fit property in CityShopsCard.jsx from contain to fill for better image display
- modified width of carousels in UserDashboard.jsx from 80% to 90% for better visibility on medium screens
- modified width and height of CityShopsCard from w-50 h-50 to w-60 h-50 for better visibility
- created getItemByCity controller in controllers/item.controller.js
- routed it to item.router.js

- created setItemsInMyCity in item.slice.js
- created useGetItemsByCity custom hook to fetch items based on city
- called useGetItemsByCity in App.jsx
- accessed itemsInMyCity in UserDashboard.jsx to show food items in user's city
- created FoodCard.jsx component to show food item details
- added increase and decrease quantity functionality in FoodCard.jsx component
- modified UserDashboard.jsx to show FoodCard component for items in user's city
