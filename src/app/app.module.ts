import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import {HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TodolistBoxComponent } from './todolist-box/todolist-box.component';
import {FormsModule} from '@angular/forms';
import { SwitchComponent } from './button/switch/switch.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatBoxComponent,
    SidebarComponent,
    TodolistBoxComponent,
    SwitchComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
