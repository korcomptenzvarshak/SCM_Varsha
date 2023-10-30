import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-od-items',
  templateUrl: './od-items.component.html',
  styleUrls: ['./od-items.component.css']
})
export class OdItemsComponent {

  @Input() overdueList: any;


}
