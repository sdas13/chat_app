const express = require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const http=require('http');
const cookieParser=require('cookie-parser');//save cookies in the browser
const validator=require('express-validator');//serverside validate
const session=require('express-session');//store sessions
const MongoStore=require('connect-mongo')(session);//using mongo store session data is stored in database
const mongoose=require('mongoose');
const flash=require('connect-flash');//flash messages
const passport=require('passport');
const container=require('./container');

container.resolve(function(users){
    
    mongoose.Promise=global.Promise;
    mongoose.connect('mongodb://localhost/chat_app');
    
    const app=SetupExpress();
    
    function SetupExpress(){
        const app=express();
        const server=http.createServer(app);
        server.listen(8888,function(){
            console.log('Listening on port 8888...');
        })
        
        ConfigureExpress(app);
        
        //setup route
        const router=require('express-promise-router')();
        users.SetRouting(router);
    
        app.use(router);
    }
    
    function ConfigureExpress(app){
        require('./passport/passport-local.js')
        
        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine','ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(validator());
        app.use(session({ 
            secret:'thisisasecretkey',
            resave:true,
            saveInitialized:true,
            store:new MongoStore({mongooseConnection:mongoose.connection})
        }));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
    }
    
})
