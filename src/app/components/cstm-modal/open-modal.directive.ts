import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CstmModalComponent } from './cstm-modal.component';

@Directive({
  selector: '[appOpenModal]',
})
export class OpenModalDirective {
  @Input() appOpenModal: CstmModalComponent | undefined;

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    console.log('🐢 ~ onClick');

    if (this.appOpenModal) {
      this.appOpenModal.open();
    }
  }
}
