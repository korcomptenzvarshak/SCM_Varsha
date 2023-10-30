import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { BodyClassService } from 'src/app/ngrx/store/services/body-class.service';
import { DashboardService } from 'src/app/ngrx/store/services/dashboard.service';
import { TableComponent } from 'src/app/shared/table/table.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild('tableContainer', { read: ViewContainerRef })
  tableContainer!: ViewContainerRef;
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  isSideNavCollapsed: boolean = true;
  public tableHeaders :any[] = [];
  //screenWidth!: number;
  hostName;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private bodyClassService: BodyClassService, dashBoard: DashboardService) {
    this.hostName = dashBoard.hostURL 
  }

 

  inputRespData = {
    claimDuesArray : [
      {label:"47", text:"Total claims in queue"},
      {label:"14", text:"Aged claims in queue "},
      {label:"07", text:"Uninitiated claims"},
      {label:"04", text:"Priority claims"}
    ],
    claimDuesObject:{
      inspec:6,
      pendingRep:3,
      require: 1,
      pendingLab: 19,

    },
    overdueList : [
      {days:31, title: "123456" ,des:"Lorem Ipsum, Lorem Ipsum,Lorem Ipsum, Lorem Ipsum"},
      {days:12, title: "data123", des:"Lorem Ipsum, Lorem Ipsum,Lorem Ipsum, Lorem Ipsum"},
      {days:43, title: "hbsvsbv", des:"Lorem Ipsum, Lorem Ipsum,Lorem Ipsum, Lorem Ipsum"},
      {days:11, title: "hbsvsbv", des:"Lorem Ipsum, Lorem Ipsum,Lorem Ipsum, Lorem Ipsum"},
    ],
    recentClaimsList : [
      {days:54, claimId: "123456",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
      {days:31, claimId: "123456",name: "John", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
      {days:31, claimId: "123456",name: "raj", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
      {days:31, claimId: "123456",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
      {days:31, claimId: "123456",name: "sis", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
      {days:31, claimId: "123456",name: "Siva", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
      {days:31, claimId: "123456",name: "John", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
      {days:31, claimId: "123456",name: "raj", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
      {days:31, claimId: "123456",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
    ],
    upList : [
      {days:31, title: "hb" ,des:"Lorem Ipsum, Lorem Ipsum,Lorem Ipsum, Lorem Ipsum"},
      {days:12, title: "hbsvsbv", des:"Lorem Ipsum, Lorem Ipsum,Lorem Ipsum, Lorem Ipsum"},
      {days:43, title: "hbsvsbv", des:"Lorem Ipsum, Lorem Ipsum,Lorem Ipsum, Lorem Ipsum"},
      {days:11, title: "hbsvsbv", des:"Lorem Ipsum, Lorem Ipsum,Lorem Ipsum, Lorem Ipsum"},
    ]

    }

    onToggleSideNav(data: SideNavToggle): void {
      this.screenWidth = data.screenWidth;
      this.isSideNavCollapsed = data.collapsed;
    }
    getBodyClass(): string {
      return this.bodyClassService.getBodyClass(this.isSideNavCollapsed,this.screenWidth);
    }

    ngAfterViewInit(): void {
      this.tableHeaders = ['','days', 'claimId', 'name', 'amount', 'reason', 'customer'];
      this.callDynamicTable();
    }
  
    callDynamicTable(): void {
     
      // Create an instance of TableComponent using ComponentFactoryResolver
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TableComponent);
      const componentRef = this.tableContainer.createComponent(componentFactory);
  
      // Set the input properties (data and headers) of the dynamic TableComponent
      const dynamicTableComponent = componentRef.instance as TableComponent;
      dynamicTableComponent.data = this.inputRespData.recentClaimsList;
      dynamicTableComponent.headers = this.tableHeaders;
    }
}
