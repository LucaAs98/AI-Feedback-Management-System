import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

export enum ProductType {
  FILM = 'FILM',
  MUSIC = 'MUSIC',
  BOOK = 'BOOK',
}

export type Product = {
  id: number;
  title: string;
  image: string;
  type: ProductType;
  genre_category: string;
};

export type Film = {
  product_id: number;
  director: string;
  duration: number;
  description: string;
};

export type Book = {
  product_id: number;
  description: string;
  publisher: string;
  author: string;
  isbn: string;
};

export type Music = {
  product_id: number;
  duration: number;
  producer: string;
  artist: string;
};

export type CompleteProduct = Product &
  (Partial<Film> | Partial<Book> | Partial<Music>);

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  retrieveProductByIdURL = 'http://localhost:8080/product/id/';
  retrieveProductByTypeURL = 'http://localhost:8080/product/type/';

  defaultImagePath: string = 'assets/product-images/no-product-image.png';

  isFilm(product: CompleteProduct): product is CompleteProduct & Partial<Film> {
    return (product as Film).director !== undefined;
  }

  isBook(product: CompleteProduct): product is CompleteProduct & Partial<Book> {
    return (product as Book).author !== undefined;
  }

  isMusic(
    product: CompleteProduct
  ): product is CompleteProduct & Partial<Music> {
    return (product as Music).artist !== undefined;
  }

  async getProductById(productId: number) {
    try {
      // Sends the feedback text to the external analysis service
      const response = await axios.get(this.retrieveProductByIdURL + productId);
      return response.data;
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred'; // Default error message
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || 'Error from the product service';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error('Error while retrieving product by id:', error); // Log the full error for debugging

      return { success: false, error: errorMessage };
    }
  }

  async getProductsOfType(productType: ProductType) {
    try {
      // Sends the feedback text to the external analysis service
      const response = await axios.get(
        this.retrieveProductByTypeURL + productType
      );
      return response.data;
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred'; // Default error message
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || 'Error from the product service';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error('Error while retrieving products by type:', error); // Log the full error for debugging

      return { success: false, error: errorMessage };
    }
  }

  async getFinalImageProductPath(
    imageFileName: string,
    productTitle: string
  ): Promise<string> {
    const testingPath = `assets/product-images/${imageFileName}`;
    try {
      const response = await axios.get(testingPath, {
        responseType: 'arraybuffer',
      });
      return testingPath; //If image exists
    } catch (error) {
      console.warn(`Loading default image for product: ${productTitle}`);
      return this.defaultImagePath;
    }
  }
}
