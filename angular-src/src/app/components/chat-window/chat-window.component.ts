import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  messageText:string;
  messages:Array<any>;
  socket:SocketIOClient.Socket;

  constructor() { 
    this.socket=io('http://localhost:8080');
  }

  ngOnInit() {
    this.messages=[];
    this.socket.on('e1',function () {
      
    });
    this.socket.emit('e2',{})
  }

  sendMessage(){
    this.socket.emit('e3',{})
  }

}