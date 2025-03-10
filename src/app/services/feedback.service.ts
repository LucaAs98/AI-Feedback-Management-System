import { Injectable } from '@angular/core';
import axios from 'axios';
import { Result } from './services';
import { environment } from '../../environments/environment';

export type AnalyzedFeedback = {
  sentiment: string;
  positive_score: number;
  negative_score: number;
  neutral_score: number;
  mixed_score: number;
};

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  analyzeFeedbackURL = environment.apiUrl + '/feedback';

  constructor() {}

  /**
   * Analyzes the sentiment of the provided feedback by sending it to an external feedback analysis service.
   *
   * @param {string} feedback - The feedback text to be analyzed.
   * @returns {Promise<Result<AnalyzedFeedback>>} A promise that resolves to a `Result` object.
   * The result contains either the analyzed feedback data (on success) or an error message (on failure).
   */
  async analyzeFeedback(
    feedback: string,
    product_id: number
  ): Promise<Result<number>> {
    try {
      // Sends the feedback text to the external analysis service
      const response = await axios.post(this.analyzeFeedbackURL, {
        feedback_text: feedback,
        product_id: product_id,
        user_id: 1, // TODO: Implement dynamic user_id
      });

      return { success: true, data: response.data.feedback_score };
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred'; // Default error message
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || 'Error from the feedback service';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error('Error while analyzing feedback:', errorMessage); // Log the full error for debugging

      return { success: false, error: errorMessage };
    }
  }
}
