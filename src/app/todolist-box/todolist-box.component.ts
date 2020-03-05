import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-todolist-box',
  templateUrl: './todolist-box.component.html',
  styleUrls: ['./todolist-box.component.scss']
})
export class TodolistBoxComponent implements OnInit {
  listTitle = 'Work';
  todos: ToDoList[] = [];
  isCreatingTodo = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getToDos().subscribe(data => {
      console.table(data);
      console.log('received data');
      data.forEach(todoText => {
        const newTodo = new ToDoList(todoText, false);
        this.todos.push(newTodo);
      });
    });
  }

  getToDos() {
    return this.http.get<string[]>('http://localhost:1908/todo/show/2');
  }

  handleClick(textt: any) {
    const todo = new ToDoRequestData();
    todo.id = 2;
    todo.text = textt;

    this.http.post('http://localhost:1908/todo/create', todo).subscribe(none => {
      console.log('created todo');
      this.isCreatingTodo = false;

      this.getToDos().subscribe(data => {
        console.table(data);
        console.log('received data');
        data.forEach(todoText => {
          const newTodo = new ToDoList(todoText, false);
          this.todos.push(newTodo);
        });
      });
    });
  }

  getCompletedTodos() {
    const completed = [];

    this.todos.forEach(todo => {
      if (todo.condition === true) {
        completed.push(todo);
      }
    });

    return completed;

  }

  getNonCompletedTodos() {
    const noncompleted = [];

    this.todos.forEach(todo => {
      if (todo.condition === false) {
        noncompleted.push(todo);
      }
    });

    return noncompleted;
  }

  complete(todo: ToDoList) {
    todo.condition = true;
  }
}

class ToDoRequestData {
  text: string;
  id: number;
}

class ToDoList {
  text: string;
  condition: boolean;
  creator: any;


  constructor(text: string, condition: boolean) {
    this.text = text;
    this.condition = condition;
  }
}
