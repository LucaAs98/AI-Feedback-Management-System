import { Component, Input } from '@angular/core';
import { CompleteProduct, ProductType } from '../../../../types/product.types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product: CompleteProduct | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  navigateToProduct(productId: number) {
    const productType = this.route.snapshot.params['product_category'];
    this.router.navigate([`/main/dashboard/${productType}/${productId}`]); // Default to ProductType.FILM if the provided product type is invalid
  }
}
