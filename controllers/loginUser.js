const bcrypt=require('bcrypt');
const User=require('../database/models/User');

const loginUser=(req,res)=>{
    const {email,password}=req.body;

    User.findOne({email},(error,user)=>{
        if(user){
        bcrypt.compare(password,user.password,(error,same)=>{
            if(same){
                req.session.userID=user._id;
                res.redirect('/');
            }
            else
            {
                res.redirect('/auth/login');
            }
        })
        }
        else{
            return res.redirect('/auth/login');
        }
    })
}
module.exports=loginUser;