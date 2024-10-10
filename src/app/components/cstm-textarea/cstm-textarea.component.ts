import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cstm-textarea',
  templateUrl: './cstm-textarea.component.html',
  styleUrl: './cstm-textarea.component.scss',
})
export class CstmTextareaComponent {
  @Input() label: string | null = null;
  @Input({ required: true }) inputElement: string = '';
  @Input() placeholder: string = 'Type something...';
  @Input() rows: number = 5;
  @Input() cols: number = 10;
  @Input() resizable: boolean = false;
}
