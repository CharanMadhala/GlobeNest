const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    console.log("display lisitng: " + listing);
    if(!listing){
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    // console.log(list);
    res.render("listings/show.ejs", { listing });
    // console.log(req.params);
    // res.send(`get request to ${id}`);
  };


 // for converting the search query to title case and returning array of all possible combinations
 function toTitleCase(str) {  
  return str.toLowerCase()  
      .split(' ')  
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))  
      .join(' ');  
}  

function generateCombinations(str) {  
  const words = str.split(' '); // Step 1: Split into words  
  const combinations = []; // Array to store the combinations  
  const totalCombinations = Math.pow(2, words.length); // Calculate total combinations  

  // Step 2: Generate combinations  
  for (let i = 1; i < totalCombinations; i++) { // Start from 1 to skip the empty combination  
      let combo = [];  
      for (let j = 0; j < words.length; j++) {  
          // Check if j-th bit is set in i  
          if (i & (1 << j)) {  
              combo.push(words[j]); // Include this word in the combination  
          }  
      }  
      // Join the selected words and convert to title case, then add to combinations  
      combinations.push(toTitleCase(combo.join(' ')));  
  }  

  return combinations;  
}   


  module.exports.showSearchedListing = async (req, res) => {
    const { destintion } = req.query;
    // console.log("req.query: "+ req.query);
    console.log("search query: "+ destintion);
    const result = generateCombinations(destintion);
    console.log("Query split array:" + result);
    const allListings = await Listing.find({country: {$in: result }});
    // console.log("display lisitng: " + allListings);
    if(!allListings){
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    if(allListings.length ===0 ){
      req.flash("error", `${toTitleCase(destintion)} listings are temporarily unavailable`);
      return res.redirect("/listings");
    }
    // console.log(list);
    res.render("listings/search.ejs", { allListings });
    // console.log(req.params);
    // res.send(`get request to ${id}`);
  };

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
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
    newListing.owner = req.user._id;
    newListing.image = {filename, url};
    await newListing.save();
    // console.log(req.body);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
    // const listing = res.body;
    // await Listing.insertOne();
};

module.exports.renderEditForm = async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id);
      if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
      } 
      
      let originalImageURL = listing.image.url;
      originalImageURL = originalImageURL.replace("/upload", "/upload/ar_1.0,c_fill,h_250");
      // console.log(originalImageURL);
      res.render("listings/edit.ejs", { listing, originalImageURL });
};

module.exports.updateListing = async (req, res) => {
    
        let {id} = req.params;
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        // saving new imag data to database only if user uploaded new image
        if(typeof req.file !== "undefined"){
          let url = req.file.path;
          let filename = req.file.filename;
          listing.image = {filename, url};
          await listing.save();
        }
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
};

module.exports.destroylisting = async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};


