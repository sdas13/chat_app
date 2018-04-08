'use strict'

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

//Serialize User:Passport determines which user data will saved in session,usually using user id, so users id is saved in session
//Deserialize user:then using the userid to reterive the data from database

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    });
});

passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true //All of the user's data wil be passed to callback
}, (req,email,password,done)=>{
    
    User.findOne({'email':email},(err,user)=>{
        if(err)
            return done(err)
        if(user)
            return done(null,false,req.flash('User with Email already present!'))
        
        const newUser=new User();
        newUser.username=req.body.username;
        newUser.email=req.body.email;
        newUser.password=req.body.password;
        
        newUser.save((err)=>{
            done(null,newUser)
        });
    });
    
}));

