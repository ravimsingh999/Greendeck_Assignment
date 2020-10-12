const Post = require('../database/models/Post');
const path= require('path');

const addEmail=(req,res)=>{
    const {image} =req.files;

    image.mv(path.resolve(__dirname,'..','public/posts',image.name),(error)=>{
        Post.create({
            ...req.body,
            author: req.session.userID
        },(error,post)=>{
            res.redirect('/');
        })
    })
}

module.exports=addEmail;