import { Pipe, PipeTransform } from '@angular/core';
/*
 * Converts the enum value to it's string representation.
 * Takes a number representing an enum.
 * Usage:
 *   value | accountType
 * Example:
 *   {{ 0 | accountType }}
 *   formats to: Checking
*/
@Pipe({name: 'accountType'})
export class AccountTypePipe implements PipeTransform {
  transform(value: number): string {
    switch(value) {
      case 0:
        return 'Checking';
      case 1:
        return 'Savings';
      case 2:
        return 'Credit';
      default:
        return '';
    }
  }
}
