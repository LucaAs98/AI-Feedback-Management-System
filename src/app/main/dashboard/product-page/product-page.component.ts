import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';
import { ProductService } from '../../../services/product.service';
import { CompleteProduct, ProductType } from '../../../types/product.types';
import { UtilsService } from '../../../utils/utils.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CstmToastService } from '../../../components/cstm-toast/cstm-toast.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription | undefined;

  @Output() closeModalEvent = new EventEmitter();

  feedback: string = '';
  _productId: number | null = null;
  product: CompleteProduct | null = null;

  analyzingError: string = '';
  isLoading: boolean = false;
  isLoadingFeedback: boolean = false;

  constructor(
    public productService: ProductService,
    private feedbackService: FeedbackService,
    public utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private cstmToastService: CstmToastService
  ) {}

  /** Subscribes to route parameters and updates the list of products based on the product category. */
  async ngOnInit() {
    this.routerSubscription = this.route.params.subscribe(async (params) => {
      // Clear previous errors and feedback.
      this.analyzingError = '';
      this.feedback = '';

      //Get parameters from the route
      const productType = params['product_category'];
      const newProductId = params['product_id'];

      if (!Object.values(ProductType).includes(productType.toUpperCase())) {
        this.router.navigate([`/main/dashboard/${ProductType.FILM}`]); // Default to ProductType.FILM if the provided product type is invalid
        return;
      }

      // If the newProductId is defined and different from the current one, update the product ID.
      if (newProductId && newProductId !== this._productId) {
        this._productId = newProductId;
        await this.setProductData(newProductId, productType); // Fetch and set the product data based on the new product ID.
      }
    });
  }

  //Remove listeners
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  /**
   * Asynchronously sets the product data based on the provided product ID.
   * @param {number} productId - The ID of the product to retrieve.
   */
  async setProductData(productId: number, productType: ProductType) {
    this.isLoading = true;

    this.product = await this.productService.getProductById(productId); // Retrieve product data using the product ID.

    if (this.product?.type.toUpperCase() !== productType.toUpperCase())
      this.product = null;

    this.isLoading = false;
  }

  /**
   * Asynchronously sends feedback for the currently selected product.
   * This method analyzes the feedback and handles the response accordingly.
   */
  async sendFeedback() {
    // If the product is not set, display an error message and exit the function.
    if (!this.canSendFeedback()) return;

    // Start the loading state and clear any existing errors.
    this.isLoadingFeedback = true;
    this.analyzingError = '';
    let feedbackScore = 0;

    // Analyze the provided feedback for the current product.
    const response = await this.feedbackService.analyzeFeedback(
      this.feedback,
      this.product!.id
    );

    // If the feedback analysis is successful, handle the analyzed feedback data.
    if (response.success) {
      feedbackScore = response.data;
      console.log('Feedback analyzed successfully: score: ', feedbackScore);
    } else this.analyzingError = response.error; // If the analysis fails, update the error message with the response error.

    // Add toast notification, reset the loading state and clear the feedback input.
    this.cstmToastService.addToast({
      icon: 'rate_review',
      type: response.success ? 'success' : 'danger',
      message: response.success
        ? 'Feedback submitted successfully!'
        : 'Feedback submission failed',
      description: response.success
        ? `Your feedback has been analyzed successfully. Score: ${feedbackScore}`
        : `${this.analyzingError}`,
    });

    this.isLoadingFeedback = false;
    this.feedback = '';
  }

  /**
   * Checks if feedback can be sent by validating the product ID and feedback input.
   * Updates the `analyzingError` message if any required conditions are not met.
   *
   * @returns {boolean} - Returns true if there are no errors and false if any validation errors are present.
   */
  canSendFeedback(): boolean {
    this.analyzingError = ''; // Reset any previous error messages.

    // Check if the product is null
    if (this.product === null) this.analyzingError += 'The product Id is null!';

    // Check if the feedback text is empty after trimming spaces
    if (this.feedback.trim().length === 0)
      this.analyzingError += 'Feedback field is required!';

    // Return true if there are no errors (i.e., if `analyzingError` is empty).
    return this.analyzingError.length === 0;
  }

  /** Navigates to the previous URL by removing the last parameter from the current route (productId). */
  async goBack() {
    // Retrieve the current URL and split it into segments based on the '/' delimiter.
    const urlSegments = this.router.url.split('/').filter((segment) => segment); // Removes any empty segments
    urlSegments.pop(); // Remove the last segment of the URL to go back to the previous state.
    const newUrl = '/' + urlSegments.join('/'); // Create a new URL by joining the remaining segments with '/' and prefixing it with a '/'.

    this.router.navigate([newUrl]); // Navigate to the updated URL
  }
}
