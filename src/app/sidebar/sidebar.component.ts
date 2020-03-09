import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  todolists = ['Work', 'School', 'Home'];
  chats: Human[] = [];

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.chats = this.getHumans();
  }

  getHumans() {
    const humans: Human[] = [];

    this.http.get<Message[]>('http://localhost:1908/show/2').subscribe(messages => {
      console.log('received data');

      messages.forEach(message => humans.push(message.sender));
    });

    return humans;
  }

  goToChats() {
    this.router.navigate(['chats']);
  }

  goToToDos() {
    this.router.navigate(['todos']);
  }
}

class Human {
  id: number;
  name: string;
  skinColor: string;
}

class Message {
  text: string;
  receiver: Human;
  sender: Human;
}
