import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Human} from "../model/human";
import {HumanService} from "../services/human.service";
import {ToDoList} from "../model/to-do-list";
import {TodoService} from "../services/todo.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  todolists: ToDoList[] = [];
  chats: Human[] = [];
  isOpenTodoLists = false;
  isCreatingToDoList = false;
  isOpenChats = true;

  private todoListsSubscription: Subscription = Subscription.EMPTY;

  constructor(private router: Router, private http: HttpClient, public humanService: HumanService, public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.chats = this.getHumans();

    this.todoListsSubscription = this.todoService.todoLists$.subscribe(() => {
      this.todolists = this.todoService.todolists;
    });
  }

  getHumans() {
    const humans: Human[] = [];

    this.humanService.getHumans().subscribe(messages => {
      messages.forEach(message => humans.push(message.sender));
    });

    return humans;
  }

  onSelectTodolist(todolist: ToDoList) {
    this.todoService.selectTodoList(todolist);
    this.todoService.selectedTodolist.next();
    this.router.navigate(['todos']);
  }

  onClickToChats() {
    this.router.navigate(['chats']);
    this.isOpenChats = !this.isOpenChats;
  }

  onClickToToDos() {
    this.router.navigate(['todos']);
    this.isOpenTodoLists = !this.isOpenTodoLists;
  }

  onCreateTodoList(text: string) {
    this.todoService.createTodoList(text).subscribe(none => {
      // this.isCreatingTodoList = false;

      this.todoService.getToDoLists().subscribe(todoLists => {
        this.todoService.todolists = todoLists;
        this.todoService.todoLists.next();

        // this.todoService.selectedTodoList = todoLists[0];
        //  this.todoService.selectedTodolist.next();
      });
    });
  }


  public ngOnDestroy(): void {
    this.todoListsSubscription.unsubscribe();
  }
}


