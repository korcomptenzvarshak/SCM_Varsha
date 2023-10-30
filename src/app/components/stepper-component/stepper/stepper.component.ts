import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { Observable, debounceTime, fromEvent } from 'rxjs';
import { ClaimCategoryDetails } from 'src/app/interfaces/customer.model';
import { PermissionResponse } from 'src/app/interfaces/roles-permission.model';
import { userMappingFindAllusersDetails } from 'src/app/interfaces/user-mapping.model';
import { RolesService } from 'src/app/ngrx/store/services/roles.service';
import { UserMappingService } from 'src/app/ngrx/store/services/user-mapping.service';
import { GenericValidator } from 'src/app/utils/generic-validator';
import {MatStepper} from '@angular/material/stepper';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, AfterViewInit{
  private ngVersion: string = VERSION.full;
  completed: boolean = false;
  state!: string;
  @ViewChild('stepper') 
  private myStepper!: MatStepper;
  totalStepsCount!: number;
  public rolesForm!: FormGroup;
  public permissionForm!: FormGroup;
  public userForm!: FormGroup;
  public displayMessage: { [key: string]: string } = {};
  public formInputElements!: ElementRef[];
  private genericValidator!: GenericValidator;
  public permissionsList: PermissionResponse[] = [];
  public usersList: any = [];
  public selectedPermissions: { [key: string]: boolean } = {};
  public expandedPermissions: { [key: number]: boolean } = {};
  public selectedUser: { [key: string]: boolean } = {};
  public expandedUsers: { [key: number]: boolean } = {};
  public selPermList: any = [];
  public selUserList: any = [];

  public saveForm!: FormGroup;
  constructor(
    private form: FormBuilder,
    private rolesService: RolesService,
    private userService: UserMappingService,
    
  ) { }

  ngOnInit(): void {
    this.genericValidator = new GenericValidator();
    this.rolesForm = this.form.group({
      roleCode: ['', Validators.required],
      roleDescription: ['']
    });

    this.permissionForm = this.form.group({
      userPermission: ['', Validators.required]
    });

    this.userForm = this.form.group({
      selectedUser: ['']
    });

    this.getPermissionsList();
    this.getUsersList();
  }
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  getPermissionsList(){
    this.rolesService.getApplicationPermissions().subscribe(data => {
        this.permissionsList = data;
      });
    console.log(JSON.stringify(this.permissionsList));
  }

  getUsersList(){
    this.userService.getAllUsers(0,10).subscribe( 
      (data: any) => {
        this.usersList = data.content;
    });
  }

  toggleObjectExpansion(permissionId: number) {
    this.expandedPermissions[permissionId] = !this.expandedPermissions[permissionId];
  }

  selectAll(permissionId: number, index: number) {
    this.selectedPermissions[permissionId] = !this.selectedPermissions[permissionId];
    
    for(let permission of this.permissionsList){
      if(permission.permissionId == permissionId){
        if(this.selectedPermissions[permissionId]){
          this.selPermList.push(permission);
        } else {
          this.selPermList.splice(index, 1);
        }
      }
    }
  }

  selectAllUsers(userId: number, index: number){
    this.selectedUser[userId] = !this.selectedUser[userId];

    for(let user of this.usersList){
      if(user.userId == userId){
        if(this.selectedUser[userId]){
          this.selUserList.push(user);
        } else {
          this.selUserList.splice(index, 1);
        }
      }
    }
  }

  addSaveForm(){
    this.saveForm = this.form.group({
      createdByUserId: [0],
      modifiedByUserId: [0],
      createdDateTime: [""],
      modifiedDateTime: [""],
      roleId: [0],
      roleCode: [0],
      roleDescription: [""],
      statusId: 0,
      users: this.form.array(this.selUserList.map((p: any) => this.form.group(p))),
      permissions: this.form.array(this.selPermList.map((u: any) => this.form.group(u)))
    });
    
    this.saveForm.patchValue({
      roleId: this.rolesForm.value.roleCode,
      roleDescription: this.rolesForm.value.roleDescription,
      // permissions: this.selPermList,
      // users: this.selUserList
    });
  }

  saveDetailsForm(){
    this.addSaveForm();
    console.log(JSON.stringify(this.saveForm.value));
    this.rolesService.addRole(this.saveForm.value).subscribe( data => {

    })
  }
  

  goBack() {
    this.myStepper.previous();
  }
  goForward(stepper: MatStepper) {
    this.myStepper.next();
  }
  goConfirm() {
    //this.myStepper.reset();
    this.completed = true;
    this.state = 'done';
     console.log(this.rolesForm.valid);
    console.log(this.permissionForm.valid);
  }
}
