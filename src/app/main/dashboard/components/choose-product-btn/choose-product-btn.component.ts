import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { ProductType } from '../../../../services/product.service';

@Component({
  selector: 'app-choose-product-btn',
  templateUrl: './choose-product-btn.component.html',
  styleUrl: './choose-product-btn.component.scss',
})
export class ChooseProductBtnComponent {
  @Input({ required: true }) symbol: string | null = 'star';
  @Input({ required: true }) text: string = 'Category';
  @Input({ required: true }) productType = ProductType.movies;
  @Input({ required: true }) selectedProductType = ProductType.movies;

  @Output() selectedProductTypeChange = new EventEmitter<any>();
  @Output() clicked = new EventEmitter<{ productType: ProductType }>();

  get isProductSelected() {
    return this.productType === this.selectedProductType;
  }

  selectProduct() {
    this.selectedProductTypeChange.emit(this.productType);
  }

  onClick() {
    this.selectProduct();
    this.clicked.emit({ productType: this.productType });
  }
}
