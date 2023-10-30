import { Component, OnInit } from '@angular/core';
import { BodyClassService } from 'src/app/ngrx/store/services/body-class.service';
import { UserMappingService } from 'src/app/ngrx/store/services/user-mapping.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-user-profile-management',
  templateUrl: './user-profile-management.component.html',
  styleUrls: ['./user-profile-management.component.scss'],
})
export class UserProfileManagementComponent implements OnInit {
  public isSideNavCollapsed: boolean = true;
  public collapsed = false;
  public screenWidth = 0;
  public allUsersData: any = [];
  public userData: any = [];
  public showUserFlag: boolean = false;
  public userInformation: string = '';
  public filterType: any;
  public allUsersItemsPerPage: number = 5; // Default items per page
  public userItemsPerPage: number = 5; // Default items per page
  public allUsersCurrentPage: number = 1;
  public userCurrentPage: number = 1;
  public selectedOption: string = 'default-value';
  public searchText: any = {};
  public originalUsersData: any[] = [];
  emptyUserData: boolean = false;
  columnSortState: { [key: string]: 'asc' | 'desc' } = {};
  columnUserFilterSort: { [key: string]: 'asc' | 'desc' } = {};
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  public userRowselected: boolean = false;
  public setUserData: any;
  public selEditUser: any;
  public selDeleteUser: any;
  public selStatusUser: any;

  constructor(
    private bodyClassService: BodyClassService,
    private userMappingService: UserMappingService
  ) {}

  ngOnInit(): void {
    this.geAllUsersData();
  }

  public onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  public getBodyClass(): string {
    return this.bodyClassService.getBodyClass(
      this.isSideNavCollapsed,
      this.screenWidth
    );
  }
  public openUserModal() {
    const modelDiv = document.getElementById('userModal');
    this.userData = [];
    this.selectedOption = 'default-value';
    this.userInformation = '';
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
    // this.findByUser();
  }

  public closeUserModal() {
    const modelDiv = document.getElementById('userModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  public geAllUsersData() {
    this.userMappingService.getAllUsers(0, 10).subscribe(
      (data: any) => {
        this.allUsersData = data.content;
        this.originalUsersData = [...this.allUsersData];

        console.log('get all users response------>', this.allUsersData);
      },
      (error) => {
        console.log('fetch user details failed: ', error);
      }
    );
  }
 
  public onFilterChange(event: any) {
    console.log('chk fiter value----->', event);
    this.filterType = event.target.value;
  }
  public findByUser() {
    this.userMappingService
      .findByUser(this.filterType, this.userInformation)
      .subscribe(
        (data: any) => {
          this.emptyUserData = false;
          this.userData = data;
          console.log('find users response------>', this.userData);
        },
        (error) => {
          this.userData = [];
          this.emptyUserData = true;
          console.log(
            'fetch find user details failed: ' + JSON.stringify(this.userData)
          );
        }
      );
  }

  sortColumn(columnName: string, isSort: boolean): void {
    if (isSort) {
      // Toggle sorting direction (asc, desc) for the clicked column
      this.columnSortState[columnName] =
        this.columnSortState[columnName] === 'asc' ? 'desc' : 'asc';

      // Perform the sorting logic here using the updated sorting state
      // You will need to sort your data array based on the column and direction
      this.allUsersData.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) => {
          const columnA = this.getColumnValue(a, columnName);
          const columnB = this.getColumnValue(b, columnName);

          if (this.columnSortState[columnName] === 'asc') {
            return columnA.localeCompare(columnB);
          } else {
            return columnB.localeCompare(columnA);
          }
        }
      );
    } else {
      // Toggle sorting direction (asc, desc) for the clicked column
      this.columnUserFilterSort[columnName] =
        this.columnUserFilterSort[columnName] === 'asc' ? 'desc' : 'asc';

      // Perform the sorting logic here using the updated sorting state
      // You will need to sort your data array based on the column and direction
      this.userData.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) => {
          const columnA = this.getUserFilterColumnValue(a, columnName);
          const columnB = this.getUserFilterColumnValue(b, columnName);

          if (this.columnUserFilterSort[columnName] === 'asc') {
            return columnA.localeCompare(columnB);
          } else {
            return columnB.localeCompare(columnA);
          }
        }
      );
    }
  }

  getColumnValue(item: any, columnName: string): string {
    switch (columnName) {
      case 'activeDirectoryId':
        return item.activeDirectoryId.toString();
      case 'firstName':
        return item.firstName.toString();
      case 'middleInitial':
        return item.middleInitial.toString();
      case 'lastName':
        return item.lastName.toString();
      case 'emailAddress':
        return item.emailAddress.toString();
      case 'createdDateTime':
        return item.createdDateTime.toString();
      case 'statusId':
        return item.statusId.toString();
      default:
        return ''; // Handle other columns as needed
    }
  }
  getUserFilterColumnValue(item: any, columnName: string): string {
    switch (columnName) {
      case 'firstName':
        return item.firstName.toString();
      case 'lastName':
        return item.lastName.toString();
      case 'userName':
        return item.userName.toString();
      case 'middleInitial':
        return item.middleInitial.toString();
      case 'emailAddress':
        return item.emailAddress.toString();
      case 'statusId':
        return item.statusId.toString();
      default:
        return ''; // Handle other columns as needed
    }
  }
  isColumnSorted(columnName: string, sortOrder: string): boolean {
    return this.columnSortState[columnName] === sortOrder;
  }
  isUserFilterColumnSorted(columnName: string, sortOrder: string): boolean {
    return this.columnUserFilterSort[columnName] === sortOrder;
  }
  onItemsPerPageChange(itemPerPage: boolean) {
    if (itemPerPage) {
      this.allUsersCurrentPage = 1; // Reset to the first page when changing items per page
    } else {
      this.userCurrentPage = 1; // Reset to the first page when changing items per page
    }
  }
  // getDisplayStart() {
  //   if(){
  //     return (this.allUsersCurrentPage - 1) * this.allUsersItemsPerPage + 1;
  //   }else{
  //     return (this.userCurrentPage - 1) * this.userItemsPerPage + 1;
  //   }
  // }
  get pagedAllUsersListData() {
    const startIndex =
      (this.allUsersCurrentPage - 1) * this.allUsersItemsPerPage;
    const endIndex = startIndex + this.allUsersItemsPerPage;
    return this.allUsersData.slice(startIndex, endIndex);
  }
  get pagedUsersListData() {
    const startIndex = (this.userCurrentPage - 1) * this.userItemsPerPage;
    const endIndex = startIndex + this.userItemsPerPage;
    // console.log('userData---' + this.userData.slice(startIndex, endIndex));
    return this.userData.slice(startIndex, endIndex);
  }
  
  // select only one user
  toggleRowSelection(selectedUser: any) {
    selectedUser.selected = !selectedUser.selected;
    for (const user of this.userData) {
      if (user !== selectedUser) {
        user.selected = false;
      }
      if(user == selectedUser){
       this.setUserData = selectedUser
      }
    }
    this.userRowselected = this.userData.some(
      (user: { selected: any }) => user.selected
    );
    // console.log("Selected User => "+JSON.stringify(this.setUserData));
  }

  // Add user
  addSelectedUser(){
    console.log("Selected User => "+JSON.stringify(this.setUserData));
    this.userMappingService.addUser(this.setUserData).subscribe(
      data => {
        console.log("resp data => "+data);
      }
    )
    const modelDiv = document.getElementById('userModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none'; 
    }
  }

  // Get the ending index of the displayed entries
  // getDisplayEnd() {
  //   const endIndex = this.currentPage * this.itemsPerPage;
  //   return endIndex > this.allUsersData.length
  //     ? this.allUsersData.length
  //     : endIndex;
  // }

  onSearch() {
    // Check if all search inputs are empty
    if (
      !this.searchText.activeDirectoryId &&
      !this.searchText.firstName &&
      !this.searchText.lastName
    ) {
      // Reset the storeListData to the original data
      this.allUsersData = [...this.originalUsersData];
    } else {
      // Apply the filtering logic if search input is not empty
      this.allUsersData = this.originalUsersData.filter((store: any) => {
        return (
          (this.searchText.activeDirectoryId === undefined ||
            store.activeDirectoryId
              .toLowerCase()
              .includes(this.searchText.activeDirectoryId.toLowerCase())) &&
          (this.searchText.firstName === undefined ||
            store.firstName
              .toLowerCase()
              .includes(this.searchText.firstName.toLowerCase())) &&
          (this.searchText.lastName === undefined ||
            store.lastName
              .toLowerCase()
              .includes(this.searchText.lastName.toLowerCase()))
        );
      });
    }
  }
  onPreviousPageClick(preClick: boolean) {
    if (preClick) {
      if (this.allUsersCurrentPage > 1) {
        this.allUsersCurrentPage--;
      }
    } else {
      if (this.userCurrentPage > 1) {
        this.userCurrentPage--;
      }
    }
  }

  // Function to navigate to the next page
  onNextPageClick(nextClick: boolean) {
    if (nextClick) {
      const maxPage = Math.ceil(
        this.allUsersData.length / this.allUsersItemsPerPage
      );
      if (this.allUsersCurrentPage < maxPage) {
        this.allUsersCurrentPage++;
      } else {
        const maxPage = Math.ceil(this.userData.length / this.userItemsPerPage);
        if (this.userCurrentPage < maxPage) {
          this.userCurrentPage++;
        }
      }
    }
  }
  getPageNumbers(pageNo: boolean): number[] {
    if (pageNo) {
      const pageCount = Math.ceil(
        this.allUsersData.length / this.allUsersItemsPerPage
      );
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    } else {
      const pageCount = Math.ceil(this.userData.length / this.userItemsPerPage);
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }
  }

  // Function to navigate to a specific page
  onPageNumberClick(page: number, pageClick: boolean) {
    if (pageClick) {
      if (page >= 1 && page <= this.getPageNumbers(pageClick).length) {
        this.allUsersCurrentPage = page;
      }
    } else {
      if (page >= 1 && page <= this.getPageNumbers(pageClick).length) {
        this.userCurrentPage = page;
      }
    }
  }

  // Delete Model
  openDeleteModal(user: any){
    this.selDeleteUser = user;
  }

  hideModel(modelId: string){
    const delId = document.getElementById(modelId);
    if(delId != null)
      delId.style.visibility = 'hidden';
  }

  confirmDeleteModel(){
    // this.userMappingService.deleteUserById(this.selDeleteUser.userId).subscribe(
    //   data => {
    //     this.hideModel('deleteModal');
    //     this.geAllUsersData();
    //   }
    // )
    // this.hideModel('deleteModal');
    const modelDiv = document.getElementById('deleteModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none'; 
    }
  }

  // Edit Model
  openEditModel(user: any){
    console.log("Selected User => "+JSON.stringify(user));
    this.selEditUser = user;
  }

  confirmEditModel(){

  }

  // Status Model
  openStatusModel(user: any){
    this.selStatusUser = user;
  }

  confirmStatus(){
    this.userMappingService.changeUserStatus(this.selStatusUser.userId, this.selStatusUser.statusId)
    .subscribe(
      data => { console.log( data)}
    )
  }

  cancelStatus(){
    // if(this.selStatusUser.statusId === 1){
      this.allUsersData.forEach( (element: any) => {
        if(element.userId === this.selStatusUser.userId){
          element.statusId = this.selStatusUser.statusId;
        }
      });
    // }
  }

}
