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
import { UtilsComponent } from '../../../../utils/utils.component';
import { UtilsService } from '../../../../utils/utils.service';

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

  isLoading: boolean = false;

  constructor(
    public productService: ProductService,
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
}
