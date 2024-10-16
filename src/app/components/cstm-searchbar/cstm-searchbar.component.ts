import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cstm-searchbar',
  templateUrl: './cstm-searchbar.component.html',
  styleUrl: './cstm-searchbar.component.scss',
})
export class CstmSearchbarComponent {
  @Input({ required: true }) searchingInput: string = '';
  @Input() placeholder: string = 'Search...';

  @Output() searchingInputChange = new EventEmitter<string>();

  onInputChange(value: string) {
    this.searchingInputChange.emit(value);
  }
}
