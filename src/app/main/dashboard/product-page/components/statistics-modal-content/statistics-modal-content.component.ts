import { Component, Input } from '@angular/core';
import {
  ProductStatistics,
  StatisticService,
} from '../../../../../services/statistic.service';
import { ChartData, ChartOptions, plugins } from 'chart.js';

@Component({
  selector: 'app-statistics-modal-content',
  templateUrl: './statistics-modal-content.component.html',
  styleUrl: './statistics-modal-content.component.scss',
})
export class StatisticsModalContentComponent {
  isLoading: boolean = false;
  @Input({ required: true }) productId: number | undefined = 0;
  productStatistics: ProductStatistics | null = null;
  statisticError: string = '';

  //DISTRIBUTION CHART
  public barChartOptions: ChartOptions<'bar'> = this.getBarChartOptions();
  public barChartLegend = true; // Indicates whether to show the legend on the chart
  public barChartType: 'bar' = 'bar'; // Specifies the type of the chart (in this case, a bar chart)
  barChartData: ChartData<'bar'> = {
    labels: ['1', '2', '3', '4', '5'], // Review ratings as string labels
    datasets: [
      {
        label: 'Number of Reviews',
        data:
          this.productStatistics !== null ? this.productStatistics.scores : [],
        backgroundColor: getComputedStyle(
          document.documentElement
        ).getPropertyValue('--primary-200'),
      },
    ],
  };
  constructor(private statisticService: StatisticService) {}

  async onModalOpened() {
    this.isLoading = true;
    if (this.productId !== undefined) {
      const response = await this.statisticService.getProductStatistics(
        this.productId
      );

      if (response.success) {
        this.productStatistics = response.data;
        this.barChartData.datasets[0].data = this.productStatistics.scores;
      } else this.statisticError = response.error;
    }

    this.isLoading = false;
  }

  onModalClosed() {
    console.log('The modal has been closed!');
  }

  /**
   * Generates the configuration options for the bar chart.
   * @returns {ChartOptions<'bar'>} The configuration options for the bar chart, including responsiveness, maintaining aspect ratio, scales, and plugins settings.
   */
  getBarChartOptions(): ChartOptions<'bar'> {
    return {
      responsive: true,
      maintainAspectRatio: true, // Maintain the aspect ratio
      scales: {
        x: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue(
              '--text-800'
            ),
          },
          beginAtZero: true, // Starts the x-axis at zero (optional for bar charts)
          grid: {
            display: true, // Show grid lines on the x-axis
          },
          title: {
            color: getComputedStyle(document.documentElement).getPropertyValue(
              '--text-800'
            ),
            display: true, // Show title for x-axis
            text: 'Review Ratings', // Title text for the x-axis
          },
        },
        y: {
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue(
              '--text-800'
            ),
          },
          beginAtZero: true, // Starts the y-axis at zero
          grid: {
            display: true, // Show grid lines on the y-axis
          },
          title: {
            color: getComputedStyle(document.documentElement).getPropertyValue(
              '--text-800'
            ),
            display: true, // Show title for y-axis
            text: 'Number of Reviews', // Title text for the y-axis
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: getComputedStyle(document.documentElement).getPropertyValue(
              '--text-800'
            ),
          },
        },
      },
    };
  }
}
