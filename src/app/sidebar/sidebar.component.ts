import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Human} from "../model/human";
import {HumanService} from "../services/human.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  todolists = ['Work', 'School', 'Home'];
  chats: Human[] = [];
  isOpenTodoLists = false;
  isOpenChats = true;

  constructor(private router: Router, private http: HttpClient, public humanService: HumanService) {
  }

  ngOnInit(): void {
    this.chats = this.getHumans();
  }

  getHumans() {
    const humans: Human[] = [];

    this.humanService.getHumans().subscribe(messages => {
      console.log('received data');

      messages.forEach(message => humans.push(message.sender));
    });

    return humans;
  }

  onClickToChats() {
    this.router.navigate(['chats']);
    this.isOpenChats = !this.isOpenChats;
  }

  onClickToToDos() {
    this.router.navigate(['todos']);
    this.isOpenTodoLists = !this.isOpenTodoLists;
  }
}


