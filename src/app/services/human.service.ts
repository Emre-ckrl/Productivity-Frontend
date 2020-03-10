import {Injectable} from '@angular/core';
import {Human} from "../model/human";
import {Message} from "../model/message";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HumanService {

  constructor(private http: HttpClient) {
  }

  getHumans() {
    return this.http.get<Message[]>('http://localhost:1908/show/2');
  }
}
