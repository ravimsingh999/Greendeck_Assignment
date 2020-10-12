const User = require('../database/models/User');

const auth=(req,res,next)=>{
    //fetch user from database
    User.findById(req.session.userID,(error,user)=>{
        if(error || !user){
            return res.redirect('/');
        }
        next();
    })

    // verify user

    //if user is valid, permit request

    // else redirect 
}
module.exports=auth;