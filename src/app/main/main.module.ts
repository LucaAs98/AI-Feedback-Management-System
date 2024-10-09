import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilsModule } from '../utils/utils.module';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [MainComponent, DashboardComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    UtilsModule,
    NavbarComponent,
  ],
  exports: [RouterModule],
})
export class MainModule {}
