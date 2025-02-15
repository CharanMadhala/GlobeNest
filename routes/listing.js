const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route - to display all Listings

//[7]Create Route
//error handling is also done here, if we insert any invalid data to mongodb then we will get error.
router
  .route("/")
  .get(wrapAsync(listingController.index)) //Index route
  .post( //create route
    isLoggedIn,
    upload.single('listing[image][url]'),
    validateListing,
    wrapAsync(listingController.createListing)
);
  

  
//[7]New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route - to diaplay all Listings
//[8] Update Route -- update listing
//[9] - Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image][url]'),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroylisting)
  );


//[8] Edit Route -- form edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


module.exports = router; 