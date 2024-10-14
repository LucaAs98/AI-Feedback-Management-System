import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { ProductType } from '../../../../services/product.service';
import { Router } from '@angular/router';

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

  get isProductSelected() {
    return this.productType === this.selectedProductType;
  }

  selectProduct() {
    this.selectedProductTypeChange.emit(this.productType);
  }

  onClick() {
    this.selectProduct();
    this.router.navigate([`/main/dashboard/${this.productType}`]);
  }
}
