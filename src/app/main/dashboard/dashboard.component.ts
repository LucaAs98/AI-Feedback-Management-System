import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductType, CompleteProduct } from '../../types/product.types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription | undefined;

  isLoading: boolean = false;
  productSearchingName: string = '';
  selectedProductType: ProductType = ProductType.FILM;
  productType = ProductType;
  products: CompleteProduct[] | [] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /** Subscribes to route parameters and updates the list of products based on the product category. */
  async ngOnInit() {
    this.routerSubscription = this.route.params.subscribe(async (params) => {
      this.isLoading = true;
      const productType = params['product_category'];

      if (!Object.values(ProductType).includes(productType.toUpperCase())) {
        this.router.navigate([`/main/dashboard/${ProductType.FILM}`]); // Default to ProductType.FILM if the provided product type is invalid
        return;
      }

      // Fetch products based on the provided 'product_category' parameter from the route.
      this.products = await this.getProductsFromType(productType);

      this.isLoading = false;
    });
  }

  //Remove listeners
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  /**
   * Fetches products based on the provided product type.
   * If the product type is not valid, it defaults to the 'FILM' product type.
   * @param productType - The type of the product (e.g., ProductType.FILM, ProductType.BOOK, etc.)
   * @returns A promise that resolves to an array of CompleteProduct objects or an empty array.
   */
  async getProductsFromType(
    productType: ProductType
  ): Promise<CompleteProduct[] | []> {
    this.isLoading = true;

    // Store the selected product type and validate if it exists in ProductType enum
    this.selectedProductType = productType;
    if (!Object.values(ProductType).includes(this.selectedProductType))
      this.selectedProductType = ProductType.FILM; // Default to ProductType.FILM if the provided product type is invalid

    // Fetch products based on the selected type
    return await this.productService.getProductsOfType(
      this.selectedProductType
    );
  }
}
