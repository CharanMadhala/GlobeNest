const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    // image: {
        
    //     filename: String,
    //     url: {
    //         type: String,
    //         // default --> applicable is no image link is provided i.e., it is not mentioned while creating schema.
    //         default: "https://images.unsplash.com/photo-1484199383121-dfa3c30608cd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         // in documentation of mongoosejs.com --> Schema --> virtuals --> "set" if we get image for client side and it is empty then we will use default image link else image provided. 
    //         set: (v) => v===""?"https://images.unsplash.com/photo-1484199383121-dfa3c30608cd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v,
    //     },
    //     },
    image: {
        filename: { 
            type: String 
        },
        url: { 
            type: String,
            default: "https://images.unsplash.com/photo-1484199383121-dfa3c30608cd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    price: Number,
    location: String,
    country: String,

});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;