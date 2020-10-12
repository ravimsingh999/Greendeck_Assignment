const Post = require('../database/models/Post');

const homepage=async(req,res)=>{
    const posts=await Post.find({}).populate('author');
   res.render('index',{
       posts
   });
}
module.exports=homepage;