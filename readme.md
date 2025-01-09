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
<!-- Phase 1 (part a) - CRUD operations
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

 <!-- Phase 1 (Part b) - Apply Styling 
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

 <!-- 51. Project - Phase 1(Part c) 
 [18] 01. Client-Side Form Validation - using Bootstrap form validations and disabling browsers default validation.
 Step 1: adding "novalidate" if form tag. second, adding class="needs-validation" in form tag. third, adding js code(in bootdtrap website) in public/js/script.js file and mentioning it in boilerplate.ejs.

[19] 02. Success and Failure text (displaying message with validation in form) in both new.ejs and edit.ejs.
 but there is still vulnerability in our verification as we can't send data via form, if we send data via hoppscotch or API directly then invalid data get stored in database so we need to use server side validation.

 [20] 03. Custom error Hnadling. adding middleware in app.js to handle error while adding new data to database.
 -->
