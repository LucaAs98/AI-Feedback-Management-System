import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsComponent } from './utils.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    UtilsComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UtilsModule { }
