const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOveride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("DB connection sucessful");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res)=>{
    res.send("get request working");
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
app.post("/listings", async (req, res)=>{
    // console.log(req.body);
    const listing = new Listing(req.body);
    await listing.save();
    // console.log(req.body);
    res.redirect("/listings");
    // const listing = res.body;
    // await Listing.insertOne();
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
//[9] Update Route -- update listing
app.put("/listings/:id", async (req, res)=>{
    let { id } = req.params;
    // console.log(req.body);
    await Listing.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/listings/${ id }`);
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

app.listen(8080, ()=>{
    console.log("listening to port 8080");
});