import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilsModule } from '../utils/utils.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ComponentsModule } from '../components/components.module';
import { ChooseProductBtnComponent } from './dashboard/components/choose-product-btn/choose-product-btn.component';
import { ProductFeedbackContentComponent } from './dashboard/components/product-feedback-content/product-feedback-content.component';
import { ProductCardComponent } from './dashboard/components/product-card/product-card.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'dashboard/:product_category', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard/0', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    NavbarComponent,
    ChooseProductBtnComponent,
    ProductFeedbackContentComponent,
    ProductCardComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    UtilsModule,
    ComponentsModule,
  ],
  exports: [RouterModule],
})
export class MainModule {}
