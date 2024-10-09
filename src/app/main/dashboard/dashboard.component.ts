import { Component } from '@angular/core';
import {
  AnalyzedFeedback,
  FeedbackService,
} from '../../services/feedback.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  feedback: string = '';
  isLoading: boolean = false;

  error = '';
  analyzedFeedback: AnalyzedFeedback | null = null;

  constructor(private feedbackService: FeedbackService) {}

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
