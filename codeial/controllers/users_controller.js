const User = require('../models/user');

module.exports.profile = function(req,res){

    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

    
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id, function(err,user){
    //         if(user){
    //             return res.render('user_profile', {
    //                 title: "User Profile",
    //                 user: user
    //             })
    //         }else{
    //             return res.redirect('/users/sign-in');
    //         }
    //     });
    // }else{
    //     return res.redirect('/users/sign-in');
    // }

};

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// render Sign Up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};

// render Sign In page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};

// get up the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }

        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
};

// // sign in and create session for user
// module.exports.createSession = function(req, res){
//     // steps to authenticate
//     // find the user
//     User.findOne({email: req.body.email}, function(err,user){
//         if(err){
//             console.log('Error in finding user in signing up');
//             return;
//         }

//         // handle user found
//         if(user){

//             // handle password which dont match
//             if (user.password != req.body.password){
//                 return res.redirect('back');
//             }
//             //handle session creation
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');

//         }else{
//             //handle user not found
//             return res.redirect('back');
//         }
//     });
// };

// // render Sign Out
// module.exports.deleteSession = function(req, res){
//     res.clearCookie('user_id');
//     return res.redirect('/users/sign-in');
// };







// sign in and create session for user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}