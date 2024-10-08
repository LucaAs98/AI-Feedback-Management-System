import { Component } from '@angular/core';
import axios from 'axios';

type AnalyzedFeedback = {
  sentiment: string;
  positive_score: number;
  negative_score: number;
  neutral_score: number;
  mixed_score: number;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  feedback: string = '';
  isLoading: boolean = false;
  result: string = '';

  error = '';
  analyzedFeedback: AnalyzedFeedback = {
    sentiment: '',
    positive_score: 0,
    negative_score: 0,
    neutral_score: 0,
    mixed_score: 0,
  };

  analyzeFeedbackURL = 'http://localhost:8080/feedback';
  get isResultEmpty() {
    return this.result.trim().length === 0;
  }

  async analyzeFeedback() {
    this.isLoading = true;
    this.error = '';
    this.analyzedFeedback = {
      sentiment: '',
      positive_score: 0,
      negative_score: 0,
      neutral_score: 0,
      mixed_score: 0,
    };

    try {
      // TODO: Implement dynamic user_id
      const response = await axios.post(this.analyzeFeedbackURL, {
        feedback_text: this.feedback, // Fixed typo in key name
        user_id: 1, // Placeholder for user_id
      });

      console.log('Feedback analyzed successfully:', response.data);

      this.analyzedFeedback = {
        sentiment: response.data.sentiment,
        positive_score: response.data.positive_score,
        negative_score: response.data.negative_score,
        neutral_score: response.data.neutral_score,
        mixed_score: response.data.mixed_score,
      };
    } catch (error: any) {
      // Check if the error is an instance of AxiosError
      if (error.isAxiosError) {
        this.error =
          error.response?.data?.message || 'An unknown error occurred';
      } else {
        this.error = error.message || 'An unknown error occurred';
      }

      // Log the full error for debugging
      console.error('Error while analyzing feedback:', error);
    } finally {
      // Ensure isLoading is set to false regardless of success or failure
      this.isLoading = false;
    }
  }
}
