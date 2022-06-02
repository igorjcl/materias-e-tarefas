import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Activity } from '../../interfaces/activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input() activity!: Activity;
  @Output() completeEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  complete(id: any) {
    this.completeEvent.emit(id);
  }

  delete(id: any) {
    this.deleteEvent.emit(id);
  }
}
