import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from '../services/todo.service';
import {ToDoList} from '../model/to-do-list';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-todolist-box',
  templateUrl: './todolist-box.component.html',
  styleUrls: ['./todolist-box.component.scss']
})
export class TodolistBoxComponent implements OnInit, OnDestroy {
  todolistName = '';
  isCreatingTodo = false;
  todolist: ToDoList = this.todoService.selectedTodoList;

  private newTodolistSelected: Subscription = Subscription.EMPTY;

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.newTodolistSelected = this.todoService.selectedTodolist$.subscribe(() => {
      this.todolist = this.todoService.selectedTodoList;
      this.todolistName = this.todolist.name;
    });

  }

  onCreateTodo(text: any, todolistName: string) {
    this.todoService.createTodo(text, todolistName).subscribe(none => {
      this.isCreatingTodo = false;

      this.todoService.getToDoLists().subscribe(todoLists => {
        this.todoService.todolists = todoLists;
        this.todoService.todoLists.next();

        this.todoService.selectedTodoList = todoLists[0];
        this.todoService.selectedTodolist.next();
      });
    });
  }

  public ngOnDestroy(): void {
    this.newTodolistSelected.unsubscribe();
  }
}
