import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cstm-input-field',
  templateUrl: './cstm-input-field.component.html',
  styleUrl: './cstm-input-field.component.scss',
})
export class CstmInputFieldComponent {
  @Input() label: string | null = null;
  @Input({ required: true }) inputElement: string = '';
  @Input() placeholder: string = 'Type something...';

  //TEXTAREA
  @Input() textarea: boolean = false;
  @Input() rows: number = 5;
  @Input() cols: number = 10;
  @Input() resizable: boolean = false;

  @Output() inputElementChange = new EventEmitter<string>();

  onInputChange(value: string) {
    this.inputElementChange.emit(value);
  }
}
