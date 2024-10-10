import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cstm-searchbar',
  templateUrl: './cstm-searchbar.component.html',
  styleUrl: './cstm-searchbar.component.scss',
})
export class CstmSearchbarComponent {
  @Input() searchingInput: string = '';
  @Input() placeholder: string = 'Search...';

  @Output() inputElementChange = new EventEmitter<string>();

  onInputChange($event: any) {
    throw new Error('Method not implemented.');
  }
}
