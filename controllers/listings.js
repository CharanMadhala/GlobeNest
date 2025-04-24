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
function toTitleCaseArray(str) {  
  // Step 1: Split the input string into individual words  
  const words = str.toLowerCase().split(' ');  

  // Step 2: Capitalize each word  
  const titleCasedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));  

  // Step 3: Join the capitalized words to form the title case string  
  const titleCaseString = titleCasedWords.join(' ');  

  // Step 4: Combine title-cased words and the title case string into a single array  
  return [...titleCasedWords, titleCaseString]; // Spread operator to create a new array  
}  

  module.exports.showSearchedListing = async (req, res) => {
    const { destintion } = req.query;
    // console.log("req.query: "+ req.query);
    console.log("search query: "+ destintion);
    const result = toTitleCaseArray(destintion);
    console.log("Query split array:" + result);
    const allListings = await Listing.find({country: {$in: result }});
    // console.log("display lisitng: " + allListings);
    if(!allListings){
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    if(allListings.length ===0 ){
      req.flash("error", `${result[result.length - 1]} listings are temporarily unavailable`);
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


