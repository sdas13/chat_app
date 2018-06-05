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

        messages.find({}, ['sender', 'content', 'time_created'], {
            skip: 0, limit: 100, sort: {
                time_created: 1
            }
        }, function (err, docs) {
            socket.emit('output', docs);
        })

/*
        const jsonData=[
            {sender:'sdas13',content:'Hello'},
            {sender:'dbasak',content:'Hi'},
            {sender:'dbasak',content:'Howdy'},
            {sender:'sdas13',content:'Hola'},
            {sender:'sdas13',content:'Hello'},
            {sender:'dbasak',content:'Hi'},
            {sender:'dbasak',content:'Howdy'},
            {sender:'sdas13',content:'Hola'}
        ]
        socket.emit('output',jsonData);

        io.emit('output',[{sender:'sdas13',content:data.messageText}]);
*/
       
        //Handle input events
        socket.on('input', function (data) {
            console.log('Input received...', data);

            let message={}
            message.sender=data.sender
            message.content=data.content
            message.time_created=data.time_created
            message.conversationId=123
            
            messages.create(message,function (err, doc) {
                io.emit('output',[doc])
            })
            /*
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
             */   
        })
    })

}

module.exports = sockets;