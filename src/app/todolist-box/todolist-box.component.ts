import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoService} from "../services/todo.service";
import {ToDoList} from "../model/todo-list";

@Component({
  selector: 'app-todolist-box',
  templateUrl: './todolist-box.component.html',
  styleUrls: ['./todolist-box.component.scss']
})
export class TodolistBoxComponent implements OnInit {
  listTitle = 'Work';
  todos: ToDoList[] = [];
  isCreatingTodo = false;

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.onReloadTodoData();
  }

  onClick(text: any) {
    this.todoService.createTodo(text).subscribe(none => {
      console.log('created todo');
      this.isCreatingTodo = false;

      this.onReloadTodoData();
    });
  }

  private onReloadTodoData() {
    this.todoService.getToDos().subscribe(data => {
      this.todos = [];
      console.table(data);
      console.log('received data');
      data.forEach(todoText => {
        const newTodo = new ToDoList(todoText, false);
        this.todos.push(newTodo);
      });
    });
  }
}
