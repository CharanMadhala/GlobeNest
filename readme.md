<h2> Airbnb (Database:wanderlust, collection: listings) - MEN Stack (without React), RESTful API's</h2>
<ul>
    <li>Index Route: GET /listings - to display all Listings</li>
    <li>Show Route: GET /listings/:id - to display individual lsiting</li>
    <li>New route - GET /listings/new - get data from user</li>
    <li> Create route - POST /listings - inserting data to MongoDB </li>
    <li>Edit Route - GET /listings/:id/edit - form to edit particular listing and submit.</li>
    <li>Update Route - PUT /litings/:id - update listing and redirect to SHOW Route.</li>
    <li>Delete Route - DELETE /listings/:id - delete particular listing and redirect to GET /listings</li>
    <!-- <li></li> -->
</ul>

<!-- 47. Phase 1 (part a) - CRUD operations - [1] to [9]
[1] basic setup -- installing express, ejs, mongoose. 
    index.js -- require express, initialize app, lister to port for requests, setup up home root "/" to verify working.
    require mongoose, setup connection.
[2] define Schema and model(in models/listing.js) and export it. require listing in app.js. create new document using instance of listing. verfiy whether document insertion is working through mongosh (MongoDb shell).
[3] repository link: https://github.com/apna-college/wanderlust
initialise database, data link: https://github.com/apna-college/wanderlust/blob/main/init/data.js
[4] Initilization of database: used to intialize databse with new data, helpfull whenever we need to reinitialise database. File: init/data.js (contains data).... File: init/index.js (contains required to code to cleanup existing database and insert intilisation data).
[5] Index Route: GET /listings - to display all Listings
[6] Show Route: GET /listings/:id - to desplay individual listing
[7] New and Create Route - 
    New route - GET /listings/new - get data from user
    Create route - POST /listings - inserting data to MongoDB
[8] Edit and Update Route
    Edit Route - GET /listings/:id/edit - form to edit particular listing and submit.
    Update Route - PUT /listings/:id - update listing and redirect to SHOW Route.
[9] Delete Route - DELETE /listings/:id - delete particular listing and redirect to GET /listings.

 -->

 <!-- 48. Phase 1 (Part b) - Apply Styling - [10] to [17]
[10] 01. Creating Boilerplate -- making use of EJS Mate (npm i ejs-mate, const ejsMate = require("ejs-mate"), app.engine('ejs', ejsMate)) to enhanced templating. common templatings in many pages can be put into views/layouts folder (here we have boilerplate.ejs) and import in ejs files ex: like Navbar, Footer etc..
 And Creting public folder. May contain css files,js files,images.

[11] 02. Navbar (views/includes/navbar.ejs)- attaching NavBar in Boilerplate file, using Bootstrap
[12] 03. Footer (views/includes/footer.ejs) - attaching Footer in Boilerplate file
[13] 04. Index page Styling -> displaying contents in card using bootstrap (modifying /listings/index.ejs)
[14] 05. Styling New Listing (Add new listing page) 
important concepts: flex: 1; (short hand for flex: flex-grow flex-shrink flex-basis) used for responsiveness when parent container is flex. FLEW GROW: default(0) means even if conainer have empty space, elements will not occupy anythin. value "1" means elements will equally occupy empty space. can have any range of positive number's and each element/child can have different value. value "2" mean element occupies free space twice than other elements.
FLEW SHRINK: default(1) means the elements will shrink if window/screen size decreases to fit current size, value "0" - element will not shrink and overflows. 
FLEX BASIS: 0 allows all elements to occupy availabe free space evenly and all element will have same size.

ROW-COLS: splitting screen into rows and cols and adjusting elements size; bootstrap-gutters

[15] 06.Styling Edit Listing page - same style as Add New Listing page. only difference is we use value="" attribute insted of placeholder.

[16] 07.Styling Show Listing using Bootstrap
[17] 50, 51 folders - Learnt Middlewares and Error Handling.
 -->

 <!-- 51. Project - Phase 1(Part c) - [18] to [25]
 [18] 01. Client-Side Form Validation - using Bootstrap form validations and disabling browsers default validation.
 Step 1: adding "novalidate" if form tag. second, adding class="needs-validation" in form tag. third, adding js code(in bootdtrap website) in public/js/script.js file and mentioning it in boilerplate.ejs.

[19] 02. Success and Failure text (displaying message with validation in form) in both new.ejs and edit.ejs.
 but there is still vulnerability in our verification as we can't send data via form, if we send data via hoppscotch or API directly then invalid data get stored in database so we need to use server side validation.

 [20] 03. Custom error Handling. adding middleware in app.js to handle error while adding new data to database.

 [21] 04. Adding wrapAsync /utils/wrapAsync.js. making use of wrapAsync in place of try-catch block done in above (create route). 
 [22] 05. Adding ExpressError /util/ExpressError.js. defining custom error name and status. defining middleware for wild card route, adding server sd\ide validations for delete route, edit route etc..
[23] 06. views/listings/error.ejs - displaying error message using bootstrap "alerts". 
[24] 07. Validation for Schema (Server side error handling (verify empty object data i.e., applying validation for individual fields)) and using npm i joi. using "joi" npm package formschema verification (sends error if the inout fields are empty while submitting form). defining new file ./schema.js for defining joi schema for verification.
[25] 08. Validation for Schema (using Middleware). all the above code is put in function and used as a middleware for create and update route and making use of addition "details" sent in error.
 --> 

<!-- 52. Database Relationships - learning relationships in MongoDB (how to connect two tables) - just learning
 -->

 <!-- 53.  Project - phase 2 (Part A) - [26] to [33]
    [26] 03. models/reviews.js -- created new reviews model(for storing comment-String, rating(1 to 5)-Number, createdAt-date and time) for storing reviews of all listings. and Added "reviews" field in listings model, which stores ObjectIDs of reviews.

    [27] 04. creating form for taking reviews in show.ejs .. just form, post request is not implemented
    [28] 05. submitting reviews form - post request - POST /listings/:id/reviews - getting review object, storing it in reviews and pushing in listings.reviews array.

    [29] 06. Client ans Server Side validation for Reviews - client(Form validation - making input fields required) - server side(Joi validation - creating schem in schema.js -> requiring in app.js, creating a function and using it as middleware in /listings/:id/reviews. also using wrapAsync() for error handling).

    [30] 07. Render Reviews - displaying all review of each listing in show.ejs ... making use of .populate("reviews") in show route(app.js) .. without styling

    [31] 08. Add Styling to Reviews in show.ejs
    [32] 09. Delete button for reviews - show.ejs - DELETE ROUTE - /listings/:id/reviews/:reviewId
        Making use of Mongo $pull Operator (for deleting reivew ObjectID() from listing.reviews array).
        "" The $pull operator removes from an existing array all instances of a value or values that match a specified condition. ""
    [33] 10. Handling Delete Listing - Creating delete Middleware for reviews /models/listing/js - after execution of delete route in [32] step it automatically executes this middleware which deletes all reviews associated with this listing in Reviews Collection/model

-->

<!-- 54. Project - Phase 2 (part b) [34] and [35]
    01, 02 are basics of express router

  [34] 03. Learning about "Express Router", Restructuring (We do in Major projects). Creating a new folder "routes" in main directory. from app.js we cut and paste all the /listings/ routes to routes/listing.js and Middlewares it used. copy past all the required packages. In /routes/listings.js : replacing all app with router ex: replacing app.get with router.get. and we are removing /listings/ in all routes.
  In app.js, replacing all that listing code with app.use("/listings", listings);

  [35] 04. Likewise, we are doing restructuring for Reviews routes and new concept MERGE PARAMS (while giving reviews after replacing all the code, it will not work because the ID in the route is not reaching /routes/review.js. so while requiring Router({mergeParams: true}) in review.js).
  i.e., removing all the code that belongs to reviews route from app.js to /routes/review.js

  and new concept: Merge Params
    while giving reviews after replacing all the code, it will not work because the ID in the route is not reaching /routes/review.js.
    error: Cannot read properties of null (reading 'reviews')
    Here comes MERGE PARAMS concept,
    instead of: const router = express.Router();
    we use: const router = express.Router({ mergeParams: true });
    Which merges parents(app.js) route with child route(routes in /routes/review.js)

    reference: expressjs.com/en/4x/api.html#express.router

    05 to 08 - About Web cookies (we use them to store some info from server to browser and after that, that information can be shared by all other pages). Mostly used for Authentication and Authirization. 
    
-->

<!-- 55. Project - phase 2 (part c) [36] to [40]
    01. Intro about session, stateful and stateless protocols. 
    02. Intro about express sessions, using session as middleware
    03. Exploring session options, like resave , saveUninitialized. Keeping track of no of requests received in a session.
    
    04. Storing and using session info, creating temporary varible in session to store username and display it in different pages
    05. using connect-flash npm package, for displaying temporary messages. like, user registered, new listing added, listing deleted etc.. (Can also be done through alerts)
    06. using res.locals, while rendering view we can use res.locals to store temporary data and without passing it, we can directly access it in view (we used it to store flash messages)

    [36] 07. Implementing sessions in project (npm i express-session)- requiring session and setting up middleware. verify for sessionId(inspect->applications->cookies->localhost->connect.sid) cookie in browser.
    [37] 08. setting cookie in sessionOnptions - used to set expiry date for session cookie ex: 7 Days means in same browser we don't have to login everytime for next 7 days. and setting httpOnly to true to prevent from crossSite attacks.

    [38] 09. Implementing Flash Message - message that new listing is created is displayed in /listing (index.ejs).
    [39] 10. Implementing Success partials - displaying succes flash message when we add new listing, edit listing, delete listing,  add new review, delete review.
    (shifiting displaying of flash message to boiler plate)
    [40] 11. Implementing Failure partials - displaying failur flash message. for example: if we are trying to access listing that do not exist or edit listing that do not exist.

 -->

 <!-- 56. Project - phase 2 (Part d) [41] to [46]
    01 to 05 learned babsic about Authentication, Authorization, Password storing (hashing and Salting), passport package for authentication
    [41] 06. User Model (models/user.js) - creating user model using passport package
    [42] 07. Configuring passport-local before using in app.js
    [43] 08. Demo user - new route for testing woriking of passport, for testing how details are stored.
    [44] 09. Creating SignUp GET route, form - /signup GET request - new route user.js and new view /users/signup.ejs
    [45] 10. Creating SignUp POST route, /signup POST request - routes/users.js
    [46] 11. Creating LogIn page - /login GET and POST requests - authenicates user using passport middleware
    login crediantials for verification
    username: sample
    password: sample
    email: sample@gmail.com
 -->

<!-- 57. Major Project Phase - 2 (Part E) [47] to [56]
    [47] 01. Connecting Login Route - verify whether user is logged in or not using req.isAuthenticated() method (which verifies cookie(user) information) - checking whether user is logged in before creating, updating, deleting, editing listing.

    we are aslo creating new file middleware.js, which contains code for verifing user is logged in or not.

    [48] 02. LogOut functionality - creating new route /logout in user.js - making use of req.logout() method of passport - which deletes user information from the session

    [49] 03. Adding sig up, log in, log out options in navbar - using req.user info of passport for rendering those options based on, whether user is logged in or not.

    [50] 04. Automatic Login after SignUp -changes in /signup POST route- using passport's req.login() method - which automatically logins with provided user details
    
    [51] 05. Post Login page - redirecting to previous page user requested before logging in. making use of req.originalUrl

    [52] 06. Listing owner - For each listing we will associate owner, to implement authorization later (that only owner can edit or delete listing)

    [53] 07. Starting with Authorization - protecting Edit/Delete router - from client-side -conditional rendering in show.ejs

    [54] 08. Starting with Authorization - protecting Edit/Delete router - from server-side - crating middlewares for checking onwer or not (isOwner) and using it in edit, update, delete listing routes - also converting validateListing and validateReview methods as middlewares

    [55] 09. Authorization for Reviews - serverside and client-side validation for review - only person who logged in will be able to create reviews - also added author property in reviews schema

    [56] 10. Authorization for review deletion - only user who created can delete the review

-->

<!-- 58.Major Project - Phase 3 (Part a) [57] to 
    [57] 01. MVC - Model,View, Controller - Model: contains db models, views: contains front-end part (views), controllers: contains all core functionality of backend (ex: all callback functions in routes) - creating new folder controllers and shifting callbacks in listings

    [58] 02. Likewise, shifting all callbacks from listing to controllers

    [59] 03. Likewise, creating controllers for review  routes

    [60] 03. Likewise, creating controller for user routes

    [70] 04. Router.route() - used for more compact view of code in routes - modified routes/listing.js, /review.js and /user.js

    [71] 05. Re-Styling Ratings - uing Starability library - github: https://github.com/LunarLogic/starability

    06. Introduction of how to take image file from user, how to store it.

    [72] 07. Manipulating Form - changing form encoding type - using Multer (npm i multer)package - check notes

    [73] 08. Cloud Setup - using cloudinary.com cloud service - stroing credentials in .env file (should not be shared)

    [74] 09. Store Files - using packages (npm i cloudinary multer-storage-cloudinary) - new file cloudConfig.js - basically implementing functionality where uploaded image will get parsed using multer. code will open cloudinary and upload image, it will return object in which we have image path

    [75] 10. Update Listing Schema - to store url and filename - previously in course we used to store image as string, now we have to add url and filename in image, in Listing schema - but I have done correct from starting - and update createLisiting call back in controllers to store actual listing url and filename returned by controller

    [76] 11. Display image in index and show roues - which i have already done from begining

    






-->