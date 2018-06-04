import { Component, OnInit, NgZone } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  messageText:string;
  messages:Array<any>=[];
  socket:SocketIOClient.Socket;

  constructor(private _socketService:SocketService, private _zone:NgZone) { 
    this.socket=_socketService.getSocket();
  }

  ngOnInit() {
    this.socket.on('output', (data) => {
      console.log('Output received...',data);
      this._zone.run(()=>{
        data.forEach(element => {
         this.messages.push(element) 
        })
      })
    })
  }

  sendMessage(){
    this.socket.emit('input',{
      messageText:this.messageText
    })
    this.messageText=null;
  }

}