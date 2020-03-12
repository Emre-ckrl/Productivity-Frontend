import {Injectable} from '@angular/core';
import {Human} from "../model/human";
import {Message} from "../model/message";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HumanService {
  users: Human[] = [];
  loggedInUser: Human = new Human();

  constructor(private http: HttpClient) {
    this.getHumanList().subscribe(humans => {
      this.users = humans;

      this.loggedInUser = this.users[0];
      console.log(this.loggedInUser);
    });
  }

  getHumans() {
    return this.http.get<Message[]>('http://localhost:1908/show/2');
  }

  getHumanList() {
    return this.http.get<Human[]>('http://localhost:1908/all');
  }
}
