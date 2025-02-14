const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

//Index Route - to display all Listings
router.get(
  "/",
  wrapAsync(listingController.index)
);

//[7]New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);



//[7]Create Route
//error handling is also done here, if we insert any invalid data to mongodb then we will get error.
router.post(
  "/",
  isLoggedIn,
  wrapAsync(listingController.createListing)
);

//[9] - Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroylisting)
);

//Show Route - to diaplay all Listings
router.get(
  "/:id",
  wrapAsync(listingController.showListing)
);

//[8] Edit Route -- form edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//[8] Update Route -- update listing
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing)
);

module.exports = router; 