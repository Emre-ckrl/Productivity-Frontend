import { Injectable } from '@angular/core';
import {Message} from "../model/message";
import {MessageRequestData} from "../model/message-request-data";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  getMessages() {
    return this.http.get<Message[]>('http://localhost:1908/show/2');
  }


  sendMessage(newMessage: string, senderId: number, receiverId: number) {
    const requestData: MessageRequestData = new MessageRequestData();
    requestData.text = newMessage;
    requestData.senderId = senderId;
    requestData.receiverId = receiverId;

    return this.http.post('http://localhost:1908/send', requestData);
  }
}
