
require("dotenv").config();



const express=require("express");
const app=express()
const mongoose=require("mongoose")
const path=require("path")
const methodOverride = require("method-override");
const ejsmate=require("ejs-mate")
const ExpressError=require("./utils/ExpressError.js")
const Joi = require('joi');
const session=require("express-session")
const flash=require("connect-flash")
const passport=require("passport")
const LocalStrategy = require("passport-local");
const User=require("./models/user.js")
const MongoStore = require("connect-mongo").default;

const { error } = require("console");
const dbUrl=process.env.ATLASDB_URL;


app.use(methodOverride("_method"));
app.set("view engine","ejs")

app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
 async function main(){
    await mongoose.connect(dbUrl) 
 }

//mogoos setup
 main().then((res)=>{
    console.log("mongoosh connected")
 })

 app.engine("ejs",ejsmate);

 app.use(express.static(path.join(__dirname,"/public")))

 const store =MongoStore.create({
   mongoUrl:dbUrl,
   crypto:{
      secret:process.env.SECRET
   },
   touchAfter:24*360

}
 )

 store.on("error",()=>{
   console.log( "eror in session", error);
 })

const sessionOption ={
   store:store,
  
      secret:process.env.SECRET,
   resave:false,
   saveUnintialized:true,
   cookie:{
      expires:Date.now()+7*24*60*60*1000,
      maxAge:7*24*60*60*1000
      ,httpOnly:true

   }
};

app.use(session(sessionOption))
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
   res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.curruser=req.user;
   
   next()
})


const listings=require("./routes/listings.js")
const reviews=require("./routes/reviews.js")
const userRouter=require("./routes/user.js")

 app.use("/listings",listings)
 
 app.use("/listings/:id/reviews",reviews)
 app.use("/",userRouter);













 //all [psath]

 app.all("/*splat",(req,res,next)=>{
   next(new ExpressError(404,"page not found"))
 })


 //error handling middle ware
 app.use((err,req,res,next)=>{
   let {statusCode=500 ,message="something went wrong"}=err;
   res.render("listings/error.ejs",{err})
 })

 //server
 app.listen("8080",()=>{
    console.log("server runing 8080")
 })