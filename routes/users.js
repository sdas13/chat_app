const express = require('express');
const router = express.Router();

router.get('/register', function (req, res) {
    res.send('REGISTER')
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