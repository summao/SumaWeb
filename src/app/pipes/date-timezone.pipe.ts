import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimezone'
})
export class DateTimezonePipe implements PipeTransform {

  transform(date: Date, format: string | undefined): string | null {
    const timezoneOffset = new Date().getTimezoneOffset() / -60;
    const timezone = `GMT+${timezoneOffset}`;
    if (format === undefined) {
      format = 'short';
    }
    
    return new DatePipe('en-Us').transform(date, format, timezone);
  }

}
