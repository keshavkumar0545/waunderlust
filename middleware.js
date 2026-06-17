const {listingSchema}=require("./schema.js");
const {reviewschema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js")
const Listing =require("./models/listing.js")
const Review=require("./models/reviews.js")

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //redirecturl save
        req.session.redirectUrl=req.originalUrl;

        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}


module.exports.isowner =async (req,res,next)=>{
    let {id} =req.params;
     let listing =await Listing.findById(id);

     if(res.locals.curruser && !listing.owner._id.equals(res.locals.curruser._id)){
      req.flash("error","you don,t have permission to edit")
      return res.redirect(`/listings/${id}`);
    }
    next()

}


//mideleware for listing scema validation
 module .exports. validateListing =(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);

  if(error){
   throw new ExpressError(400,error);
  }else{
   next()
  }

  
   
 };



 //mideleware for review schemam validation
  module.exports.validatereviews =(req,res,next)=>{
     let {error}=reviewschema .validate(req.body);
 
   if(error){
    throw new ExpressError(400,error);
   }else{
    next()
   }
 
   
    
  };


  module.exports.isauthor =async (req,res,next)=>{
    let {id,rid} =req.params;
     let review=await Review.findById(rid);

     if( !review.author._id.equals(res.locals.curruser._id)){
      req.flash("error","you don,t delete this review")
      return res.redirect(`/listings/${id}`);
    }
    next()

}