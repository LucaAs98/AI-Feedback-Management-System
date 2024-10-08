import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsComponent } from './utils.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    UtilsComponent,
    PageNotFoundComponent,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent],
})
export class UtilsModule {}
