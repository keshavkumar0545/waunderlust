const { response } = require("express");
const Listing =require("../models/listing");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN
const geocodingclient= mbxgeocoding({ accessToken: mapToken });

module.exports.index=async (req,res)=>{

    const alllistings=await Listing.find({});
    res.render("listings/index.ejs",{alllistings});

}



 module.exports.rendernewform=(req,res)=>{
   res.render("listings/new.ejs")

 }
 
 



 //show rouet


 module.exports.showlisting= async (req,res)=>{
    let {id}=req.params;

 const  listings=await Listing.findById(id).populate({path:"reviews",populate:
   {  path:"author"
      
   }
 }).populate("owner");

 if(!listings){

     req.flash("error","Listing your request for does not exist!");
    return res.redirect("/listings");

 }
 res.render("listings/show.ejs",{listings});}


 //new

 module.exports.newlisting=async (req, res) => {

let response = await geocodingclient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
}).send();

    let url=req.file.path;
    let filename=req.file.filename;
 
    let listing = req.body.listing;

    let newListing = new Listing({
        title: listing. title,
        description: listing.description,
        image: {
            filename: filename,
            url: url
        },
       
        price: listing.price,
        location: listing.location,
        country: listing.country,
        owner:req.user._id
        ,
        geometry:response.body.features[0].geometry
    }
);

 let savelisting=   await newListing.save();
 console.log(savelisting)
    req.flash("success","New Listing created");

    res.redirect("/listings");
}


module.exports.renderEditForm=async(req,res)=>{
     let {id}=req.params;
     let listing=await Listing.findById(id);

     if(!listing){
        req.flash("error","Listing your request for does not exist!");
        return res.redirect("/listings")
     }

     let originalimage=listing.image.url
    originalimage= originalimage.replace("/upload","/upload/h_300,w_250")
     res.render("listings/edit.ejs",{listing,originalimage})
 }



module.exports.updatelisting =async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    let {id}=req.params;
    let {title,description,price,location,country}=req.body;
   
   if(typeof req.file!=="undefined"){

   
    await Listing.findByIdAndUpdate(id,{
        title:title,
        description:description,
        image:{
            filename: filename,
            url:url
        },
        price:price,
        location:location,
        country:country
    })}
       req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);

 }



module.exports.deletelisting= async(req,res)=>{
    let {id}=req.params;

   let deletlisting= await Listing.findByIdAndDelete(id);

   console.log("delet",deletlisting);
    req.flash("success"," Listing Deleted");

   res.redirect("/listings")



 }



 