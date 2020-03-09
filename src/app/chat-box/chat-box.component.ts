import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  messages: Message[] = [];
  title = 'Chats';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.reloadMessageData();
  }


  getMessages() {
    return this.http.get<Message[]>('http://localhost:1908/show/2');
  }


  sendMessage(newMessage: string, senderId: number, receiverId: number) {
    const requestData: MessageRequestData = new MessageRequestData();
    requestData.text = newMessage;
    requestData.senderId = senderId;
    requestData.receiverId = receiverId;


    this.http.post('http://localhost:1908/send', requestData).subscribe(none => {
      console.log('sent message');
      this.reloadMessageData();
    });
  }

  private reloadMessageData() {
    this.getMessages().subscribe(data => {
      console.table(data);
      console.log('received data');
      this.messages = data;
    });
  }
}

class MessageRequestData {
  text: string;
  receiverId: number;
  senderId: number;
}

class Message {
  text: string;
  receiver: Human;
  sender: Human;
}
class Human {
  id: number;
  name: string;
  skinColor: string;
}
