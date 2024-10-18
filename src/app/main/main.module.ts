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
import { ProductCardComponent } from './dashboard/components/product-card/product-card.component';
import { ProductType } from '../types/product.types';
import { ProductPageComponent } from './dashboard/product-page/product-page.component';
import { StatisticsModalContentComponent } from './dashboard/product-page/components/statistics-modal-content/statistics-modal-content.component';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'dashboard/:product_category', component: DashboardComponent },
      {
        path: 'dashboard/:product_category/:product_id',
        component: ProductPageComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard/' + ProductType.FILM,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    NavbarComponent,
    ChooseProductBtnComponent,
    ProductCardComponent,
    ProductPageComponent,
    StatisticsModalContentComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    UtilsModule,
    ComponentsModule,
    BaseChartDirective,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
  exports: [RouterModule],
})
export class MainModule {}
