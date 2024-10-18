import { Injectable } from '@angular/core';
import { Result } from './services';
import { environment } from '../../environments/environment';
import axios from 'axios';

export type ProductStatistics = {
  scores: number[];
  averageScore: number; // The average score of the feedback
  significantSummary: string; // A meaningful summary of all feedback
};

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  productStatisticsURL: string = environment.apiUrl + '/statistic';

  constructor() {}

  /**
   * Fetches statistics for the specified productId.
   *
   * @param {number} productId - The ID of the product for which statistics are requested.
   * @returns {Promise<Result<ProductStatistics>>} A promise that resolves to a `Result` object.
   * The result contains either the product statistics data (on success) or an error message (on failure).
   */
  async getProductStatistics(
    productId: number
  ): Promise<Result<ProductStatistics>> {
    try {
      // Sends a request to the backend service to fetch product statistics
      const response = await axios.get(
        `${this.productStatisticsURL}/${productId}`
      );

      return { success: true, data: response.data };
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred'; // Default error message
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || 'Error from the statistic service';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error('Error while fetching product statistics:', errorMessage); // Log the full error for debugging

      return { success: false, error: errorMessage };
    }
  }
}
