import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CstmButtonComponent } from './cstm-button/cstm-button.component';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { CstmInputFieldComponent } from './cstm-input-field/cstm-input-field.component';
import { CstmSearchbarComponent } from './cstm-searchbar/cstm-searchbar.component';
import { CstmModalComponent } from './cstm-modal/cstm-modal.component';
import { OpenModalDirective } from './cstm-modal/open-modal.directive';
import { CstmTextareaComponent } from './cstm-textarea/cstm-textarea.component';

@NgModule({
  declarations: [
    CstmButtonComponent,
    CstmInputFieldComponent,
    CstmSearchbarComponent,
    CstmModalComponent,
    OpenModalDirective,
    CstmTextareaComponent,
  ],
  imports: [CommonModule, FormsModule, UtilsModule],
  exports: [
    CstmButtonComponent,
    CstmInputFieldComponent,
    CstmSearchbarComponent,
    CstmModalComponent,
    OpenModalDirective,
    CstmTextareaComponent,
  ],
})
export class ComponentsModule {}
