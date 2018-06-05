import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  socket:SocketIOClient.Socket;
  
  constructor() { 
    this.socket=io(environment.apiEndpoint);
  }

  public getSocket():SocketIOClient.Socket{
    return this.socket;
  }

}
