import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RecClaimsService } from '../../../mockApis/rec-claims.service';
import { RecentClaimsModel } from '../../../interfaces/rec-claims.model';
import { NgbdSortableHeader, SortColumn, SortDirection, SortEvent } from './sortable.directive';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-rec-claims',
  standalone: true,
  imports: [
		NgFor,
		DecimalPipe,
		FormsModule,
		AsyncPipe,
		NgbTypeaheadModule,
		NgbdSortableHeader,
		NgbPaginationModule,
		NgIf,
	],
  templateUrl: './rec-claims.component.html',
  styleUrls: ['./rec-claims.component.scss'],
  providers: [RecClaimsService, DecimalPipe],
})
export class RecClaimsComponent {

	static recentClaimsList = [
		{days:1, claimId: "314",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:10, claimId: "887",name: "John", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:31, claimId: "765",name: "raj", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:90, claimId: "654",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:91, claimId: "433",name: "sis", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:12, claimId: "900",name: "Siva", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:44, claimId: "966",name: "John", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:32, claimId: "877",name: "raj", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:88, claimId: "766",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:1, claimId: "314",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:10, claimId: "887",name: "John", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:31, claimId: "765",name: "raj", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:90, claimId: "654",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:91, claimId: "433",name: "sis", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:12, claimId: "900",name: "Siva", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:44, claimId: "966",name: "John", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:32, claimId: "877",name: "raj", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:88, claimId: "766",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:1, claimId: "314",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:10, claimId: "887",name: "John", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:31, claimId: "765",name: "raj", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:90, claimId: "654",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:91, claimId: "433",name: "sis", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:12, claimId: "900",name: "Siva", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:44, claimId: "966",name: "John", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:32, claimId: "877",name: "raj", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:88, claimId: "766",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:1, claimId: "314",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:10, claimId: "887",name: "John", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:31, claimId: "765",name: "raj", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:90, claimId: "654",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:91, claimId: "433",name: "sis", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:12, claimId: "900",name: "Siva", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:44, claimId: "966",name: "John", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:32, claimId: "877",name: "raj", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
		{days:88, claimId: "766",name: "Dedering’s Diamond Floor", amount:123, reason:"Ipsum", customer: "Satr Hosp"},
	  ]

  recentClaimArray$: Observable<RecentClaimsModel[]>;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

	constructor(public service: RecClaimsService) {
		//service.postData(this.recClaimData)
		this.recentClaimArray$ = service.recentClaims$;
		this.total$ = service.total$;
}

	element!: HTMLElement;
	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;

		this.headerSortTogge(column, direction)

		
	}

	headerSortTogge(column : string, direction : string){

		this.element = document.getElementById(column) as HTMLElement;
		if(direction == 'asc'){
			this.element.className = "fas fa-caret-up"
		}else{
			this.element.className = "fas fa-caret-down"
		}

	}
	showResults(){
		console.log("service===",this.service)
		this.service.recentClaims$.subscribe(recentClaimsArrays => {
			const countriesArrayLength = recentClaimsArrays.length;
			console.log(countriesArrayLength);
			this.service.total$.subscribe(value => {
				console.log(value);
				this.service.pageSize = value;

			  });		 
			 });
			 
	}

}
