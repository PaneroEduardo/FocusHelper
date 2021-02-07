import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'days-selector',
  templateUrl: './days-selector.component.html',
  styleUrls: ['./days-selector.component.scss'],
})
export class DaysSelectorComponent implements OnInit {
  @Output()
  public daySelect: EventEmitter<boolean[]> = new EventEmitter();

  public days: boolean[]

  ngOnInit(): void {
    this.days = [false, false, false, false, false, false, false];
  }

  onChange(): void {
    this.daySelect.emit(this.days);
  }
}
