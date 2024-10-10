import { Component } from '@angular/core';
import {
  AnalyzedFeedback,
  FeedbackService,
} from '../../services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, ProductType } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  productSearchingName: string = '';
  selectedProductType: ProductType = ProductType.movies;
  productType = ProductType;

  //OLD CODE FOR FEEDBACK
  feedback: string = '';
  isLoading: boolean = false;
  error = '';
  analyzedFeedback: AnalyzedFeedback | null = null;
  specificProductId: number | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      await this.retrieveProductsFromType(params['product_category']);
    });
  }

  async retrieveProductsFromType(productType: ProductType) {
    this.selectedProductType = productType;
    if (!Object.values(ProductType).includes(this.selectedProductType)) {
      this.selectedProductType = ProductType.movies;
    }

    this.router.navigate([`/main/dashboard/${this.selectedProductType}`]);
    await this.productService.getProductsOfType(this.selectedProductType);
  }

  isProductSelected(productType: ProductType) {
    return this.selectedProductType === productType;
  }

  setSpecificProductId(productId: number) {
    this.specificProductId = productId;
  }

  get getRandomInt(): number {
    return Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  }
  //------------- OLD CODE FOR FEEDBACKS
  get isAnalyzedFeedbackEmpty() {
    return this.analyzedFeedback === null;
  }

  /**
   * Handles the process of analyzing feedback
   *
   * @returns {Promise<void>} This function does not return a value, but it updates component state.
   */
  async analyzeFeedback(): Promise<void> {
    this.isLoading = true;
    this.error = '';
    this.analyzedFeedback = null;

    // Call the feedbackService's analyzeFeedback method to analyze the current feedback text
    const response = await this.feedbackService.analyzeFeedback(this.feedback);

    // If the analysis is successful, update the analyzedFeedback with the result else update the message error
    if (response.success) {
      this.analyzedFeedback = response.data;
      console.log('Feedback analyzed successfully:', this.analyzedFeedback);
    } else this.error = response.error;

    this.isLoading = false;
  }
}
