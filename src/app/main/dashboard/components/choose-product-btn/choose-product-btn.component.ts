import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductType } from '../../../../types/product.types';

@Component({
  selector: 'app-choose-product-btn',
  templateUrl: './choose-product-btn.component.html',
  styleUrl: './choose-product-btn.component.scss',
})
export class ChooseProductBtnComponent {
  @Input({ required: true }) symbol: string | null = 'star';
  @Input({ required: true }) text: string = 'Category';
  @Input({ required: true }) productType = ProductType.FILM;
  @Input({ required: true }) selectedProductType = ProductType.FILM;

  @Output() selectedProductTypeChange = new EventEmitter<any>();

  constructor(private router: Router) {}

  /**
   * Getter to check if the current product is selected.
   * @returns {boolean} - Returns true if the current productType matches the selectedProductType.
   */
  get isProductSelected(): boolean {
    return this.productType === this.selectedProductType;
  }

  /**
   * Handles the click event for selecting a product and navigating.
   * Emits an event to notify that a product type has been selected.
   * Navigates to a specific route using the product type, directing the user to the corresponding dashboard page.
   */
  onClick() {
    this.selectedProductTypeChange.emit(this.productType);
    this.router.navigate([`/main/dashboard/${this.productType}`]);
  }
}
