const bcrypt=require('bcrypt');

const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required: [true,'username is required'],
        unique:true
    },
    email:{
            type:String,
            required: [true,'Email is required'],
            unique:true
    },
    password:{
        type:String,
        required:[true,'Password is Required']
    }
});

UserSchema.pre('save',function(next){
    const user=this
    bcrypt.hash(user.password,10,function(error,encrypted){
        user.password=encrypted
        next()
    })
})
const User=mongoose.model('User',UserSchema);
module.exports=User;