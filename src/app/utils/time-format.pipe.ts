import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === undefined) return '/';
    if (!value && value !== 0) return '/';

    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;

    const hoursDisplay = hours > 0 ? `${hours}h` : '';
    const minutesDisplay = minutes > 0 ? `${minutes}m` : '';
    const secondsDisplay = seconds > 0 ? `${seconds}s` : '';

    return `${hoursDisplay} ${minutesDisplay} ${secondsDisplay}`.trim();
  }
}
