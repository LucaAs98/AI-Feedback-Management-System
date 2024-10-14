import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsComponent } from './utils.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TimeFormatPipe } from './time-format.pipe';

@NgModule({
  declarations: [
    UtilsComponent,
    PageNotFoundComponent,
    LoadingSpinnerComponent,
    TimeFormatPipe,
  ],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, TimeFormatPipe],
})
export class UtilsModule {}
