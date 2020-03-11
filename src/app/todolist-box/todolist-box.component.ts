import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoService} from "../services/todo.service";
import {ToDo} from "../model/to-do";
import {ToDoList} from "../model/to-do-list";
import {Subscribable, Subscription} from "rxjs";

@Component({
  selector: 'app-todolist-box',
  templateUrl: './todolist-box.component.html',
  styleUrls: ['./todolist-box.component.scss']
})
export class TodolistBoxComponent implements OnInit, OnDestroy {
  isCreatingTodo = false;
  todolist: ToDoList = this.todoService.selectedTodoList;

  private newTodolistSelected: Subscription = Subscription.EMPTY;

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.newTodolistSelected = this.todoService.selectedTodolist$.subscribe(() => {
      this.todolist = this.todoService.selectedTodoList;
    });
  }

  onClick(text: any, todolistName: string) {
    this.todoService.createTodo(text, todolistName).subscribe(none => {
      console.log('created todo');
      this.isCreatingTodo = false;
    });
  }

  public ngOnDestroy(): void {
    this.newTodolistSelected.unsubscribe();
  }
}
