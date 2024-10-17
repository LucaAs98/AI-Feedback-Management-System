import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cstm-dropdown',
  templateUrl: './cstm-dropdown.component.html',
  styleUrl: './cstm-dropdown.component.scss',
})
export class CstmDropdownComponent {
  @Input({ required: true }) selectedElement: string = '';
  @Input({ required: true }) elements: string[] = [];

  @Output() clicked = new EventEmitter<void>();
  @Output() selectedElementChange = new EventEmitter<string>();

  onClick(element: string) {
    this.selectedElementChange.emit(element);
    this.clicked.emit();
  }
}
