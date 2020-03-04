import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-todolist-box',
  templateUrl: './todolist-box.component.html',
  styleUrls: ['./todolist-box.component.scss']
})
export class TodolistBoxComponent implements OnInit {
  listTitle = 'Work';
  todos = ['finish project', 'call client', 'start new project']

  constructor() {
  }

  ngOnInit(): void {
  }

}
