import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChatService} from "../services/chat.service";
import {Message} from "../model/message";
import {log} from "util";
import {HumanService} from "../services/human.service";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  messages: Message[] = [];
  title = 'Chats';

  constructor(public chatService: ChatService, public humanService: HumanService) {
  }

  ngOnInit(): void {
    this.reloadMessageData();
  }

  sendMessage(newMessage: string, receiverId: number) {
    const senderId = this.humanService.loggedInUser.id;
    console.log('sender id' + senderId)
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
