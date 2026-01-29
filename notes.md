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
- addToCart state for adding items to the cart in user.slice.js
- handleAddToCart function in FoodCard.jsx
- dispatched addToCart action in handleAddToCart function
- accessed cartItems in NavBar to show number of items in cart
- created Cart.jsx page to show cart items
- created CartItemsCard.jsx component to show each item in cart
- increase and decrease quantity functionality in CartItemsCard.jsx
- remove item from cart functionality in CartItemsCard.jsx
- totalamount state in user.slice.js to calculate total amount of cart items
- accessed totalAmount in Cart.jsx to show total amount of cart items
- created Checkout.jsx page for checkout process

- created order.model.js for checkout and giving orders to different shops

- created map.slice.js for managing map related states
- added setLatitude and setLongitude actions in map.slice.js
- dispatched latitude and longitude in useGetCity hook
- created MapContainer in Checkout.jsx page to show map for selecting location
- installed react-leaflet and leaflet for map functionality
- configured map in Checkout.jsx using latitude and longitude from map.slice.js
- created ReCenterMap component to recenter map based on marker location in Checkout.jsx
- created getAddressByLatLng function in Checkout.jsx to get address from latitude and longitude using geoapify api
- dispatched setAddress action in getAddressByLatLng function
- created getLatLngByAddress function in Checkout.jsx to get latitude and longitude from address using geoapify api
- set latitude and longitude in getLatLngByAddress function
- dispatched setAddress action in getLatLngByAddress function
- paymentMethod state in Checkout.jsx for selecting payment method
- created payment method selection cards in Checkout.jsx
- listed orders and their quantities in Checkout.jsx

- created placeOrder controller in controllers/order.controller.js to place order
- routed it in routes/order.router.js

- created OrderPlaced.jsx page to show order placed message
- redirected to OrderPlaced.jsx page after successful order placement in Checkout.jsx
- Created Myorders.jsx page to show user's orders

- built getUserOrders api for getting user orders
- built getOwnerOrders api for getting owner orders
- routed both of them in order.router.js

- created useGetMyOrders custom hook to fetch user's orders
- called useGetMyOrders in App.jsx
- accessed myOrders data in MyOrders.jsx to show orders based on user role
- created UserOrderCard.jsx component to show each user order details
- created OwnerDashBoard.jsx component to show each order details in owner dashboard
- accessed order items in UserOrderCard.jsx to show ordered items

- added status in order.model.js

- completed userOrderCard.jsx
- completed OwnerDashBoard.jsx

- populated shop and shoporderitems in place order controller in order.controller.js

- localstorage to avoid login when reloading the page from signin or signup page
- stored token in localstorage during signin and signup

- updateorderstatus api in order.controller.js
- routed it in order.router.js

- handleupdatestatus function in ownerordercard.jsx
- onChange event in select tag to update order status
- added default option --select status-- in select tag in OwnerOrderCard.jsx
- updateorderstatus redux action in order.slice.js
- dispatched updateorderstatus action in handleUpdateStatus function in OwnerOrderCard.jsx

- created deliveryassignment.model.js for assigning deliveries to delivery partners
- added field assignment in order.model.js to reference delivery assignment
- added location index in user.model.js for geospatial queries
- created updateUserLocation controller in controllers/user.controller.js to update delivery partner location
- routed it in routes/user.router.js

- created useUpdateUserLocation hook to update delivery partner location periodically
- handleUpdateUserLocation function in useUpdateUserLocation hook
- called useUpdateUserLocation in App.jsx

- modified order controller to create delivery assignment during order placement

- stored assignedDeliveryPartner in shop order during assignment
- populated assignedDeliveryPartner in update order status controller
- accessed assignedDeliveryPartner in OwnerOrderCard.jsx to show assigned delivery partner details
- completed delivery assignment functionality
