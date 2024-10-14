import { Component, ViewChild } from '@angular/core';
import {
  AnalyzedFeedback,
  FeedbackService,
} from '../../services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Book,
  CompleteProduct,
  Film,
  Music,
  Product,
  ProductService,
  ProductType,
} from '../../services/product.service';
import { CstmModalComponent } from '../../components/cstm-modal/cstm-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('productModal') productModal: CstmModalComponent | undefined;

  isLoading: boolean = false;
  productSearchingName: string = '';
  selectedProductType: ProductType = ProductType.FILM;
  productType = ProductType;
  products: CompleteProduct[] | [] = [];

  //OLD CODE FOR FEEDBACK
  feedback: string = '';
  error = '';
  analyzedFeedback: AnalyzedFeedback | null = null;
  specificProductId: number | null = null;

  constructor(
    private feedbackService: FeedbackService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.isLoading = true;
      this.products = await this.retrieveProductsFromType(
        params['product_category']
      );
      console.log('🐢 ~  this.products:', this.products);
      this.isLoading = false;
    });
  }

  async retrieveProductsFromType(
    productType: ProductType
  ): Promise<CompleteProduct[]> {
    this.isLoading = true;

    this.selectedProductType = productType;
    if (!Object.values(ProductType).includes(this.selectedProductType)) {
      this.selectedProductType = ProductType.FILM;
    }

    return await this.productService.getProductsOfType(
      this.selectedProductType
    );
  }

  isProductSelected(productType: ProductType) {
    return this.selectedProductType === productType;
  }

  setSpecificProductId(productId: number) {
    this.specificProductId = productId;
  }

  openFeedbackModal(productId: number | null) {
    this.specificProductId = productId;
    this.productModal?.open();
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
