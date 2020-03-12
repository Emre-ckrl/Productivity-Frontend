import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChatService} from "../services/chat.service";
import {Message} from "../model/message";
import {log} from "util";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  messages: Message[] = [];
  title = 'Chats';

  constructor(private http: HttpClient, public chatService: ChatService) {
  }

  ngOnInit(): void {
    this.reloadMessageData();
  }

  sendMessage(newMessage: string, senderId: number, receiverId: number) {
    this.chatService.sendMessage(newMessage, senderId, receiverId)
      .subscribe(none => {
        this.reloadMessageData();
      });
  }

  private reloadMessageData() {
    this.chatService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }


  public getContentClass(message: Message, loggedInUserId: number): string {
    let contentClass = '';

    if (message.sender.id === loggedInUserId) {
      contentClass = 'message__sender';
      // todo schiebe nach rewchts
    }
    if (message.receiver.id === loggedInUserId) {
      contentClass = 'message__receiver';
      // todo schiebe nach links
    }

    return contentClass;
  }
}
