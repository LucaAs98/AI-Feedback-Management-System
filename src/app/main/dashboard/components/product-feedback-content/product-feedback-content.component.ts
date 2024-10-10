import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-feedback-content',
  templateUrl: './product-feedback-content.component.html',
  styleUrl: './product-feedback-content.component.scss',
})
export class ProductFeedbackContentComponent {
  feedback: string = '';
  @Input({ required: true }) productId: number | null = null;
  productTitle: string = 'Product title';
  productDescription: string = 'Product Description';
  productImagePath: string = 'assets/product-images/no-product-image.png';
  isLoading: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productId']) {
      if (this.productId !== null) this.fetchProductData(this.productId);
    }
  }

  fetchProductData(productId: number) {
    this.isLoading = true;
    console.log(`🐢 ~ Retrieving product with Id: "${productId}"`);

    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
