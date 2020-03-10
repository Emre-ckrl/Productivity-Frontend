import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Output() testEvent = new EventEmitter<any>();

  ngOnInit(): void {
  }

  test() {
    this.testEvent.emit({
      testValue: ''
    });
  }

}
