const session = require("express-session");

const createUser=(req,res)=>{
    //console.log(req.session.registrationErrors);
    res.render('register',{
        errors: req.flash('registrationErrors'),
        data: req.flash('data')[0]
    });
}

module.exports=createUser;