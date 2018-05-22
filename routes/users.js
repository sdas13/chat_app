const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const config = require('../config/database');

router.post('/register', function (req, res) {
    let user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;

    User.addUser(user, function (err, user) {
        if (err)
            res.json({
                success: false,
                msg: 'Failed to register user'
            })
        else
            res.json({
                success: true,
                message: 'User registered!'
            })
    })

})

router.post('/authenticate', function (req, res) {

    let username = req.body.username
    let password = req.body.password

    User.findUserByName(username, function (err, user) {
        if (err)
            throw err
        if (!user)
            return res.json({
                success: false,
                msg: 'User not found'
            });

        User.comparePassword(password, user.password, function (err, isMatch) {
            if (err)
                throw err
            if (isMatch) {
                let token = jwt.sign(JSON.stringify(user), config.secret)
                res.json({
                    success: true,
                    token: 'bearer ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        name: user.name,
                        email: user.email
                    }
                })
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong password'
                })
            }
        })
    })
})

router.get('/profile', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    res.json({
        user: req.user
    })
})

module.exports = router;

/* 
** Sample Protected Route using JWT **
router.post('/login', function (req, res) {
    let user = {
        id: 1
    }
    let token = jwt.sign({
        user
    }, 'secret_key');
    res.json({
        token
    })
})

router.get('/protected', ensureToken, function (req, res) {
    jwt.verify(req.token, 'secret_key', function (err, data) {
        if (err)
            res.sendStatus(403)
        else
            res.json({
                text: 'This is protected',
                data: data
            })
    })

})

function ensureToken(req, res, next) {
    // console.log(req.headers);

    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
*/
