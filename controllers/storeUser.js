const User = require('../database/models/User');

const store=(req,res)=>{

    User.create(req.body,(error,user)=>{
        if(error){
        //    console.log(error)
        const registrationErrors=Object.keys(error.errors).map(key=>error.errors[key].message);
           req.flash('registrationErrors',registrationErrors);
           req.flash('data',req.body);
           return  res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}

module.exports=store;