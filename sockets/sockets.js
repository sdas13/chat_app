let messages = require('../models/message');

function sockets(io) {

    //connect to socket.io
    io.on('connection', function (socket) {
        console.log('a user connected');

        //Create function to send status
        sendStatus = function (s) {
            console.log('Send status');
            socket.emit('status', s);
        }

        //get first 100 chats
        /*
        messages.find().sort({
            _id: 1
        }).limit(100).toArray(function (err, res) {
            if (err)
                throw err

            //Emit messages
            socket.emit('output', res)
        })
*/
        messages.find({}, ['sender', 'content', 'time_created'], {
            skip: 0, limit: 100, sort: {
                time_created: 1
            }
        }, function (err, docs) {
            socket.emit('output', docs);
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

}

module.exports = sockets;