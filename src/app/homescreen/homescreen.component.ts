import {Component, OnDestroy, OnInit} from '@angular/core';
import {count} from 'rxjs/operators';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})
export class HomescreenComponent implements OnInit, OnDestroy {

  private readonly TYPING_DELAY = 100;
  private readonly TIMEOUT_DELAY = 500;
  private readonly REMOVE_DELAY = 200;

  private words = ['Welcome to my first Angular project'];
  public typingText = '';
  private timer;
  private visible = false;

  typingEffect(counter: number = 0) {

    const word: string[] = this.words[counter].split('');
    const loopTyping = () => {
      if (this.visible === false) {
        return;
      }
      if (word.length > 0 && this.visible) {
        this.typingText += word.shift();
      } else {
        setTimeout(() => this.deletingEffect(counter), this.TYPING_DELAY);
        return false;
      }
      this.timer = setTimeout(loopTyping, this.TIMEOUT_DELAY);
    };
    loopTyping();
  }


  deletingEffect(counter) {
    const word: string[] = this.words[counter].split('');
    const loopDeleting = () => {
      if (this.visible === false) {
        return;
      }
      if (word.length > 0 && this.typingText) {
        word.pop();
        this.typingText = word.join('');
      } else {
        if (this.words.length > (counter + 1)) {
          counter++;
        } else {
          counter = 0;
        }
        setTimeout(() => this.typingEffect(counter), this.TYPING_DELAY);
        return false;
      }
      this.timer = setTimeout(loopDeleting, this.REMOVE_DELAY);
    };
    loopDeleting();
  }

  ngOnInit(): void {
    this.visible = true;
    this.typingEffect();
  }

  ngOnDestroy() {
    this.visible = false;
  }

}
