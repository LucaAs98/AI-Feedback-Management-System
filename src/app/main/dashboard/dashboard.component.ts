import { Component, OnDestroy, OnInit } from '@angular/core';
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
  private routerSubscriptions: Subscription[] = [];

  //Searchbar
  productSearchingName: string = '';

  //Product type
  selectedProductType: ProductType = ProductType.FILM;
  productType = ProductType;

  //Product genre
  genres: string[] = [];
  selectedGenre: string = 'All';
  isLoadingGenres: boolean = false;

  //Products
  products: CompleteProduct[] | [] = [];
  isLoadingProducts: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get getSelectedGenre(): string {
    return this.selectedGenre !== 'All' ? this.selectedGenre : '';
  }

  get isLoading(): boolean {
    return this.isLoadingProducts || this.isLoadingGenres;
  }

  /** Subscribes to route parameters and updates the list of products based on the product category. */
  async ngOnInit() {
    this.routerSubscriptions.push(
      this.route.params.subscribe(async (params) => {
        this.isLoadingProducts = true;
        const productType = params['product_category'];
        if (!Object.values(ProductType).includes(productType.toUpperCase())) {
          this.router.navigate([`/main/dashboard/${ProductType.FILM}`]); // Default to ProductType.FILM if the provided product type is invalid
          return;
        }

        // Fetch products based on the provided 'product_category' parameter from the route.
        this.products = await this.getProductsFromType(productType);
        this.genres = this.getGenresCategoriesOfType(); //Retrieves all the genres/categories of the products

        this.isLoadingProducts = false;
      })
    );

    this.routerSubscriptions.push(
      this.route.queryParams.subscribe((queryParams) => {
        this.isLoadingGenres = true;
        this.selectedGenre =
          queryParams['genre'] !== undefined ? queryParams['genre'] : 'All';
        this.isLoadingGenres = false;
      })
    );
  }

  //Remove listeners
  ngOnDestroy(): void {
    for (const sub of this.routerSubscriptions) sub.unsubscribe();
  }

  /** Changes the root when the selected genre changes */
  changeRootOnGenreSelect() {
    this.router.navigate(['/main/dashboard', this.selectedProductType], {
      queryParams: { genre: this.selectedGenre },
    });
  }

  /** Retrieves all the categories/genre of a specific set of products. */
  getGenresCategoriesOfType(): string[] {
    const genres = this.products.map(
      (prod: CompleteProduct) => prod.genre_category
    );

    return ['All', ...new Set(genres)]; //Remove duplicates and return the array
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
