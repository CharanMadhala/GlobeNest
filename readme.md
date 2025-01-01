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
 -->
