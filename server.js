const mongo = require('mongodb').MongoClient;
const io = require('socket.io').listen(8888).sockets;

mongo.connect('mongodb://localhost', function (err, client) {

    if (err)
        throw err;

    console.log('Mongodb connected...');

    //connect to socket.io
    io.on('connection', function (socket) {
        console.log('New connection...');
        
        let chat = client.db('chat_app').collection('chats');

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
            console.log('Input received...',data);
            
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
                    console.log('Emit input message',data)
                })
            }

        })
    })

})