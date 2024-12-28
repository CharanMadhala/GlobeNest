const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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