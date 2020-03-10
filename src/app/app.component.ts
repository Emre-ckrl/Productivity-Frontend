import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Welcome to Productivity';

  theme = true;
  doc = document.documentElement;

  eventFunction(event: any) {
    if (this.theme === true) {
      this.doc.setAttribute('data-theme', 'dark');
      this.theme = false;
    } else {
      this.doc.setAttribute('data-theme', 'light');
      this.theme = true;
    }
  }

}

