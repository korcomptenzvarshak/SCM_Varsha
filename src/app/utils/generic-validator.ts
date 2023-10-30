import { FormGroup } from '@angular/forms';
import { AbstractControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';

// Provide all set of validation messages here
const VALIDATION_MESSAGES = {
  // email: {
  //   required: 'Required',
  //   email: 'This email is invalid'
  // },
 
  firstName: {
    required: 'First Name can not be empty',
    minlength: 'The First Name length must be greater than or equal to 4',
    maxlength: 'The First Name length must be less than or equal to 20',
    
  },
  middleInitial: {
  
   maxlength: 'The Middle Initial length must be equal to 1'
  },
  lastName: {
    required: 'Last Name can not be empty',
    minlength: 'The Last Name length must be greater than or equal to 4',
    maxlength: 'The Last Name length must be less than or equal to 20'
  },
 
  address: {
    required: 'Address field can not be empty',
    minlength: 'The Address length must be greater than or equal to 10',
    maxlength: 'The Address length must be less than or equal to 150'
  },
  email: {
    email: 'Email ID is invalid'
  },
  city: {
    required: 'City field can not be empty'
  },
  state: {
    required: 'State field can not be empty'
  },
  postalCode: {
    required: 'Postal Code field can not be empty',
    minlength: 'Postal Code length must be greater than  4',
    maxlength: 'Postal Code length must be less than 10'
  },
  country: {
    required: 'Country field can not be empty'
  },
  customer:{
    required:'Customer can not be empty',
    maxlength: 'Customer length must be less than or equal to 7',
    minlength: 'Customer length must be less than or equal to 4'
  },
  home : {
    maxlength: 'Phone number must be less than or equal to 12',
    minlength: 'Phone number length must be greater than or equal to 9',
  },
  business : {
    maxlength: 'Phone number must be less than or equal to 12',
    minlength: 'Phone number length must be greater than or equal to 9',
  },
  cell : {
    maxlength: 'Phone number must be less than or equal to 12',
    minlength: 'Phone number length must be greater than or equal to 9',
  }

};

export class GenericValidator {
  // By default the defined set of validation messages is pass but a custom message when the class is called can also be passed
  constructor(private validationMessages: { [key: string]: { [key: string]: string } } = VALIDATION_MESSAGES) {}

  // this will process each formcontrol in the form group
  // and then return the error message to display
  // the return value will be in this format `formControlName: 'error message'`;
  processMessages(container: FormGroup): { [key: string]: string } {
    const messages:any = {};
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const controlProperty = container.controls[controlKey];
        if (controlProperty instanceof FormGroup) {
          const childMessages = this.processMessages(controlProperty);
          Object.assign(messages, childMessages);
        } else {
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if (controlProperty.errors && (controlProperty.dirty || controlProperty.touched)) {
              for (const errorKey in controlProperty.errors) {
                if (controlProperty.errors.hasOwnProperty(errorKey)) {
                  if (this.validationMessages[controlKey][errorKey]) {
                    messages[controlKey] += this.validationMessages[controlKey][errorKey] + ' ';
                  }
                }
              }
            }
          }
        }
      }
    }
    return messages;
  }
}