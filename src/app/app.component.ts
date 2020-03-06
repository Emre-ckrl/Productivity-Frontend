import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'productivity';
  theme = true;
  franz = document.documentElement;

  test() {
    if (this.theme === true) {
      this.franz.setAttribute('data-theme', 'dark');
      this.theme = false;
    } else {
      this.franz.setAttribute('data-theme', 'light');
      this.theme = true;
    }
  }
}

