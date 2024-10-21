import { Injectable } from '@angular/core';
import axios from 'axios';
import {
  CompleteProduct,
  Film,
  Book,
  Music,
  ProductType,
} from '../types/product.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  retrieveProductByIdURL = environment.apiUrl + '/product/id/';
  getProductByTypeURL = environment.apiUrl + '/product/type/';
  getCategoriesGenreByTypeURL =
    environment.apiUrl + '/product/product-categories/';

  /**
   * Retrieves a product by its ID.
   *
   * @param productId - The ID of the product to be retrieved.
   * @returns A promise that resolves to the product data or an error message.
   */
  async getProductById(productId: number): Promise<CompleteProduct | null> {
    try {
      // Sends the request to retrieve the product by ID.
      const response = await axios.get(this.retrieveProductByIdURL + productId);
      return response.data;
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred'; // Default error message.
      if (axios.isAxiosError(error)) {
        // Checks if the error is an Axios error and extracts the message.
        errorMessage =
          error.response?.data?.message || 'Error from the product service';
      } else if (error instanceof Error) {
        errorMessage = error.message; // Uses the standard error message.
      }

      // Logs the full error for debugging purposes.
      console.error('Error while retrieving product by id:', error);

      return null; // Returns null if an error occurred.
    }
  }

  /**
   * Retrieves products of a specific type.
   *
   * @param productType - The type of products to be retrieved.
   * @returns A promise that resolves to the list of products or an error message.
   */
  async getProductsOfType(
    productType: ProductType
  ): Promise<CompleteProduct[] | []> {
    try {
      // Sends the request to retrieve products by type.
      const response = await axios.get(this.getProductByTypeURL + productType);
      return response.data;
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred'; // Default error message.
      if (axios.isAxiosError(error)) {
        // Checks if the error is an Axios error and extracts the message.
        errorMessage =
          error.response?.data?.message || 'Error from the product service';
      } else if (error instanceof Error) {
        errorMessage = error.message; // Uses the standard error message.
      }

      // Logs the full error for debugging purposes.
      console.error('Error while retrieving products by type:', errorMessage);

      return []; // Returns empty array if an error occurred.
    }
  }

  /**
   * Type guard function to check if a product is a Film.
   * It verifies if the product object has a `director` property,
   * which is a characteristic of Film objects.
   *
   * @param product - The product to be checked.
   * @returns A type predicate that indicates if the product is a Film.
   */
  isFilm(product: CompleteProduct): product is CompleteProduct & Partial<Film> {
    return (product as CompleteProduct).type === ProductType.FILM;
  }

  /**
   * Type guard function to check if a product is a Book.
   * It verifies if the product object has an `author` property,
   * which is a characteristic of Book objects.
   *
   * @param product - The product to be checked.
   * @returns A type predicate that indicates if the product is a Book.
   */
  isBook(product: CompleteProduct): product is CompleteProduct & Partial<Book> {
    return (product as CompleteProduct).type === ProductType.BOOK;
  }

  /**
   * Type guard function to check if a product is Music.
   * It verifies if the product object has an `artist` property,
   * which is a characteristic of Music objects.
   *
   * @param product - The product to be checked.
   * @returns A type predicate that indicates if the product is Music.
   */
  isMusic(
    product: CompleteProduct
  ): product is CompleteProduct & Partial<Music> {
    return (product as CompleteProduct).type === ProductType.MUSIC;
  }
}
