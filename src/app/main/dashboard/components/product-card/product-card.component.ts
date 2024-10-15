import { Component, Input } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { CompleteProduct, ProductType } from '../../../../types/product.types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product: CompleteProduct | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  correctImage = this.productService.defaultImagePath; // Path for the default image

  /** Checks if the product's image is defined and then fetches the final image path for the specific product. */
  async ngOnInit() {
    if (this.product?.image === undefined) return;

    this.correctImage = await this.productService.getFinalImageProductPath(
      this.product.image,
      this.product.title
    );
  }

  navigateToProduct(productId: number) {
    const productType = this.route.snapshot.params['product_category'];
    this.router.navigate([`/main/dashboard/${productType}/${productId}`]); // Default to ProductType.FILM if the provided product type is invalid
  }
}
