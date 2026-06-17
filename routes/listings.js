const express=require("express")
const router=express.Router();
const wrapAsyc=require("../utils/wrapAsyc")
const {listingSchema}=require("../schema.js");
const ExpressError=require("../utils/ExpressError.js")
const Listing=require("../models/listing.js")
const { isLoggedIn, isowner,validateListing,validatereviews } = require("../middleware");
const listingcontroller=require("../controllers/listings.js")
const multer=require("multer")//for parssing file data
const {storage}=require("../cloudConfic.js")

const upload = multer({ storage });//destination







 

 //index route
 router.get("/",wrapAsyc (listingcontroller.index));
 


 //new route with get and post

router.get("/edit",isLoggedIn,listingcontroller.rendernewform)

 router.post("/",isLoggedIn, validateListing ,upload.single("listing[image]"),wrapAsyc(listingcontroller.newlisting))
 
 //show route

 router.get("/:id",wrapAsyc( listingcontroller.showlisting ))

 //update route
 router.get("/:id/edit",isLoggedIn,isowner,wrapAsyc(listingcontroller.renderEditForm))

 router.put("/:id", isLoggedIn,isowner, upload.single("listing[image]"),wrapAsyc(listingcontroller.updatelisting))

 //delete

 router.delete("/:id" ,isLoggedIn,isowner, wrapAsyc(listingcontroller.deletelisting))

 module.exports=router;