import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cstm-button',
  templateUrl: './cstm-button.component.html',
  styleUrl: './cstm-button.component.scss',
})
export class CstmButtonComponent {
  @Input() disabled: boolean = false;
  @Input() symbol: string | null = null;
  @Input({ required: true }) text: string = 'Simple button';
  @Input() type: 'primary' | 'secondary' | 'accent' = 'primary';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
