const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

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
    console.log(req.headers);

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

router.get('/authenticate', function (req, res) {
    res.send('authenticate')
})

router.get('/profile', function (req, res) {
    res.send('profile')
})

router.get('/validate', function (req, res) {
    res.send('validate')
})

module.exports = router;