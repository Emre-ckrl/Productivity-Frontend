import {Injectable} from '@angular/core';
import {ToDoRequestData} from "../model/todo-request-data";
import {HttpClient} from "@angular/common/http";
import {ToDoList} from "../model/todo-list";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  getToDos() {
    return this.http.get<string[]>('http://localhost:1908/todo/show/2');
  }

  createTodo(text: string) {
    const todo = new ToDoRequestData();
    todo.id = 2;
    todo.text = text;

    return this.http.post('http://localhost:1908/todo/create', todo);
  }

  getConditionedTodos(todos: ToDoList[], condition: boolean) {
    const resultList = [];

    todos.forEach(todo => {
      if (todo.condition === condition) {
        resultList.push(todo);
      }
    });

    return resultList;
  }

}

