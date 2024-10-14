import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CompleteProduct,
  ProductService,
} from '../../../../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product: CompleteProduct | null = null;

  @Output() feedbackClicked = new EventEmitter<number | null>(); // Specific product id emitted

  onFeedbackClick(id: number) {
    this.feedbackClicked.emit(id);
  }

  constructor(private productService: ProductService) {}

  correctImage = this.productService.defaultImagePath; // Path for the default image

  async ngOnInit() {
    if (this.product?.image === undefined) return;

    this.correctImage = await this.productService.getFinalImageProductPath(
      this.product.image,
      this.product.title
    );
  }
}
