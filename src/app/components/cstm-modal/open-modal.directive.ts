import { Directive, HostListener, Input } from '@angular/core';
import { CstmModalComponent } from './cstm-modal.component';

@Directive({
  selector: '[appOpenModal]',
})
export class OpenModalDirective {
  @Input() appOpenModal: CstmModalComponent | undefined;

  @HostListener('click') onClick() {
    if (this.appOpenModal) {
      this.appOpenModal.open();
    }
  }
}
