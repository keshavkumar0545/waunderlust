const User=require("../models/user.js");
const passport = require("passport");


module.exports.rendersignupform=(req,res)=>{
    res.render("users/signup.ejs")
}



module.exports.adduser=async (req,res)=>{
    try{

    let {username ,email,password}=req.body;
    const newuser=new User({email,username});
   const registered = await User.register(newuser,password);
   console.log(registered)
   req.login(registered,(e)=>{
     if(e){
        return next(e)
     }
       req.flash("success","user was register sussesfully")

   res.redirect("/listings");

   })

   }catch(e){
    req.flash("error",e.message);
    res.redirect("/signup")
   }

}



module.exports.renderloginform=(req,res)=>{
    res.render("users/login.ejs")
}


module.exports.loginuser=(req,res)=>{
    req.flash("success","suscussfull login")
    res.redirect(res.locals.redirectUrl || "/listings")

   }



   module.exports.loggoutuser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out")
        res.redirect("/listings")
    })
   }