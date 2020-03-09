import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodolistBoxComponent} from './todolist-box/todolist-box.component';
import {ChatBoxComponent} from './chat-box/chat-box.component';


const routes: Routes = [
  {path: '' , component: TodolistBoxComponent},
  {path: 'todos' , component: TodolistBoxComponent},
  {path: 'chats' , component: ChatBoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
