import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() todo!: Todo;
  @Input() id!: number;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() getChecked: EventEmitter<number> = new EventEmitter();
  confirm = true;
  changelog: string[] = [];
  checked: boolean = false;

  constructor() { }

  deleteItem() {
    this.delete.emit();
  }

  checkConfirm() {
    this.confirm = false;
  }

  notDelete() {
    this.confirm = true;
    console.log(this.changelog)
  }

  capitalizze(str: string | undefined) {
    if (str) {
      return `${str[0].toUpperCase()}${str.slice(1)}`;
    }
    return '...';
  }
}
