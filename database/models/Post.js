const mongoose=require('mongoose');

const PostSchema = new mongoose.Schema({
    addemail: String,
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});
const Post=mongoose.model('Post',PostSchema);

module.exports=Post;