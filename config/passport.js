const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
const config=require('../config/database');

module.exports=function(passport){
    let opts={}
    opts.jwtFromRequest=ExtractJwt.fromAuthHeader();
    opts.secretOrKey=config.secret;
    
}
