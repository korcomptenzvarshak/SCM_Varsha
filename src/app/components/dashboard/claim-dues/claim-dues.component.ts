import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-claim-dues',
  templateUrl: './claim-dues.component.html',
  styleUrls: ['./claim-dues.component.css']
})
export class ClaimDuesComponent implements OnInit{

  
  @Input() dataList: any;
  
  constructor(){
  }

  ngOnInit(){
    
  }
  

}
