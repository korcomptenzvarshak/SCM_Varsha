// phone-number.directive.ts
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneNumber]'
})
export class PhoneNumberDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D+/g, ''); // Remove non-numeric characters

    if (value.length <= 10) {
      input.value = this.formatPhoneNumber(value);
    } else {
      input.value = this.formatPhoneNumber(value.slice(0, 10));
    }
  }

  private formatPhoneNumber(value: string): string {
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else {
      return `(${value.slice(0, 3)}) ${value.slice(3, 6)} - ${value.slice(6, 10)}`;
    }
  }

}
