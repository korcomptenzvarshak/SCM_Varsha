import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, fromEvent, merge, debounceTime } from 'rxjs';
import { BodyClassService } from 'src/app/ngrx/store/services/body-class.service';
import { GenericValidator } from 'src/app/utils/generic-validator';
import { InitiateClaimService } from 'src/app/ngrx/store/services/initiate-claim.service';
import {
  GetData,
  getAddInvioceFailure,
  getAddInvioceSuccess,
  getAssociateGlobalAccountData,
  getAssociateGlobalAccountDataFailure,
  getAssociateGlobalAccountDataSuccess,
  getClaimCategoriesData,
  getClaimCategoriesDataFailure,
  getClaimCategoriesDataSuccess,
  getCountryCodeData,
  getCountryStateCodeFailure,
  getCountryStateCodeSuccess,
  getCustomerData,
  getCustomerDataFailure,
  getCustomerDataSuccess,
  getPriorClaimDataFailure,
  getPriorClaimDataSuccess,
  getReasonCodeByCategoryData,
  getReasonCodeByCategoryFailure,
  getReasonCodeByCategorySuccess,
  getStoreData,
  getStoreDataFailure,
  getStoreDataSuccess,
} from 'src/app/ngrx/store/actions/initiate-claim.actions';
import {
  initiateClaimPayload,
  priorClaimPayload,
} from 'src/app/interfaces/claim-dues.model';
import {
  ClaimCategoryDetails,
  CustomerDetails,
  CustomerStoreNumbersResult,
  ReasonCodeByCategory,
  addInvoice,
} from 'src/app/interfaces/customer.model';
import { Router } from '@angular/router';
import { TableComponent } from 'src/app/shared/table/table.component';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
let tempVal ='';
let tempArr: any = [];
@Component({
  selector: 'app-initiate-claim',
  templateUrl: './initiate-claim.component.html',
  styleUrls: ['./initiate-claim.component.scss'],
})
export class InitiateClaimComponent implements OnInit, AfterViewInit {
  @ViewChild('tableRef')
  tableRef: TableComponent = new TableComponent();
  public isSideNavCollapsed: boolean = true;
  public collapsed = false;
  public screenWidth = 0;
  public recentClaimForm: FormGroup;
  public addEndUserForm!: FormGroup;
  public claimCategories: any = [];
  public reasonCode: any = [];
  public tableHeaders: any[] = [];
  public storeTableHeaders: any[] = [];
  public AddInvoiceTableHeaders: any[] = [];
  public priorClaimTableHeaders: any[] = [];
  public priorClaimTableData: any[] = [];
  public customerNumber: string = '';
  public hasStoreNumber: Boolean = false;
  public selectedCountryHasStates: boolean = false;
  public isoDialingCodes: any = [];
  //public displayCustomerError:Boolean=true;
  @ViewChildren(FormControlName, { read: ElementRef }) // Use with the generic validation message class
  formInputElements!: ElementRef[];
  private genericValidator: GenericValidator;
  public displayMessage: { [key: string]: string } = {};
  public displayMessageRec: { [key: string]: string } = {}; 
  public validationMessages!: {
    firstName: { required: string };
    this: FormGroup<{
      firstName: FormControl<string | null>;
      middleInitial: FormControl<string | null>;
      lastName: FormControl<string | null>;
      companyName: FormControl<string | null>;
      country: FormControl<string | null>;
      address: FormControl<string | null>;
      addressName: FormControl<string | null>;
      city: FormControl<string | null>;
      state: FormControl<string | null>;
      postalCode: FormControl<string | null>;
      county: FormControl<string | null>;
      phone: FormControl<string | null>;
      business: FormControl<string | null>;
      extension: FormControl<string | null>;
      phoneHome: FormControl<string | null>;
      home: FormControl<string | null>;
      extHome: FormControl<string | null>;
      phoneCell: FormControl<string | null>;
      cell: FormControl<string | null>;
      extCell: FormControl<string | null>;
      email: FormControl<string | null>;
      customer: FormControl<string | null>;
      docNumber: FormControl<string | null>;
      rollNumber:  FormControl<string | null>;
    }>;
  };
  public storeListData: any = [];
  public selectedValue: string = '';
  public selectedDataItem: null = null;
  public customerData: any = [];
  public storeSelectedRows: any[] = [];
  public selectedclaimCategory: number = 7;
  // public selectedclaimCategoryId: number = 7;
  public selectedclaimCategoryName: String = '';
  isButtonDisabled = false;
  public isContinueInitiationDisabled: boolean = false;
  private clickTimeout: any;
  public countries: any = [];
  public filteredStates: any = [];
  public addInvoiceData: any[] = [];
  public associateAddInvoiceData: any[] = [];
  public recentassociateAddInvoiceData: any[] = [];
  public recentassociateAddInvoiceCheckBoxData: any = [];
  public altInvoiceToggle: boolean | undefined;
  public selectedclaimassociatedtoGlobalaccount: any[] = [];
  public selectedDocType: any;
  public associatedtoGlobalAccountData: any = [
    {
      lookupId: 168,
      lookupCode: 'None',
    },
  ];
  public docTypeData: any = [
    {
      lookupId: 16,
      lookupCode: 'INV',
    },
  ];
  public selectedDailcode: string = '';
  public selectedresonCode: string = '';
  public showErrorMessage: boolean = false;
  public initiateClaimDetails: any;
  public previousSearchResults: any[] = [];
  @Output() onRowSelectData: EventEmitter<any> = new EventEmitter<any>();
  public invoiceNumberList: string[] = [];
  public orderNumberList: string[] = [];
  public invoiceDateList: string[] = [];
  public bsConfig: Partial<BsDatepickerConfig>;
  public searchInput = '';
  public filteredReasonCodes: any[] = [];
  public showAutocomplete = false;
  public selectedClaimReasonId!: number;
  @ViewChild('elRef1') dropdownList: ElementRef | undefined;
  loading = true; // For filtered data
  searchText: any = {};
  filteredStoreListData: any[] = []; // Filtered data
  originalStoreListData: any[] = [];
  sortDirection: { [key: string]: string } = {};
  columnSortState: { [key: string]: 'asc' | 'desc' } = {};
  itemsPerPage: number = 5; // Default items per page
  currentPage: number = 1;
  selectedRow: any = null;
  storeRowselected: boolean = false;
  public show404ErrorMessage: boolean = false;
  public showRollNumberError: boolean = false;
  public showCustomerNotFoundError = false;
  public showStoreNumberInvalidError = false;
  private previousCustomerData: any; 
  public filteredOptions: any[] =[];
  public showDropdown:boolean = false;
  public getCustomerNumber: any;
  public isSearchIconClicked = false;
  constructor(
    private store: Store<{
      initiateClaim: CustomerDetails;
      store: CustomerStoreNumbersResult;
      claimCategory: ClaimCategoryDetails;
      reasonCode: ReasonCodeByCategory;
    }>,
    private bodyClassService: BodyClassService,
    private initialClaimService: InitiateClaimService,
    private inputFormBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Define an instance of the validator for use with this form,
    this.genericValidator = new GenericValidator(); // Defines all of the validation messages for the form.
    this.recentClaimForm = this.inputFormBuilder.group({
      customer: [
        this.customerNumber,
        [Validators.required, Validators.maxLength(7), Validators.minLength(1)],
      ],
      store: [''],
      altInvoice: [false],
      docType: [16],
      docNumber: [''],
      docDate: [],
      rollNumber: [''],
      claimCategory: [''],
      reasonCode: [''],
      endUser: [false],
      associatedtoGlobalaccount: [168],
      isjobStopped: [false],
      priorityClaim: [false],
      watchList: [false],
      addEndUserObject: [''],
    });

    //this.initiateaddEndUserForm();
    this.bsConfig = {
      showWeekNumbers: false,
      dateInputFormat: 'MM/DD/YYYY',
      containerClass: 'theme-dark-blue',
      maxDate: new Date(),
    };

  
  
  }

  initiateaddEndUserForm() {
            this.addEndUserForm = this.inputFormBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          this.firstCharacterValidator()
        ],
      ],
      middleInitial: ['', [Validators.maxLength(1)]],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          this.firstCharacterValidator()
        ],
      ],
      companyName: [''],
      country: ['240', [Validators.required]],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      addressName: new FormControl(''),
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(9)],
      ],
      county: [''],
      phone: ['+1'],
      business: ['', this.customValidator()],
      extension: [''],
      phoneHome: ['+1'],
      home: ['',this.customValidator()],
      extHome: [''],
      phoneCell: ['+1', ],
      cell: ['',this.customValidator()],
      extCell: [''],
      email: ['', [Validators.email]],
    });
      }

  ngOnInit() {
    this.initiateaddEndUserForm();
        this.addBodyClass();
    this.getClaimCategories();
    this.getAssociateGlobalAccount();
    this.getDocType();
    this.getCountriesList();
    // this.subscribeToEndUserChanges();
    // this.subscribeToCustomerNoChanges()
    const element = document.getElementById('myDropdownmenu');
    if (element) {
      element.classList.toggle('show');
    }
      }
  filterFunction() {
    var input, filter, ul, li, i;
    let a: any | undefined = undefined;
    const element = document.getElementById('myInput');
    if (element) {
      filter = element.innerHTML.toUpperCase();
    }
    // input = document.getElementById("myInput");
    // filter = input.value.toUpperCase();
    const element1 = document.getElementById('myDropdownmenu');
    if (element1) {
      a = element1.getElementsByTagName('a');
    }
    // div = document.getElementById("myDropdownmenu");
    // a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      let txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = '';
      } else {
        a[i].style.display = 'none';
      }
    }
  }
  ngAfterViewInit(): void {
    this.forValidatorMessageProcess();

    //this.storeTableHeaders = ['', 'storeNumber', 'customerNumber', 'customerName', 'storeNumber', 'addressLine1', 'city'];
    this.tableHeaders = [
      'Type',
      'Number',
      'Date',
      'Number',
      'Date',
      'Total $’s',
    ];
    this.AddInvoiceTableHeaders = [
      '',
      'lineNumber',
      'rollNumber',
      'styleNumber',
      'colorNumber',
      'DyeLot',
      'RcsCode',
      'Grade',
      'widthInch',
      'lengthInch',
      'quantity',
      'unitOfMeasure',
      'unitPrice',
      'netAmount',
    ];
    //this.priorClaimTableHeadeaders = ['','ORIGIN','STATUS','CLAIM#','DATE','CUSTOMER#','NAME','INVOICE #','DATE','CRM','DATE','DBT#','DATE','REASON CODE','TOTAL AMOUNT'];
    //this.priorClaimTableHeaders = ['','origin','status','claimId','date','customerNumber','name','invoiceNumber','date','crm','date','dbt','date','reasonCode','totalAmount'];
  }
  ngOnDestroy() {
    // Clear the timeout if the component is destroyed
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }
  }

  public forValidatorMessageProcess() {
        //Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    // Merge the blur event observable with the valueChanges observable
    merge(this.addEndUserForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(100))
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.addEndUserForm
        );
      });

    // Merge the blur event observable with the valueChanges observable parent form
    merge(this.recentClaimForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(100))
      .subscribe((value) => {
        this.clearCustomerNoValidation();
        this.displayMessageRec = this.genericValidator.processMessages(
          this.recentClaimForm
        );
      });
  }

  firstCharacterValidator() {
    return (control:any) => {
      const inputValue = control.value;
      if (inputValue && /^[0-9]/.test(inputValue[0])) {
        // Reset the value to an empty string if the first character is a letter
        control.setValue('');
        return { firstCharacterIsLetter: true };
      }

      return null;
    };
  }

  private customValidator() {
    return (control: any) => {
      const inputValue = control.value;
      const specialCharPattern = /[A-Za-z!@#$%^&*()_+{}\[\]:;<>,.?~\\//"'=-]/;
  
      if (inputValue && specialCharPattern.test(inputValue)) {
        control.setValue(tempVal);
        return { containsSpecialCharacter: true };
      }
      tempVal = inputValue;
      return null;
    };
  }
  // screenWidth!: number;
  // openModalEnterClaim() {
  //   if (this.recentClaimForm.invalid) {
  //     return
  //   } else {
  //     const modelDiv = document.getElementById('modalEnterClaim');
  //     if (modelDiv != null) {
  //       modelDiv.style.display = 'block';
  //     }
  //   }
  // }
  // onInput(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const inputDate = new Date(inputElement.value);

  //   // Check if the input date is in the future
  //   if (inputDate > new Date()) {
  //     // inputElement.value = ''; // Clear the input value for future dates
  //   }
  // }
  futureDateError: boolean = false;

onInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const inputDate = new Date(inputElement.value);

  // Check if the input date is in the future
  if (inputDate > new Date()) {
    // Clear the input value for future dates
    inputElement.value = '';

    // Set the futureDateError flag to display the error message
    this.futureDateError = true;
  } else {
    // Reset the error message and flag
    this.futureDateError = false;
  }
}


  // onInput(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const inputDate = new Date(inputElement.value);
  
  //   // Check if the input date is in the future
  //   if (inputDate > new Date()) {
  //     // Clear the input value for future dates
  //     inputElement.value = '';
  
  //     // Display a message for future dates (you can customize this message)
  //     alert('Future dates are restricted.');
  //   }
  // }
  
  public openModalEnterClaim() {
  
    console.log(this.recentClaimForm.value, 'payload0');
    // Extract values from the form
    const formValues = this.recentClaimForm.value;
    console.log(formValues, 'formValues');
    const payload: priorClaimPayload = {
      customerNumber: formValues.customer,
    };

    if (formValues.docNumber) {
      payload.claimDocumentDTO = this.previousSearchResults.map((item) => {
        // Create a copy of the object without the 'customerNumber' property
        const { customerNumber, ...newItem } = item;
        return newItem;
      });
    }

    if (
      formValues.addEndUserObject.firstName ||
      formValues.addEndUserObject.lastName ||
      formValues.addEndUserObject.companyName ||
      formValues.addEndUserObject.country ||
      formValues.addEndUserObject.address ||
      formValues.addEndUserObject.addressName ||
      formValues.addEndUserObject.city ||
      formValues.addEndUserObject.state ||
      formValues.addEndUserObject.postalCode ||
      formValues.addEndUserObject.county ||
      formValues.addEndUserObject.phone ||
      formValues.addEndUserObject.business ||
      formValues.addEndUserObject.extension ||
      formValues.addEndUserObject.home ||
      formValues.addEndUserObject.extHome ||
      formValues.addEndUserObject.cell ||
      formValues.addEndUserObject.extCell ||
      formValues.addEndUserObject.email
    ) {
      payload.endUserInformationDTO = {
        firstName: formValues.addEndUserObject.firstName,
        // middleInitial: formValues.addEndUserObject.middleInitial,
        lastName: formValues.addEndUserObject.lastName,
        // companyName: formValues.addEndUserObject.companyName,
        // countryId: formValues.addEndUserObject.country,
        addressLine1: formValues.addEndUserObject.address,
        // addressLine2: formValues.addEndUserObject.addressName,
        // city: formValues.addEndUserObject.city,
        // stateId: formValues.addEndUserObject.state,
        // postalCode: formValues.addEndUserObject.postalCode,
        // county: formValues.addEndUserObject.county,
        // businessPhoneDialCodeId: formValues.addEndUserObject.phone,
        businessPhoneNumber: formValues.addEndUserObject.business,
        // businessPhoneExtension: formValues.addEndUserObject.extension,
        homePhoneNumber: formValues.addEndUserObject.home,
        // homePhoneExtension: formValues.addEndUserObject.extHome,
        // cellPhoneDialCodeId: formValues.addEndUserObject.phone,
        cellPhoneNumber: formValues.addEndUserObject.cell,
        // cellPhoneExtension: formValues.addEndUserObject.extCell,
        // emailAddress: formValues.addEndUserObject.email,
      };
    }

    this.initialClaimService.viewPriorClaim(payload).subscribe(
      (data) => {
        // Modify the date format in the response
        const modifiedData = data.map((item: { date: string }) => ({
          ...item,
          date: item.date ? item.date.split('T')[0] : '', // Check if date exists before splitting
        }));

        this.priorClaimTableData = modifiedData;
        this.loading = false; // Set to false to hide the spinner and display the table
      },
      (error) => {
        this.priorClaimTableData = [];
        console.error('Error loading data:', error);
        this.loading = false; // Set to false to hide the spinner
      }
    );

    const modelDiv = document.getElementById('modalPriorClaimSummary');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }

  
 
}

  public initiateClaimModal() {
    const modelDiv = document.getElementById('modalEnterClaim');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }

    // this.initialClaimService.finalInitiateClaim(payload).subscribe(data =>{
    //   this.claimNumber = data.claimId;
    //   const modelDiv = document.getElementById('initiateclaim');
    //   if (modelDiv != null) {
    //     modelDiv.style.display = 'block';
    //   }
    //   console.log(data,'data')
    // })
  }

  public initiateModal() {
    if (!this.isButtonDisabled) {
      // Disable the button to prevent further clicks
      
      this.isContinueInitiationDisabled = true;
    const totalNetAmount = this.associateAddInvoiceData.reduce(
      (accumulator, currentValue) => {
        // Parse the netAmount as a floating-point number and add it to the accumulator
        return accumulator + parseFloat(currentValue.netAmount);
      },
      0
    );

    // Print the total netAmount
    console.log('Total Net Amount:', totalNetAmount);
    const formValues = this.recentClaimForm.value;
   
    let categoryCode;
    const matchingCategory = this.claimCategories.find((category: any) => category.claimCategoryId === parseInt(formValues.claimCategory));
    
    if (matchingCategory) {
      categoryCode = matchingCategory.claimCategoryCode;
      
    } else {
      categoryCode = '';
      
    }
    

    //category.claimCategoryId === formValues.claimCategory);
    const payload: initiateClaimPayload = {
      customerNumber: formValues.customer,
       claimCategoryCode: matchingCategory ? matchingCategory.claimCategoryCode : '',
      claimReasonId: this.selectedClaimReasonId
        ? this.selectedClaimReasonId
        : 1,
      jobStopped: formValues.isjobStopped,
      //  workStatusId: 0,
      priorityClaim: formValues.priorityClaim,
      endUserClaim: formValues.endUser,
      globalAccount: formValues.associatedtoGlobalaccount,
      claimAmountUsd: totalNetAmount ? totalNetAmount : 0,
    };

    if (formValues.docNumber) {
      payload.claimDocumentDTO = this.previousSearchResults.map((item) => {
        // Create a copy of the object without the 'customerNumber' property
        const { customerNumber, ...newItem } = item;
        return newItem;
      });
    }

    if (
      formValues.addEndUserObject.firstName ||
      formValues.addEndUserObject.lastName ||
      formValues.addEndUserObject.companyName ||
      formValues.addEndUserObject.country ||
      formValues.addEndUserObject.address ||
      formValues.addEndUserObject.addressName ||
      formValues.addEndUserObject.city ||
      formValues.addEndUserObject.state ||
      formValues.addEndUserObject.postalCode ||
      formValues.addEndUserObject.county ||
      formValues.addEndUserObject.phone ||
      formValues.addEndUserObject.business ||
      formValues.addEndUserObject.extension ||
      formValues.addEndUserObject.home ||
      formValues.addEndUserObject.extHome ||
      formValues.addEndUserObject.cell ||
      formValues.addEndUserObject.extCell ||
      formValues.addEndUserObject.email
    ) {
      payload.endUserInformationDTO = {
        firstName: formValues.addEndUserObject.firstName,
        middleInitial: formValues.addEndUserObject.middleInitial,
        lastName: formValues.addEndUserObject.lastName,
        companyName: formValues.addEndUserObject.companyName,
        countryId: formValues.addEndUserObject.country,
        addressLine1: formValues.addEndUserObject.address,
        addressLine2: formValues.addEndUserObject.addressName,
        city: formValues.addEndUserObject.city,
        stateId: formValues.addEndUserObject.state,
        postalCode: formValues.addEndUserObject.postalCode,
        county: formValues.addEndUserObject.county,
        businessPhoneDialCodeId: formValues.addEndUserObject.phone,
        businessPhoneNumber: formValues.addEndUserObject.business,
        businessPhoneExtension: formValues.addEndUserObject.extension,
        homePhoneNumber: formValues.addEndUserObject.home,
        homePhoneExtension: formValues.addEndUserObject.extHome,
        cellPhoneDialCodeId: formValues.addEndUserObject.phone,
        cellPhoneNumber: formValues.addEndUserObject.cell,
        cellPhoneExtension: formValues.addEndUserObject.extCell,
        emailAddress: formValues.addEndUserObject.email,
      };
    }
    this.initialClaimService.finalInitiateClaim(payload).subscribe((data) => {
      this.initiateClaimDetails = data;
      const modelDiv = document.getElementById('initiateclaim');
      if (modelDiv != null) {
        modelDiv.style.display = 'block';
      }
      console.log(data, 'data');
    });
  }
  this.clickTimeout = setTimeout(() => {
    // this.isButtonDisabled = false;
    // this.isContinueInitiationDisabled = false;
  }, 20000);
}

  public openModalStopInitiate() {
    const modelDiv = document.getElementById('stopinitiate');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  // trimAndUpdate(controlName: string) {
  //   const control = this.addEndUserForm.get(controlName);
  //   if (control && typeof control.value === 'string') {
  //     control.setValue(control.value.trim(), { emitEvent: false });
  //   }
  // }
  trimAndUpdate(controlName: string) {
        const control = this.addEndUserForm.get(controlName);
    if (control && typeof control.value === 'string') {
      let trimmedValue = control.value.trim();
  
      if (trimmedValue.length > 64) {
        // Trim the value to a maximum of 64 characters
        trimmedValue = trimmedValue.substring(0, 64);
      }
  
      // Update the control value without emitting an event
      control.setValue(trimmedValue, { emitEvent: false });
    }
  }
   
  public getBodyClass(): string {
    return this.bodyClassService.getBodyClass(
      this.isSideNavCollapsed,
      this.screenWidth
    );
  }

  public getCountriesList() {
    this.countries = [];
    this.initialClaimService.getCountriesList().subscribe(
      (data) => {
        this.countries = data;
        //let jsonArray = JSON.parse(this.countries);
        let isoCountryIdToDelete = 240;
        let newObject = {
          "createdByUserId": 0,
          "modifiedByUserId": 0,
          "createdDateTime": "2023-06-27T18:06:17.57",
          "modifiedDateTime": "2023-06-27T18:06:17.57",
          "isoCountryId": 240,
          "isoCountryCode": "US",
          "isoCountryCode3": "USA",
          "isoCountryName": "United States of America",
          "statusId": 1
      }
        let indexToDelete = this.countries.findIndex((item:any) => item.isoCountryId === isoCountryIdToDelete);

// Check if the object with the specified isoCountryId exists in the array
if (indexToDelete !== -1) {
    // Remove the object at the found index
    this.countries.splice(indexToDelete, 1);
    // Add the new object at the first index
    this.countries.unshift(newObject);
}
        //this.addEndUserForm.get('country')?.setValue('240'); // Set default selected country
        this.getCountryCodeByStates();
        this.getDialCodesByCountryId();
                this.addEndUserForm.patchValue({
          business: '',
          home: '',
          cell: '',
          state: '',
        });
      },
      (error) => {
        this.countries = error;
      }
    );
  }

  public openModalWarning() {
    const modelDiv = document.getElementById('modalWarning');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  public openModalInfo() {
    const modelDiv = document.getElementById('modalInfo');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  public openModalError() {
    const modelDiv = document.getElementById('modalError');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  public openModalInitiateClaim() {
    this.recentClaimForm
      .get('addEndUserObject')
      ?.patchValue(this.addEndUserForm.value);
    const modelDiv = document.getElementById('initiateclaim');
    const modelDiv1 = document.getElementById('modalEnterClaim');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
    if (modelDiv1 != null) {
      modelDiv1.style.display = 'none';
    }
  }
  public tempaddEndUserFormValue: any = {};
  public openModalEndUserInfo() {
    this.initiateaddEndUserForm();
        this.displayMessage = {};
    if (this.tempaddEndUserFormValue) {
      const controls = Object.keys(this.addEndUserForm.controls);
      controls.forEach((controlName, index) => {
        for (const [key, value] of Object.entries(
          this.tempaddEndUserFormValue
        )) {
          if (key == controlName) {
                        this.addEndUserForm.get(controlName)?.setValue(value);
          }
        }
      });
    }
    const modelDiv = document.getElementById('enduserinfo');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }
  public  isRetrieveButtonEnabled(): boolean {
    const customerNumber = this.recentClaimForm.value.customer;
    const docType = this.recentClaimForm.value.docType;
    const docNumber = this.recentClaimForm.value.docNumber;
    const rollNumber = this.recentClaimForm.value.rollNumber; 
  
    // Check the conditions
    const isCustomerNumberValid = customerNumber && customerNumber.length === 7;
    const isDocTypeValid = docType && (docNumber || rollNumber);
  
    return isCustomerNumberValid && isDocTypeValid;
  }
  

  openModalAddInvoice() {


     // Check if customer number is valid
  // if (customerNumber.length !== 7 ) {
  //   // Invalid customer number, so don't open the modal
  //   return;
  // }
// if(this.show404ErrorMessage ===true){
//   return;
// }
  // Check if docType and docNumber are both valid
  // if ((!docType || !docNumber) && docType !== '16' && docType !== '17' && docType !== '18') {
  //   // Invalid docType or docNumber, so don't open the modal
  //   return;
  // }

    // Reset the 404 error message
    // this.show404ErrorMessage = false;
  
     // Check if customer number is valid
  // if (customerNumber.length !== 7 ) {
  //   // Invalid customer number, so don't open the modal
  //   return;
  // }
// if(this.show404ErrorMessage ===true){
//   return;
// }
  // Check if docType and docNumber are both valid
  // if ((!docType || !docNumber) && docType !== '16' && docType !== '17' && docType !== '18') {
  //   // Invalid docType or docNumber, so don't open the modal
  //   return;
  // }

    // Reset the 404 error message
    // this.show404ErrorMessage = false;
    const addInvoiceObj = {
      customerNumber: '',
      invoiceNumber: '',
      bolNumber: '',
      poNumber: '',
      orderNumber: '',
      docDate: '',
      docType: '',
      rollNumber: ''
    };


    addInvoiceObj.customerNumber = this.prefixWithZeros(this.recentClaimForm.value.customer);
    addInvoiceObj.docDate = this.recentClaimForm.value.docDate;
    addInvoiceObj.rollNumber = this.recentClaimForm.value.rollNumber;
    addInvoiceObj.docType = this.recentClaimForm.value.docType;
    if(this.recentClaimForm.value.docType == '16'){
      addInvoiceObj.invoiceNumber=  this.recentClaimForm.value.docNumber
    } else if(this.recentClaimForm.value.docType =='17'){
      addInvoiceObj.bolNumber=  this.recentClaimForm.value.docNumber
    }else if(this.recentClaimForm.value.docType =='18'){
      addInvoiceObj.orderNumber=  this.recentClaimForm.value.docNumber
    }else {
      addInvoiceObj.poNumber=  this.recentClaimForm.value.docNumber
    }

   

    if (
      this.previousSearchResults.length === 0 ||
      this.previousSearchResults[0].customerNumber !==
        addInvoiceObj.customerNumber
    ) {
      this.previousSearchResults = []; // Reset if customerNumber changed
    }

    const storedValues = this.addInvoiceData.filter(
      (item) => item.customerNumber === addInvoiceObj.customerNumber
    );

    // Store and display the searched values
    if (
      storedValues.length === 0 ||
      storedValues[0].docType !== addInvoiceObj.docType
    ) {
      storedValues.splice(0, storedValues.length);
      this.previousSearchResults.push({
        customerNumber: addInvoiceObj.customerNumber, // Store customerNumber
        documentTypeId: addInvoiceObj.docType,
        documentNumber:
          addInvoiceObj.invoiceNumber ||
          addInvoiceObj.bolNumber ||
          addInvoiceObj.orderNumber ||
          addInvoiceObj.poNumber,
      });
      console.log(this.previousSearchResults, 'previousSearchResults');
    }

    console.log(storedValues, 'storedValues11233');
    this.store.dispatch(new GetData(addInvoiceObj));
    this.initialClaimService.getAddInvioce(addInvoiceObj).subscribe(
      (data) => {
        this.addInvoiceData = [];
        this.addInvoiceData = data;

        // Clear the lists before populating them with unique values
        this.invoiceNumberList = [];
        this.orderNumberList = [];
        this.invoiceDateList = [];

        this.addInvoiceData.forEach((item) => {
          // Push the unique values to the lists
          if (!this.invoiceNumberList.includes(item.invoiceNumber)) {
            this.invoiceNumberList.push(item.invoiceNumber);
          }

          if (!this.orderNumberList.includes(item.orderNumber)) {
            this.orderNumberList.push(item.orderNumber);
          }

          if (!this.invoiceDateList.includes(item.invoiceDate)) {
            this.invoiceDateList.push(item.invoiceDate);
          }
        });

        // Console the lists
        console.log('Unique Invoice Numbers:', this.invoiceNumberList);
        console.log('Unique Order Numbers:', this.orderNumberList);
        console.log('Unique Invoice Dates:', this.invoiceDateList);
        this.store.dispatch(getAddInvioceSuccess({ data }));
        if(this.showCustomerNotFoundError==false){
          const modelDiv = document.getElementById('addinvoice');
          tempArr = this.recentassociateAddInvoiceCheckBoxData.slice();
          if (modelDiv != null) {
            modelDiv.style.display = 'block';
          }
          }
    
      },
      (error) => {
        console.log('chk this.recentClaimForm.value.docType--------',this.recentClaimForm.value.docType)
        console.log('chk this.recentClaimForm.value.rollNumber--------',this.recentClaimForm.value.rollNumber )
        if (error.status === 404 && this.recentClaimForm.value.docNumber) {
          this.show404ErrorMessage = true;
          console.log("404 docnumber error doctype")
        }else if(error.status === 404 && this.recentClaimForm.value.rollNumber){
          this.showRollNumberError = true;
          console.log("404 docnumber error rollno")
        }
         else {
          this.store.dispatch(getAddInvioceFailure({ error }));
          this.addInvoiceData = [];
        }
      }

      
    );
    }

  public setAddInvoiceData(item: any, isChecked: boolean) {
    if (isChecked) {
      if (tempArr.length === 0) {
        tempArr.push(item); // If tempArr is empty, just push the item
      } else {
        const isCustomerNumberMatching = tempArr.some(
          (tempItem: any) => tempItem.CustomerNumber === item.CustomerNumber
        );
  
        if (isCustomerNumberMatching) {
          tempArr.push(item); // If CustomerNumber matches, push the item
        } else {
          tempArr = []; // If CustomerNumber doesn't match, empty tempArr
          this.recentassociateAddInvoiceCheckBoxData = [];
          tempArr.push(item); // Then push the item
        }
      }
    } else {
      const index = tempArr.findIndex(
        (tempItem: any) =>
          tempItem.lineNumber === item.lineNumber &&
          tempItem.invoiceNumber === item.invoiceNumber
      );
  
      if (index !== -1) {
        tempArr.splice(index, 1); // Remove the item from tempArr when unchecked
      }
    }
  
    console.log(tempArr, 'tempArr');
    this.recentassociateAddInvoiceData = tempArr;
  }
  
  public prefixWithZeros(customerNumber: string): string {
    if (customerNumber.length < 7) {
      const numberOfZerosToAdd = 7 - customerNumber.length;
      const prefixedNumber = '0'.repeat(numberOfZerosToAdd) + customerNumber;
      return prefixedNumber;
    } else {
      return customerNumber;
    }
  }
  public openModalPriorClaimSummary() {
    //const modelDiv = document.getElementById('priorclaimsummary');
    const modelDiv1 = document.getElementById('addinvoice');
    // if (modelDiv != null) {
    //   modelDiv.style.display = 'block';
    // }
    if (modelDiv1 != null) {
      modelDiv1.style.display = 'none';
    }
  }

  public getClaimCategories() {
        this.store.dispatch(getClaimCategoriesData());
    this.initialClaimService.getClaimCategories().subscribe(
      (data) => {
        this.store.dispatch(getClaimCategoriesDataSuccess({ data }));
        this.claimCategories = data;
        this.selectedclaimCategory = this.claimCategories[0].claimCategoryId;
        //   this.selectedclaimCategory = this.claimCategories[0].claimCategoryCode;
        // this.selectedclaimCategoryId= this.claimCategories[0].claimCategoryId;
        this.recentClaimForm.patchValue({
          claimCategory: this.selectedclaimCategory,
        });
      },
      (error) => {
        this.store.dispatch(getClaimCategoriesDataFailure({ error }));
        this.claimCategories = error;
      }
    );
    this.getReasonCodeByCategory(this.recentClaimForm.value.claimCategory);
  }
  public onclaimCategoryChange() {
    this.selectedclaimCategory = this.recentClaimForm.value.claimCategory;
    this.filteredReasonCodes = [];
    this.recentClaimForm.patchValue({
      reasonCode: '',
    });
        this.getReasonCodeByCategory(this.recentClaimForm.value.claimCategory);
  }

 public filterOptions(event: any) {
  if(event.target.value.length>0) {
    this.showDropdown = true;
  }else{
    this.showDropdown = false;
  }
    const searchTerm = event.target.value.toLowerCase();
    
    // Filter options based on claimReasonCode or definition
    this.filteredOptions = this.reasonCode.filter((option: any) =>
      option.claimReasonCode.toLowerCase().includes(searchTerm) ||
      option.claimReasonDescription.toLowerCase().includes(searchTerm)
    );
    
  }
  
  public selectOption(item: any) {
    this.showDropdown = false;
    this.selectedClaimReasonId = item.claimReasonId;
    this.recentClaimForm.patchValue({
      reasonCode: item.claimReasonCode + ' ' + item.claimReasonDescription,
    });
  }
  
 
   // Close dropdown on outside click
   @HostListener('document:click', ['$event'])
   onDocumentClick(event: any): void {
     if (
       this.dropdownList &&
       !this.dropdownList.nativeElement.contains(event.target) &&
       this.showDropdown
     ) {
       this.toggleDropdown();
     }
   }


  
  public getReasonCodeByCategory(val: string) {
        this.store.dispatch(getReasonCodeByCategoryData());
    this.initialClaimService
      // .getReasonCodeByCategory(this.selectedclaimCategoryId)
      .getReasonCodeByCategory(this.selectedclaimCategory)
      .subscribe(
        (data) => {
          this.store.dispatch(getReasonCodeByCategorySuccess({ data }));
          this.reasonCode = data;

          // Filter the reason codes based on input with a minimum of 3 characters
          this.filteredReasonCodes = this.reasonCode.filter(
            (item: any) =>
              item.claimReasonCode.toLowerCase().includes(val.toLowerCase()) ||
              item.claimReasonDescription.toLowerCase().includes(val.toLowerCase())
          );
          this.showAutocomplete = true;
          this.filteredOptions = this.reasonCode
        },
        (error) => {
          this.store.dispatch(getReasonCodeByCategoryFailure({ error }));
          this.reasonCode = error;
        }
      );
  }
 


  toggleDropdown() {
    console.log('Toggle Dropdown Clicked. Show Dropdown:', this.showDropdown);
    this.showDropdown = !this.showDropdown;
    if (!this.showDropdown) {
      this.filteredOptions = this.reasonCode.slice(); // Reset filtered options when closing
    }
  }

  public getCustomerDetails(CustomerNumber: string) {
    this.getCustomerNumber = CustomerNumber;
    console.log('else this.getCustomerNumber------>', this.getCustomerNumber);
  console.log(this.isSearchIconClicked,'this.isSearchIconClicked')
    if (this.isSearchIconClicked) { // Check the flag
      console.log(this.isSearchIconClicked,'this.isSearchIconClicked')
      CustomerNumber = this.prefixWithZeros(CustomerNumber);
      this.showCustomerNotFoundError = false;
    
      const currentCustomerValue = this.recentClaimForm?.get('customer')?.value;
      this.setCustomerNumber(CustomerNumber);
    
      this.store.dispatch(getCustomerData());
      this.getCustomerData(CustomerNumber);
    }
    this.isSearchIconClicked= false;
  }
  
  
  
  
  
  
  
public getCustomerData(CustomerNumber: any) {
  console.log('wys is it called')
  
  this.initialClaimService.getCustomerDetails(CustomerNumber).subscribe(
    (data) => {
        this.store.dispatch(getCustomerDataSuccess({ data }));
        this.customerData = data;
        this.customerData = this.customerData[0];
        this.isContinueInitiationDisabled = true;

        // Now you have access to both previousCustomerData and this.customerData
        console.log('Previous Customer Data:', this.previousCustomerData);
        console.log('Current Customer Data:', this.customerData.customerNumber);
        console.log(' this.previousCustomerData.customerNumber:',  this.previousCustomerData.customerNumber);
    },
    (error) => {
        this.store.dispatch(getCustomerDataFailure({ error }));
        this.customerData = error;
        this.isContinueInitiationDisabled = false;
        if (error.status === 404) {
            this.showCustomerNotFoundError = true;
        }
    }
);
}

  public setCustomerNumber(customerNumber: String) {
        this.showCustomerNotFoundError = false;
    this.isContinueInitiationDisabled = false;
    if (customerNumber.length > 0) {
      this.customerData = [];
      this.customerData = customerNumber;
      this.recentClaimForm.patchValue({
        customer: this.customerData,
      });
    } else {
      //this.displayCustomerError=true
      // this.displayMessageRec.customer="Customer can not be empty"
    }
  }

  public onEnterKeyPress(event: Event): void {
    event.preventDefault();
  }
  onCustomerNumberChange(newValue: string) {
    console.log('is called')
    console.log('is newValue',newValue);
    console.log('is customerData',this.customerData);
    const previousCustomerNumber = this.customerData;
    console.log('is previousCustomerNumber',previousCustomerNumber);
    if (
      previousCustomerNumber &&
      previousCustomerNumber !== newValue &&
      (this.associateAddInvoiceData?.length > 0 || this.isAddEndUserFormSubmitted)
    ) {
      console.log('came inside loop')
      // Previous customer number is not empty and has changed, show an alert message
      const modelDiv = document.getElementById('customerModalWarning');
      if (modelDiv != null) {
        modelDiv.style.display = 'block';
        this.isAddEndUserFormSubmitted = false;
      }
    }
    // Now update the customer data or perform any other actions as needed
    this.getCustomerDetails(newValue);
  }
  


  public clearCustomerNoValidation() {
    this.showStoreNumberInvalidError = false;
    this.show404ErrorMessage=false
    this.showRollNumberError=false
    this.hasStoreNumber = false;
    if (
      this.recentClaimForm.value.store !== '' ||
      this.recentClaimForm.value.endUser === true
    ) {
      this.hasStoreNumber = true;
    } else {
      this.hasStoreNumber = false;
    }
    if (this.addEndUserForm.valid && this.recentClaimForm.value.endUser === true && this.isAddEndUserFormSubmitted) {
     this.isContinueInitiationDisabled = true;
    }
     }

  public trackByStoreNumber(index: number, dataItem: any): number {
    return dataItem.storeNumber;
  }

  public openModalModalStoreInvoice() {
    this.storeListData = [];
    this.showStoreNumberInvalidError = false;
    this.store.dispatch(getStoreData());
    this.initialClaimService
      .getStoreDetails(this.recentClaimForm.value.store)
      .subscribe(
        (data) => {
          this.store.dispatch(getStoreDataSuccess({ data }));
          this.storeListData = data;
          this.originalStoreListData = [...this.storeListData];
          // this.storeListData = data
          //  Display the modal here, inside the success callback
          const modelDiv = document.getElementById('storeinvoice');
          if (modelDiv != null) {
            modelDiv.style.display = 'block';
          }
        },
        (error) => {
          this.store.dispatch(getStoreDataFailure({ error }));
          this.storeListData = [];

          if (error.status === 404) {
            this.showStoreNumberInvalidError = true;
          }
        }
      );
  }

  public CloseModalEnterClaim() {
    const modelDiv = document.getElementById('modalEnterClaim');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
  public CloseModalPriorSummary() {
    const modelDiv = document.getElementById('modalPriorClaimSummary');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  public CloseModalInfo() {
    const modelDiv = document.getElementById('modalInfo');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  public CloseModalStopInitiate() {
    const modelDiv = document.getElementById('stopinitiate');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  public stopInitiate() {
    const modelDiv = document.getElementById('stopinitiate');
    this.router.navigate(['/dashboard']);
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  public CloseModalWarning() {
    this.recentClaimForm.patchValue({
      altInvoice: false,
    });

    const modelDiv = document.getElementById('modalWarning');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
  public CloseModalError() {
    const modelDiv = document.getElementById('modalError');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  public CloseModalInitiateClaim() {
    const modelDiv = document.getElementById('initiateclaim');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
      this.router.navigate(['/dashboard']);
    }
  }

  public CloseModalEndUserInfo() {
    const modelDiv = document.getElementById('enduserinfo');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  // continueIntiationRequest() {
  //   this.recentClaimForm.get('addEndUserObject')?.patchValue(this.addEndUserForm.value);
  //   console.log(this.recentClaimForm.value);
  //   const modelDiv = document.getElementById('enduserinfo');
  //   if (modelDiv != null) {
  //     modelDiv.style.display = 'none';
  //   }
  // }
isAddEndUserFormSubmitted:boolean=false
  public addFormDetails() {
    console.log(
      'Rec Add Form data: ' + JSON.stringify(this.addEndUserForm.value)
    );
    if (this.addEndUserForm.invalid) {
      return;
    }
    this.isAddEndUserFormSubmitted=true
        this.tempaddEndUserFormValue = this.addEndUserForm.value;
    //alert(JSON.stringify(this.tempaddEndUserFormValue))
    this.recentClaimForm.patchValue({
      addEndUserObject: this.addEndUserForm.value,
    });
    if(this.recentClaimForm.value.endUser === true){
      this.isContinueInitiationDisabled = true;
      
    }
    const modelDiv = document.getElementById('enduserinfo');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
    console.log(
      'chk input form value----->',
      JSON.stringify(this.recentClaimForm.value)
    );
    // Display the toaster message
    // this.snackBar.open('End User Information Added Successfully', 'Close', {
    //   duration: 3000, // Duration in milliseconds
    //   verticalPosition: 'top', // You can change the position
    // });
    this.snackBar.open('End User Information Added Successfully', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'], // Apply the CSS class here
    });
  }

  public CloseModalPriorClaimSummary() {
    const modelDiv = document.getElementById('priorclaimsummary');
    this.router.navigate(['/dashboard']);

    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  public CloseModalAddInvoice() {
    const modelDiv = document.getElementById('addinvoice');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  // // Console the updated this.associateAddInvoiceData
  // console.log(this.associateAddInvoiceData);
  //     console.log(this.associateAddInvoiceData, 'addInvoice');
  //     this.tableRef.selectedRows = [];
  //     this.CloseModalAddInvoice();
  //   }
  public addInvoice() {
    //this.recentassociateAddInvoiceCheckBoxData.push(this.recentassociateAddInvoiceData);
    // this.recentassociateAddInvoiceCheckBoxData.push(
    //   ...this.recentassociateAddInvoiceData
    // );
    this.recentassociateAddInvoiceCheckBoxData =
      this.recentassociateAddInvoiceData
    ;
    this.recentClaimForm.value;
    // Check if this.associateAddInvoiceData is empty
    if (!this.associateAddInvoiceData || !this.associateAddInvoiceData.length) {
      // If empty, assign this.recentassociateAddInvoiceData to this.associateAddInvoiceData
      if (
        this.recentassociateAddInvoiceData &&
        this.recentassociateAddInvoiceData.length > 0
      ) {
        //  this.associateAddInvoiceData = this.sumAndRemoveDuplicates(this.recentassociateAddInvoiceData);
        this.recentassociateAddInvoiceData =
          this.recentassociateAddInvoiceData.map((item) => ({
            ...item,
            docType: parseInt(this.recentClaimForm.value.docType),
            docNumber: this.recentClaimForm.value.docNumber,
            docDate: this.recentClaimForm.value.docDate,
          }));

        this.associateAddInvoiceData = this.sumAndRemoveDuplicates(
          this.recentassociateAddInvoiceData
        );
      }
    } else {
      // If not empty, compare CustomerNumber of all objects
      const customerNumber = this.recentClaimForm.value.customer;
      const docType = this.recentClaimForm.value.docType;

      const isCustomerNumberMatching = this.associateAddInvoiceData.some(
        (item) => item.CustomerNumber === customerNumber
      );

      if (isCustomerNumberMatching) {
        this.recentassociateAddInvoiceData =
          this.recentassociateAddInvoiceData.map((item) => ({
            ...item,
            docType: parseInt(this.recentClaimForm.value.docType),
            docNumber: this.recentClaimForm.value.docNumber,
            docDate: this.recentClaimForm.value.docDate,
          }));

        const result = this.sumAndRemoveDuplicates(
          this.recentassociateAddInvoiceData
        );
        console.log(result, 'result');

        for (const item of result) {
          if (typeof item === 'object') {
            console.log('Checking item: ', item);

            const matchingIndex = this.associateAddInvoiceData.findIndex(
              (existingItem) =>
                existingItem.customerNumber === item.customerNumber &&
                existingItem.invoiceNumber === item.invoiceNumber
            );

            console.log('Matching Index: ', matchingIndex);

            if (matchingIndex !== -1) {
              // Remove the existing item with the same customer and invoice number
              this.associateAddInvoiceData.splice(matchingIndex, 1);
            }

            // Push the new item to this.associateAddInvoiceData
            this.associateAddInvoiceData.push(item);
          }
        }
      } else {
        // If CustomerNumber does not match, clear this.associateAddInvoiceData and push recentassociateAddInvoiceData
        this.associateAddInvoiceData = [];
        this.recentassociateAddInvoiceData =
          this.recentassociateAddInvoiceData.map((item) => ({
            ...item,
            docType: parseInt(this.recentClaimForm.value.docType),
            docNumber: this.recentClaimForm.value.docNumber,
            docDate: this.recentClaimForm.value.docDate,
          }));
        const result = this.sumAndRemoveDuplicates(
          this.recentassociateAddInvoiceData
        );

        for (const item of result) {
          if (typeof item === 'object') {
            const matchingIndex = this.associateAddInvoiceData.findIndex(
              (existingItem) =>
                existingItem.customerNumber === item.customerNumber &&
                existingItem.invoiceNumber === item.invoiceNumber
            );

            if (matchingIndex !== -1) {
              // Remove the existing item with the same customer and invoice number
              this.associateAddInvoiceData.splice(matchingIndex, 1);
            }

            // Push the new item to this.associateAddInvoiceData
            this.associateAddInvoiceData.push(item);
          }
        }
      }
    }
    console.log(
      this.associateAddInvoiceData,
      '  this.associateAddInvoiceDataFinal'
    );
    tempArr = [];
    // this.tableRef.selectedRows = [];
    this.CloseModalAddInvoice();
  }

  isChecked(claim: any): boolean {
    if (
      this.recentassociateAddInvoiceCheckBoxData &&
      this.recentassociateAddInvoiceCheckBoxData.length > 0
    ) {
      return this.recentassociateAddInvoiceCheckBoxData.some(
        (item: any) =>
          item.lineNumber === claim.lineNumber &&
          item.invoiceNumber === claim.invoiceNumber
      );
    }
    return false;
  }

  // Function to sum netAmount and remove duplicates
  public sumAndRemoveDuplicates(data: any) {
    const invoiceSumMap = new Map();

    for (const invoiceData of data) {
      const invoiceNumber = invoiceData.invoiceNumber;
      const netAmount = parseFloat(invoiceData.netAmount);

      if (!isNaN(netAmount)) {
        if (invoiceSumMap.has(invoiceNumber)) {
          invoiceSumMap.set(
            invoiceNumber,
            invoiceSumMap.get(invoiceNumber) + netAmount
          );
        } else {
          invoiceSumMap.set(invoiceNumber, netAmount);
        }
      }
    }

    const updatedData = Array.from(invoiceSumMap.keys()).map(
      (invoiceNumber) => {
        return {
          ...data.find(
            (item: { invoiceNumber: any }) =>
              item.invoiceNumber === invoiceNumber
          ),
          netAmount: invoiceSumMap.get(invoiceNumber).toFixed(2),
        };
      }
    );

    return updatedData;
  }

  public CloseModalStoreInvoice() {
    // this.recentClaimForm.patchValue({
    //   store: '',
    // });
    const modelDiv = document.getElementById('storeinvoice');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  // Function: Add class to body
  public addBodyClass() {
    const bodyTag = document.body;
    bodyTag.classList.add('my-class');
  }

  public onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  submitForm() {
    // if (this.inputForm.valid) {
    // if(this.addEndUserForm.invalid){
    //  this.recentClaimForm.get('addEndUserObject')?.patchValue(this.addEndUserForm.value);
    //this.inputForm.patchValue('addEndUserObject',JSON.stringify(this.addEndUserForm.value))
    // Form is valid, perform form submission logic
    // console.log(this.recentClaimForm.value);
    // console.log("submitform"+JSON.stringify(this.recentClaimForm.value));
  }
  // } else {
  // Form is invalid, display error messages or handle accordingly
  // }
  // }

  public isNumentered() {
        if (
      (this.addEndUserForm.get('phone')?.value &&
        this.addEndUserForm.get('business')?.value) ||
      (this.addEndUserForm.get('phoneHome')?.value &&
        this.addEndUserForm.get('home')?.value) ||
      (this.addEndUserForm.get('phoneCell')?.value &&
        this.addEndUserForm.get('cell')?.value)
    ) {
      return true;
    } else {
      return false;
    }
  }

  public setCustomerDataFromStoreTable() {
    this.isContinueInitiationDisabled = true;
    this.customerData = [];
    this.customerData = this.setStoreData;
    this.selectedValue =
      this.customerData.customerName +
      ' - ' +
      this.customerData.address +
      ' - ' +
      this.customerData.city;
    this.recentClaimForm.patchValue({
      // store: this.customerData.storeNumber,
      customer: this.customerData.customerNumber,
    });
    this.recentClaimForm.patchValue({
      store: '',
    });
    
    const modelDiv = document.getElementById('storeinvoice');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }

  }

  public getCountryCodeByStates() {
    this.filteredStates = [];
    this.store.dispatch(getCountryCodeData());
    this.initialClaimService
      .getCountryCodeByStates(this.addEndUserForm.value.country)
      .subscribe(
        (data) => {
          this.store.dispatch(getCountryStateCodeSuccess({ data }));
          
          // Check if data is an array and if it's not empty
          this.selectedCountryHasStates = Array.isArray(data) && data.length > 0;
          
          // Update the 'state' form control's validation
          const stateControl = this.addEndUserForm.get('state');
          if (stateControl) {
            if (this.selectedCountryHasStates) {
              stateControl.setValidators([Validators.required]);
            } else {
              stateControl.clearValidators();
            }
            stateControl.updateValueAndValidity();
          }
          
          this.filteredStates = data;
        },
        (error) => {
          this.store.dispatch(getCountryStateCodeFailure({ error }));
          this.filteredStates = error;
        }
      );
  }


  public getDialCodesByCountryId() {
    this.isoDialingCodes = [];
    // this.store.dispatch(getCountryCodeData());
    this.initialClaimService
      .getDialCodesByCountryId(this.addEndUserForm.value.country)
      .subscribe(
        (data) => {
          data.forEach((a: any) => {
            this.isoDialingCodes.push(`+${a.isoCountryDialingCode}`);
          });
          data.filter((a: any) => {
            if (a.isoCountryId == this.addEndUserForm.value.country) {
                            this.addEndUserForm.patchValue({
                phone: `+${a.isoCountryDialingCode}`,
                phoneHome: `+${a.isoCountryDialingCode}`,
                phoneCell: `+${a.isoCountryDialingCode}`,
              });
              this.selectedDailcode = `+${a.isoCountryDialingCode}`;
            }
          });
          this.isoDialingCodes.sort((a: any, b: any) => {
            const numericA = a.replace(/[^0-9]/g, '');
            const numericB = b.replace(/[^0-9]/g, '');
            return parseInt(numericA) - parseInt(numericB);
          });
        },
        (error) => {
          //this.store.dispatch(getCountryCodeFailure({ error }));
          this.isoDialingCodes = error;
        }
      );
  }

  public toggleAltInvoice() {
    if (
      this.associateAddInvoiceData &&
      this.associateAddInvoiceData !== null &&
      Object.keys(this.associateAddInvoiceData).length > 0 &&
      this.recentClaimForm.get('docNumber')?.value !== ''
    ) {
      // The variable is an object and contains values
      console.log('The variable is an object and contains values.');
      this.openModalWarning();
    } else {
      const altInvoiceControl = this.recentClaimForm.get('altInvoice');
      if (altInvoiceControl) {
        console.log(altInvoiceControl.value, 'altInvoiceControl.value');
        this.altInvoiceToggle = altInvoiceControl.value;
        //altInvoiceControl.setValue(!currentValue); // Toggle the value
        console.log('altInvoice value after toggle:', this.altInvoiceToggle);
      }
    }
  }
  onassociatedtoGlobalaccountChange(field: string) {
    if (field === 'CLM_BUS_MKT_IND') {
      //  this.selectedclaimassociatedtoGlobalaccount =this.recentClaimForm.value.altInvoice;
      this.recentClaimForm.controls.associatedtoGlobalaccount.setValue(
        this.selectedclaimassociatedtoGlobalaccount
      );
      console.log(
        this.recentClaimForm.controls,
        'this.recentClaimForm.controls'
      );
    } else {
      this.recentClaimForm.controls.docType.setValue(this.selectedDocType);
    }
  }

  public getAssociateGlobalAccount() {
    const global_assc_acc = 'CLM_BUS_MKT_IND';
    //  this.store.dispatch(getAssociateGlobalAccountData());
    this.initialClaimService
      .getAssociateGlobalAccount(global_assc_acc)
      .subscribe(
        (data) => {
          // this.store.dispatch(getAssociateGlobalAccountDataSuccess({ data }));
          this.associatedtoGlobalAccountData = data;
          this.selectedclaimassociatedtoGlobalaccount =
            this.associatedtoGlobalAccountData[0]?.lookupId;
          console.log(JSON.stringify(this.associatedtoGlobalAccountData));
          this.recentClaimForm.patchValue({
            associatedtoGlobalaccount:
              this.selectedclaimassociatedtoGlobalaccount,
          });
        },
        (error) => {
          // this.store.dispatch(getAssociateGlobalAccountDataFailure({ error }));
          this.associatedtoGlobalAccountData = error;
        }
      );
  }
  public jobStopped() {
    if (this.recentClaimForm.value.isjobStopped) {
      this.recentClaimForm.patchValue({
        priorityClaim: true,
      });
    }
  }
  public setStoreData: any;
  public handleRowSelection(event: Event) {
    this.setStoreData = [];
    this.setStoreData = event;
    //this.setCustomerDataFromStoreTable(event);
  }

  public resetInvoice() {
        this.recentClaimForm.patchValue({
      docType: '16',
    });
    this.recentClaimForm.patchValue({
      docNumber: '',
    });

    this.recentClaimForm.patchValue({
      docDate: '',
    });
    this.recentClaimForm.patchValue({
      altInvoice: true,
    });
    this.associateAddInvoiceData = [];
    this.altInvoiceToggle = true;
    const modelDiv = document.getElementById('modalWarning');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
  public getDocType() {
    const claim_init_docType = 'CLM_INIT_DOC_TYPE';

    this.store.dispatch(getAssociateGlobalAccountData());
    this.initialClaimService
      .getAssociateGlobalAccount(claim_init_docType)
      .subscribe(
        (data) => {
          this.store.dispatch(getAssociateGlobalAccountDataSuccess({ data }));
          this.docTypeData = data;
          this.selectedDocType = this.docTypeData[0]?.lookupId;
          this.recentClaimForm.patchValue({
            docType: this.selectedDocType,
          });
          console.log(JSON.stringify(this.associatedtoGlobalAccountData));
        },
        (error) => {
          this.store.dispatch(getAssociateGlobalAccountDataFailure({ error }));
          this.docTypeData = error;
        }
      );
  }

  public getInvoiceDataByInvoiceNumber(invoiceNumber: string) {
    return this.addInvoiceData.filter(
      (item) => item.invoiceNumber === invoiceNumber
    );
  }

  public getUniqueOrderNumbersByInvoiceNumber(invoiceNumber: string): string[] {
    const uniqueOrderNumbers: any[] = [];

    // Filter the addInvoiceData to get unique order numbers for the current invoice number
    this.addInvoiceData.forEach((item) => {
      if (
        item.invoiceNumber === invoiceNumber &&
        !uniqueOrderNumbers.includes(item.orderNumber)
      ) {
        uniqueOrderNumbers.push(item.orderNumber);
      }
    });

    return uniqueOrderNumbers;
  }
 
  public deleteRow(index: number): void {
    if (index >= 0 && index < this.associateAddInvoiceData.length) {
      const deletedItem = this.associateAddInvoiceData.splice(index, 1)[0]; // Remove and capture the deleted item
      console.log(deletedItem, 'deleted item');
  
      // Filter the recentassociateAddInvoiceCheckBoxData to remove items with the same invoiceNumber
      this.recentassociateAddInvoiceCheckBoxData = this.recentassociateAddInvoiceCheckBoxData.filter(
        (item:any) => item.invoiceNumber !== deletedItem.invoiceNumber
      );
  
      console.log(this.associateAddInvoiceData); // Log the updated array
      console.log(this.recentassociateAddInvoiceCheckBoxData,'checkboz'); // Log the updated recentassociateAddInvoiceCheckBoxData
    }
  }
  
  
  onSearch() {
    // Check if all search inputs are empty
    if (
      !this.searchText.storeNumber &&
      !this.searchText.primaryCustNumber &&
      !this.searchText.customerNumber &&
      !this.searchText.customerName &&
      !this.searchText.addressLine1 &&
      !this.searchText.city
    ) {
      // Reset the storeListData to the original data
      this.storeListData = [...this.originalStoreListData];
    } else {
      // Apply the filtering logic if search input is not empty
      this.storeListData = this.originalStoreListData.filter((store: any) => {
        return (
          (this.searchText.storeNumber === undefined ||
            store.storeNumber
              .toLowerCase()
              .includes(this.searchText.storeNumber.toLowerCase())) &&
          (this.searchText.primaryCustNumber === undefined ||
            store.primaryCustNumber
              .toLowerCase()
              .includes(this.searchText.primaryCustNumber.toLowerCase())) &&
          (this.searchText.customerNumber === undefined ||
            store.customerNumber
              .toLowerCase()
              .includes(this.searchText.customerNumber.toLowerCase())) &&
          (this.searchText.customerName === undefined ||
            store.customerName
              .toLowerCase()
              .includes(this.searchText.customerName.toLowerCase())) &&
          (this.searchText.addressLine1 === undefined ||
            store.address[0]?.addressLine1
              .toLowerCase()
              .includes(this.searchText.addressLine1.toLowerCase())) &&
          (this.searchText.city === undefined ||
            store.address[0]?.city
              .toLowerCase()
              .includes(this.searchText.city.toLowerCase()))
        );
      });
    }
  }

  // sortColumn(columnName: string): void {
  //   // Toggle sorting direction (asc, desc) for the clicked column
  //   this.columnSortState[columnName] =
  //     this.columnSortState[columnName] === 'asc' ? 'desc' : 'asc';

  //   // Perform the sorting logic here using the updated sorting state
  //   // You will need to sort your data array based on the column and direction
  //   this.storeListData.sort(
  //     (a: { [x: string]: number }, b: { [x: string]: number }) => {
  //       if (this.columnSortState[columnName] === 'asc') {
  //         return a[columnName] < b[columnName] ? -1 : 1;
  //       } else {
  //         return a[columnName] > b[columnName] ? -1 : 1;
  //       }
  //     }
  //   );
  // }
  sortColumn(columnName: string): void {
    // Toggle sorting direction (asc, desc) for the clicked column
    this.columnSortState[columnName] =
    this.columnSortState[columnName] === 'asc' ? 'desc' : 'asc';
  
    // Perform the sorting logic here using the updated sorting state
    // You will need to sort your data array based on the column and direction
    this.storeListData.sort(
           (a: { [x: string]: number }, b: { [x: string]: number }) => {
      const columnA = this.getColumnValue(a, columnName);
      const columnB = this.getColumnValue(b, columnName);
  
      if (this.columnSortState[columnName] === 'asc') {
        return columnA.localeCompare(columnB);
      } else {
        return columnB.localeCompare(columnA);
      }
    });
  }
  
  getColumnValue(item: any, columnName: string): string {
    switch (columnName) {
      case 'storeNumber':
        return item.storeNumber.toString();
      case 'address[0]?.addressLine1':
        return item.address[0]?.addressLine1 || '';
      case 'address[0]?.city':
        return item.address[0]?.city || '';
      case 'address[0]?.stateCode':
        return item.address[0]?.stateCode || '';
      case 'address[0]?.zipCode':
        return item.address[0]?.zipCode || '';
      case 'primaryCustNumber':
        return item.primaryCustNumber.toString();
      case 'customerNumber':
        return item.customerNumber.toString();
      case 'customerName':
        return item.customerName || '';
      default:
        return ''; // Handle other columns as needed
    }
  }
  
  

  toggleRowSelection(selectedStore: any) {
    selectedStore.selected = !selectedStore.selected;
    for (const store of this.storeListData) {
      if (store !== selectedStore) {
        store.selected = false;
      }
      if(store == selectedStore){
       this.setStoreData=selectedStore
      }
    }
    this.storeRowselected = this.storeListData.some(
      (store: { selected: any }) => store.selected
    );
  }

  isColumnSorted(columnName: string, sortOrder: string): boolean {
    return this.columnSortState[columnName] === sortOrder;
  }
  

  get pagedStoreListData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.storeListData.slice(startIndex, endIndex);
  }
  onItemsPerPageChange() {
    this.currentPage = 1; // Reset to the first page when changing items per page
  }
  getDisplayStart() {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  // Get the ending index of the displayed entries
  getDisplayEnd() {
    const endIndex = this.currentPage * this.itemsPerPage;
    return endIndex > this.storeListData.length
      ? this.storeListData.length
      : endIndex;
  }
  onPreviousPageClick() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Function to navigate to the next page
  onNextPageClick() {
    const maxPage = Math.ceil(this.storeListData.length / this.itemsPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
    }
  }
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.storeListData.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  // Function to navigate to a specific page
  onPageNumberClick(page: number) {
    if (page >= 1 && page <= this.getPageNumbers().length) {
      this.currentPage = page;
    }
  }
 
  public CloseCustomerModalWarning() {
    console.log('close this.getCustomerNumber------>',this.getCustomerNumber);
    this.recentClaimForm?.get('customer')?.setValue(this.getCustomerNumber);
    this.getCustomerData(this.getCustomerNumber);
    console.log('calleddd.....')
    const modelDiv = document.getElementById('customerModalWarning');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }
  resetAllFormFields(customerNumber: any) {
        this.getCustomerData(customerNumber);
    this.isContinueInitiationDisabled = false;
    // Get the value of the "customer" field
    const customerValue = this.recentClaimForm?.get('customer')?.value;

   // Reset the form to its default values
   this.recentClaimForm.reset();
   this.initiateaddEndUserForm();
      // Set the "customer" field back to its original value
    this.recentClaimForm?.get('customer')?.setValue(customerValue);
    this.recentClaimForm.patchValue({
      docType: '16',
    });
    this.recentClaimForm.patchValue({
      docNumber: '',
    });

    this.recentClaimForm.patchValue({
      docDate: '',
    });
    this.getClaimCategories();
    this.getAssociateGlobalAccount();
    this.associateAddInvoiceData = [];

    const modelDiv = document.getElementById('customerModalWarning');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
    console.log('After reset4:', this.addEndUserForm.value);
   window.location.reload();
   
}



}
