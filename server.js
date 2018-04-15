const mongo = require('mongodb').MongoClient;
const io = require('socket.io').listen(8888).sockets;

mongo.connect('mongodb://localhost/chat_app', function (err, db) {

    if (err)
        throw err;

    console.log('Mongodb connected...');

    //connect to socket.io
    io.on('connection', function (socket) {
        let chat = db.collection('chats');

        //Create function to send status
        sendStatus = function (s) {
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
                    socket.emit('output', [data]);
                    //send status
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    })
                })
            }

        })

        //Handle Clear
        socket.on('clear', function (data) {
            chat.remove({}, function () {
                socket.emit('cleared')
            })
        })


    })


})
