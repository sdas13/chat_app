import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  socket:SocketIOClient.Socket;
  
  constructor() { 
    this.socket=io('http://localhost:8080');
  }

  public getSocket():SocketIOClient.Socket{
    return this.socket;
  }

}
