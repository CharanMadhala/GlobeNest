const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const { error } = require("console");
const Review = require("./models/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(()=>{
    console.log("DB connection sucessful");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res)=>{
    res.send("I am root");
});

//Index Route - to display all Listings
app.get("/listings", wrapAsync(async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("\listings/index.ejs", {allListings});
}));

//[7]New Route
app.get("/listings/new", (req, res)=>{
    res.render("\listings/new.ejs");
});

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        // throw new ExpressError(400, error);
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};
const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        // throw new ExpressError(400, error);
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

//[7]Create Route
//error handling is also done here, if we insert any invalid data to mongodb then we will get error.
app.post("/listings", wrapAsync(async (req, res, next)=>{
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
        res.redirect("/listings");
        // const listing = res.body;
        // await Listing.insertOne();
    
    
}));

//[9] - Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res)=>{
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

//Show Route - to diaplay all Listings
app.get("/listings/:id", wrapAsync(async (req, res)=>{
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    // console.log(list);
    res.render("\listings/show.ejs", { listing });
    // console.log(req.params);
    // res.send(`get request to ${id}`);
}));

//[8] Edit Route -- form edit
app.get("/listings/:id/edit", wrapAsync(async (req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("\listings/edit.ejs", { listing });

}));

//[8] Update Route -- update listing
app.put("/listings/:id", validateListing, wrapAsync(async (req, res)=>{
    
    let { id } = req.params;
    // console.log(req.body);
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${ id }`);
}));

// Reviews
// POST Route- [28]
app.post("/listings/:id/reviews", validateReview, wrapAsync(async(req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);

    // console.log("new review saved");
    // res.send("new review saved");

}))
// Reviews
// DELETE Route- [32]
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req, res)=>{
    let { id, reviewId } = req.params;
    // mongoose $pull operator - used for removing deleted objectId from listings.reviews[] array
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}))

// middleware to hande custom error
app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong!" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("\listings/error.ejs", {message});
    // res.send("something went wrong!");
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// app.get("/test/listing", async (req, res)=>{
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("document created");
// });

app.listen(port, ()=>{
    console.log("listening to port 8080");
});