import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CompleteProduct,
  ProductService,
} from '../../../../services/product.service';
import { UtilsService } from '../../../../utils/utils.service';
import { FeedbackService } from '../../../../services/feedback.service';

@Component({
  selector: 'app-product-feedback-content',
  templateUrl: './product-feedback-content.component.html',
  styleUrl: './product-feedback-content.component.scss',
})
export class ProductFeedbackContentComponent {
  feedback: string = '';
  _productId: number | null = null;
  product: CompleteProduct | null = null;
  correctImage = this.productService.defaultImagePath; // Path for the default image

  analyzingError: string = '';
  isLoading: boolean = false;

  constructor(
    public productService: ProductService,
    private feedbackService: FeedbackService,
    public utils: UtilsService
  ) {}

  @Input({ required: true })
  set productId(value: number | null) {
    if (value && value !== this._productId) {
      this._productId = value;
      this.setProductData(value);
    }
  }

  async setProductData(value: number) {
    this.isLoading = true;
    this.product = await this.productService.getProductById(value); //Retrieve product data
    if (this.product === null) return;

    this.correctImage = await this.productService.getFinalImageProductPath(
      this.product.image,
      this.product.title
    );

    this.isLoading = false;
  }

  async sendFeedback() {
    if (this.product === null) {
      this.analyzingError = 'The product Id is null!';
      return;
    }

    this.isLoading = true;
    this.analyzingError = '';
    console.log(' 🐢 ~ this.feedback:', this.feedback);

    // Call the feedbackService's analyzeFeedback method to analyze the current feedback text
    const response = await this.feedbackService.analyzeFeedback(
      this.feedback,
      this.product?.id
    );

    // If the analysis is successful, update the analyzedFeedback with the result else update the message error
    if (response.success) {
      const analyzedFeedback = response.data;
      console.log('Feedback analyzed successfully:', analyzedFeedback);
    } else this.analyzingError = response.error;

    this.isLoading = false;
  }
}
