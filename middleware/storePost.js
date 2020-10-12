const validation=(req,res,next)=>{
    if(!req.body.email)
    {
        res.redirect('/posts/new');
    }
    else
    next();
}

module.exports=validation;