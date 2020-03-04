import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  messages = ['hello', 'helloworld', 'moin'];
  title = 'ToDos';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getMessages().subscribe(data => {
      this.messages = data;
      console.log('received data');
    });
  }


  getMessages() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'authkey',
        'userid': '1'
      })
    };
    return this.http.get<string[]>('localhost:1908/show/1', httpOptions);
  }

}
