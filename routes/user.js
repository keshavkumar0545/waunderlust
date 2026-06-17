const express=require("express")
const router=express.Router();
const wrapAsyc=require("../utils/wrapAsyc")
const User=require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js")
const usercontroller=require("../controllers/user.js")



router.get("/signup",usercontroller.rendersignupform)


router.post("/signup" , wrapAsyc(usercontroller.adduser))



   //login
   router.get("/login",usercontroller.renderloginform)


   router.post("/login",saveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
   }),usercontroller.loginuser)


   router.get("/loggout",usercontroller.loggoutuser)



 module.exports=router;