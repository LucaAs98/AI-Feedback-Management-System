import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilsModule } from '../utils/utils.module';

const routes: Routes = [
  {
    path: 'main',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
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
  ],
  exports: [RouterModule],
})
export class MainModule {}
