import {Injectable} from '@angular/core';
import {ToDoRequestData} from "../model/todo-request-data";
import {HttpClient} from "@angular/common/http";
import {ToDo} from "../model/to-do";
import {ToDoList} from "../model/to-do-list";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public selectedTodolist: Subject<any> = new Subject();
  public selectedTodolist$ = this.selectedTodolist.asObservable();
  selectedTodoList: ToDoList = new ToDoList();

  public todoLists: Subject<any> = new Subject();
  public todoLists$ = this.todoLists.asObservable();
  public todolists: ToDoList[] = [];

  constructor(private http: HttpClient) {
    this.getToDoLists().subscribe(todoLists => {
      this.todolists = todoLists;
      this.todoLists.next();

      this.selectedTodoList = this.todoLists[0];
    });
  }

  selectTodoList(selectedTodoList: ToDoList) {
    this.selectedTodoList = selectedTodoList;
  }

  getToDoLists() {
    return this.http.get<ToDoList[]>('http://localhost:1908/todos');
  }

  createTodo(text: string, todolistName: string) {
    const todo = new ToDoRequestData();
    todo.id = 2;
    todo.text = text;
    todo.toDoListName = todolistName;

    return this.http.post('http://localhost:1908/todo/create', todo);
  }

  getConditionedTodos(todolist: ToDoList, condition: boolean) {
    if (todolist && todolist.toDos.length !== 0) {
      return todolist.toDos.filter(todo => todo.condition === condition);
    }

    return [];
  }


  createTodoList(text: string) {
    const todolist = new ToDoRequestData();
    todolist.id = 2;
    todolist.text = text;
    console.log('click');

    return this.http.post('http://localhost:1908/todolist/create', todolist);
  }

}

