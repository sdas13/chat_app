'use strict';

module.exports = function(_, passport){
    
    return {
        SetRouting: function(router){
           router.get('/',this.indexPage);
           router.post('/',this.postlogin);        
           router.get('/signup',this.signupPage);
           router.post('/signup',this.postSignup);
           router.get('/home',this.homePage);
        },        
        indexPage:function(req,res){
            return res.render('index',{test:'This is a test'})
        },
        signupPage:function(req,res){
            return res.render('signup')
        },
        postLogin:passport.authenticate('local.login',{
            successRedirect:'/home',
            failureRedirect:'/',
            failureFlash:true
        }),
        postSignup:passport.authenticate('local.signup',{
            successRedirect:'/home',
            failureRedirect:'/signup',
            failureFlash:true
        }),
        homePage:function(req,res){
            return res.render('home')
        }
    }
    
}