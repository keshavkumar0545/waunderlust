const express=require("express")
const router=express.Router({mergeParams : true});
const Review=require("../models/reviews.js")
const wrapAsyc=require("../utils/wrapAsyc")
const ExpressError=require("../utils/ExpressError.js")
const Listing=require("../models/listing.js")
const {reviewschema}=require("../schema.js");
const {isLoggedIn,validatereviews,isauthor} =require("../middleware.js")
const reviewcontroller=require("../controllers/reviews.js")






 router.post("/",validatereviews,isLoggedIn ,wrapAsyc(reviewcontroller.createreview))

 //delete review
router.post("/:rid",isLoggedIn,isauthor,wrapAsyc(reviewcontroller.deletereview))

module.exports=router;