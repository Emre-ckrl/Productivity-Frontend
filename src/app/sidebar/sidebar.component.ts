import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Human} from "../model/human";
import {HumanService} from "../services/human.service";
import {ToDoList} from "../model/to-do-list";
import {TodoService} from "../services/todo.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  todolists: ToDoList[] = [];
  chats: Human[] = [];
  isOpenTodoLists = false;
  isOpenChats = true;

  constructor(private router: Router, private http: HttpClient, public humanService: HumanService, public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.chats = this.getHumans();
    this.todoService.getToDoLists().subscribe(toDolists => {
      this.todolists = toDolists;
    });
  }

  getHumans() {
    const humans: Human[] = [];

    this.humanService.getHumans().subscribe(messages => {
      console.log('received data');

      messages.forEach(message => humans.push(message.sender));
    });

    return humans;
  }

  onSelectTodolist(todolist: ToDoList) {
    this.todoService.selectTodoList(todolist);
    this.todoService.selectedTodolist.next();

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


