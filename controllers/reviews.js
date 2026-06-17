const Review=require("../models/reviews.js")
const Listing=require("../models/listing.js")



module.exports.createreview=async(req,res)=>{
    let {id}=req.params;
     let review=req.body.review;
     let Reviews= new Review({
       rating:review.rating,
       comment:review.comment,
       author:req.user._id
     })
     console.log(Reviews);
 
     await Reviews.save();
    let listing=await Listing.findById(id);
     listing.reviews.push(Reviews)
     await listing.save();

      req.flash("success","New review created");
 
  res.redirect(`/listings/${id}`);
 
 
 
 
 }


 module.exports.deletereview=async(req,res)=>{
    let {id,rid}=req.params;
  
   await Listing.findByIdAndUpdate(id ,{$pull:{reviews:rid}})
     await  Review.findByIdAndDelete(rid);
      req.flash("success","review deleted");
 
   res.redirect(`/listings/${id}`);
 
 
 
 }
