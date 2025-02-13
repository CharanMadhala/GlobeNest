const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const {isLoggedIn} = require("../middleware.js");

//Index Route - to display all Listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

//[7]New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    // throw new ExpressError(400, error);
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//[7]Create Route
//error handling is also done here, if we insert any invalid data to mongodb then we will get error.
router.post(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res, next) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send valid data for listings");
    // }
    // let result = listingSchema.validate(req.body);
    // console.log(result);
    // if(result.error){
    //     throw new ExpressError(400, result.error);
    // }
    // console.log(req.body);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    // console.log(req.body);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
    // const listing = res.body;
    // await Listing.insertOne();
  })
);

//[9] - Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);

//Show Route - to diaplay all Listings
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    console.log("display lisitng: " + listing);
    if(!listing){
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    // console.log(list);
    res.render("listings/show.ejs", { listing });
    // console.log(req.params);
    // res.send(`get request to ${id}`);
  })
);

//[8] Edit Route -- form edit
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    } 
    res.render("listings/edit.ejs", { listing });
  })
);

//[8] Update Route -- update listing
router.put(
  "/:id",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    // console.log(req.body);
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router; 