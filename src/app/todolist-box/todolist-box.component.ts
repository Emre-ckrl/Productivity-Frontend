import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-todolist-box',
  templateUrl: './todolist-box.component.html',
  styleUrls: ['./todolist-box.component.scss']
})
export class TodolistBoxComponent implements OnInit {
  listTitle = 'Work';
  todos = ['finish project', 'call client', 'start new project']

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getToDos().subscribe(data => {
      console.table(data);
      console.log('received data');
      this.todos = data;
    });
  }

  getToDos() {
    return this.http.get<string[]>('http://localhost:1908/todo/show/2');
  }

}
