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
const ExpressError = require("./utils/wrapAsync.js");

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
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("\listings/index.ejs", {allListings});
});

//[7]New Route
app.get("/listings/new", (req, res)=>{
    res.render("\listings/new.ejs");
});

//[7]Create Route
//error handling is also done here, if we insert any invalid data to mongodb then we will get error.
app.post("/listings", wrapAsync(async (req, res, next)=>{
        if(!req.body.listing){
            throw new ExpressError(400, "Send valid data for listings");
        }
        // console.log(req.body);
        const listing = new Listing(req.body);
        await listing.save();
        // console.log(req.body);
        res.redirect("/listings");
        // const listing = res.body;
        // await Listing.insertOne();
    
    
}));

//[9] - Delete Route
app.delete("/listings/:id", async (req, res)=>{
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

//Show Route - to diaplay all Listings
app.get("/listings/:id", async (req, res)=>{
    const { id } = req.params;
    const listing = await Listing.findById(id);
    // console.log(list);
    res.render("\listings/show.ejs", { listing });
    // console.log(req.params);
    // res.send(`get request to ${id}`);
});

//[8] Edit Route -- form edit
app.get("/listings/:id/edit", async (req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("\listings/edit.ejs", { listing });

});
//[8] Update Route -- update listing
app.put("/listings/:id", wrapAsync(async (req, res)=>{
    if(!req.body.listing){
        throw new ExpressError(400, "Send valid data for listings");
    }
    let { id } = req.params;
    // console.log(req.body);
    await Listing.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/listings/${ id }`);
}));


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// middleware to hande custom error
app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).send(message);
    // res.send("something went wrong!");
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