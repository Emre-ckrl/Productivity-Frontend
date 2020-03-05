import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  messages = [];
  title = 'ToDos';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getMessages().subscribe(data => {
      console.table(data);
      console.log('received data');
      this.messages = data;
    });
  }

  getMessages() {
    return this.http.get<string[]>('http://localhost:1908/show/2');
  }

}
