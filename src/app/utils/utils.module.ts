import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsComponent } from './utils.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TimeFormatPipe } from './time-format.pipe';
import { FilterArrayPipe } from './filter-array.pipe';

@NgModule({
  declarations: [
    UtilsComponent,
    PageNotFoundComponent,
    LoadingSpinnerComponent,
    TimeFormatPipe,
    FilterArrayPipe,
  ],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, TimeFormatPipe, FilterArrayPipe],
})
export class UtilsModule {}
