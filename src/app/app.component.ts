import { Component, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ExplorerService } from './api/services';
import { PoolModel } from './models/pool-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pools: PoolModel[];
  isCollapsed = false;

  pageSize: number = 15;
  page: number = 1;

  openById = {};

  @ViewChild('accordion') accordion: NgbAccordion;

  $destroy = new Subject();

  constructor(private svc: ExplorerService) { }

  ngOnInit(): void {

    //Subscription for retreiving pool data
    this.svc.getPools(this.page).subscribe((e: PoolModel[]) => {

      //store the pools in memory
      this.pools = e;

      //loop over the pools passing the pool id 
      //get the metadata of the pool
      this.pools.forEach((p) => {
        this.svc.getPool(p).subscribe((e) => {
          p.poolMeta = e;
        })
      })
    })
  }

  accordianClick(event) {
    //Add pool-id to array and note open or close
    this.openById[event.panelId] = event.nextState;
  }

  //Clean up subscriptions
  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }
}
