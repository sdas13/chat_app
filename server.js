const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./config/passport');
const mongoose = require('mongoose');
const sockets = require('./sockets/sockets');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.once('open', function () {
    console.log(`Database connection successfull !!`);
});

mongoose.connection.on('error', function (err) {
    console.log(`Database connection error: ${err}`);
    const mongo = require('mongodb').MongoClient;
});

let app = express(); //app is just a callback, similar to function(req,res){}
let http = require('http').Server(app); //http.Server() works same as http.createServer() method
let io = require('socket.io')(http);
//const io = require('socket.io').listen(8888).sockets;
sockets(io);

const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

//app.use(morgan('dev'));
const users = require('./routes/users');

app.use('/users', users);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

http.listen(port, () => {
    console.log(`Server started on port ${port}...`);
})

/*
mongo.connect('mongodb://localhost', function (err, client) {

    if (err)
        throw err;

    console.log('Mongodb connected !!');

    //connect to socket.io
    io.on('connection', function (socket) {
        console.log('a user connected');

        let chat = client.db('chat_app').collection('chats');

        //Create function to send status
        sendStatus = function (s) {
            console.log('Send status');
            socket.emit('status', s);
        }

        //get first 100 chats
        chat.find().sort({
            _id: 1
        }).limit(100).toArray(function (err, res) {
            if (err)
                throw err

            //Emit messages
            socket.emit('output', res)
        })

        //Handle input events
        socket.on('input', function (data) {
            console.log('Input received...', data);

            let name = data.name;
            let message = data.message;

            //check name & message and send message
            if (name == '' || message == '')
                sendStatus('Please enter a name or message')
            else {
                //Insert message
                chat.insert({
                    name: name,
                    message: message
                }, function () {
                    io.emit('output', [data]);
                    //send status
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    })
                    console.log('Emit input message', data)
                })
            }

        })
    })

})
*/