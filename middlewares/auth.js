const Story =  require('../models/story')

//checking if user is a next, if user is a guest we continue else redreict it to login  
exports.isGuest = (req,res,next)=>{
    if(!req.session.user){
        return next();
    }else{
        req.flash('error', 'You are logged in already');      
                  return  res.redirect('/users/profile'); 
    }
};

//checking if user is authenticated
exports.isLoggedIn =  (req,res,next)=>{
    if(req.session.user){
        next();
    }else{
        req.flash('error', 'Please login first to continue');      
        return  res.redirect('/users/login');
    }
};

//check if user is author of the story

exports.isAuthor = (req,res,next)=>{
 let id = req.params.id;
 Story.findById(id)
 .then(story=>{
    if(story){
        if(story.author == req.session.user){
            return next();
        }else{
            let err = new Error('You are not authorized to perform this action');
            err.status = 401;
            return next(err);
        }
    }
 })
 .catch(err=>next(err));
};