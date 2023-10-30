import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges, OnInit {
  @Input() data: any[] = [];
  @Input() headers: string[] = [];
  @Output() onSelectAllData: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() onRowSelectData: EventEmitter<any> = new EventEmitter<any>();
  currentPage: number = 1;
  itemsPerPage: number = 5; // Set default items per page to 5
  searchText: { [key: string]: string } = {};
  sortedColumn: string = '';
  isAscending: boolean = true;
  selectAll: boolean = false;
  filteredData: any[] = [];
  displayedData: any[] = [];
  selectedRows: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.filteredData = this.filterData();
      this.currentPage = 1; // Reset to the first page when the data changes
      this.updateDisplayedData();
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedData();
  }

  onSort(column: string): void {
    if (this.sortedColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedColumn = column;
      this.isAscending = true;
    }
     this.sortData();
    this.updateDisplayedData();
  }

  onSearch(): void {
    this.currentPage = 1;
    this.filteredData = this.filterData();
    this.updateDisplayedData();
  }

  onSelectAll(): void {
    this.selectedRows = this.selectAll ? [...this.filteredData] : [];
    for (const item of this.filteredData) {
      item.selected = this.selectAll;
    }
    this;
    this.onSelectAllData.emit(this.selectedRows);
  }

  // onRowSelect(item: any): void {
  //   item.selected = !item.selected;
  //   if (item.selected) {
  //     this.selectedRows.push(item);
  //   } else {
  //     const index = this.selectedRows.indexOf(item);
  //     if (index !== -1) {
    //       this.selectedRows.splice(index, 1);
  //     }
  //   }
  //   this.selectAll = this.selectedRows.length === this.filteredData.length;
  //   this.onSelectRowData.emit(item);
  // }

  // onRowSelect(item: any): void {
  //   item.selected = !item.selected;
  //   this.selectedRows.forEach( item => item.selected=false)
  //   this.selectedRows=[]
  //   if (item.selected) {
  //     this.selectedRows.push(item);
  //     console.log(this.selectedRows)
  //   } else {
  //     const index = this.selectedRows.indexOf(item);
  //     if (index !== -1) {
  //       this.selectedRows.splice(index, 1);
  //     }
  //   }

  //   this.selectAll = this.selectedRows.length === this.filteredData.length;
  //   // Trigger the onRowSelectData event and pass the selected row data
  //   this.onRowSelectData.emit(this.selectedRows);
  // }

  onRowSelect(item: any): void {
    item.selected = !item.selected;
  
    if (item.selected) {
      this.selectedRows=[]
      this.selectedRows.push(item);
    } else {
      const index = this.selectedRows.indexOf(item);
      if (index !== -1) {
        this.selectedRows.splice(index, 1);
      }
    }
  
    // Trigger the onRowSelectData event and pass the selected row data
    this.onRowSelectData.emit(this.selectedRows);
  }
  
  

  // isSelected(item: any): boolean {
  //   return item.selected === true;
  // }

  isSelected(item: any): boolean {
    return this.selectedRows.includes(item);
  }
  

  private updateDisplayedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedData = this.filteredData.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  private filterData(): any[] {
    return this.data.filter((item: any) => {
      for (const header of this.headers) {
        const searchValue = this.searchText[header]?.toLowerCase();
        const itemValue = item[header]?.toString().toLowerCase();
        if (searchValue && itemValue && !itemValue.includes(searchValue)) {
          return false;
        }
      }
      return true;
    });
  }

  private sortData(): void {
    if (this.sortedColumn) {
      const compareFn = (a: any, b: any) => {
        const valueA = a[this.sortedColumn].toString().toLowerCase();
        const valueB = b[this.sortedColumn].toString().toLowerCase();
        return this.isAscending
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      };
      this.filteredData.sort(compareFn);
    }
  }

  // New pagination methods:
  getPages(): number[] {
    const totalPageCount = Math.ceil(
      this.filteredData.length / this.itemsPerPage
    );
    return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.itemsPerPage;
    return Math.min(endIndex, this.filteredData.length);
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updateDisplayedData();
  }

  
  ngOnInit(): void {
    this.filteredData = this.filterData();
    this.updateDisplayedData();
    this.selectedRows = []; // Initialize the array for selected rows
  }
  
}
