import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cstm-modal',
  templateUrl: './cstm-modal.component.html',
  styleUrl: './cstm-modal.component.scss',
})
export class CstmModalComponent {
  isOpen: boolean = false;
  @Input() canClose: boolean = true;
  @Input({ required: true }) title: string = 'Modal title';
  @Input() size: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' =
    'medium';

  @Output() modalOpened = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  open() {
    this.isOpen = true;
    this.modalOpened.emit();
  }

  close() {
    this.isOpen = false;
    this.modalClosed.emit();
  }

  onBackdropClick() {
    this.canClose ? this.close() : this.shakeModal();
  }

  shakeModal() {
    const modalElement = document.querySelector(
      '.cstm-modal-content'
    ) as HTMLElement;
    if (modalElement) {
      modalElement.classList.add('shake');
      setTimeout(() => {
        modalElement.classList.remove('shake');
      }, 500);
    }
  }
}
