import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputRestriction]'
})
export class InputRestrictionDirective {

  @Input() inputType: 'numeric' | 'alphanumeric' = 'numeric'; // Initialize with a default value

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initialValue = this.el.nativeElement.value;
    let regexPattern: RegExp | null = null; // Initialize as null

    if (this.inputType === 'numeric') {
      regexPattern = /[^0-9]*/g;
    } else if (this.inputType === 'alphanumeric') {
      regexPattern = /[^a-zA-Z0-9]/g;
    }

    this.el.nativeElement.value = initialValue.replace(regexPattern, '');

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}