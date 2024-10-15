import { Component } from '@angular/core';
import { ProductType } from '../../types/product.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  returnToHome() {
    this.router.navigate([`/main/dashboard/${ProductType.FILM}`]); // Default to ProductType.FILM if the provided product type is invalid
  }
}
