import { Injectable } from '@angular/core';

export enum ProductType {
  movies = 'movies',
  music = 'music',
  books = 'books',
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  async getProductsOfType(productType: ProductType) {
    return [];
  }
}
