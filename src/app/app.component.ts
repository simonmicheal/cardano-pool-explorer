import { Component, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { NetworkService } from './api/network-service';
import { ExplorerService } from './api/services';
import { INetwork } from './models/network-data.model';
import { PoolModel } from './models/pool-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //Collection of pools
  pools: PoolModel[] = [];

  //Collection of network network information
  network: INetwork;

  isCollapsed = false;

  isBusy: boolean;
  isPanelBusy: boolean;

  pageSize: number = 10;
  page: number = 1;

  openById = {};

  @ViewChild('accordion') accordion: NgbAccordion;

  $destroy = new Subject();

  constructor(private svc: ExplorerService, private svcNetwork: NetworkService) { }

  ngOnInit(): void {

    //Get network information
    this.NetworkService();

    //Get pools passing true to reset
    this.GetPools(true);
  }

  private NetworkService() {

    this.isBusy = true;

    //Subscription for retreiving pool data
    this.svcNetwork.getNetworkInformation().pipe(
      takeUntil(this.$destroy),
      finalize(() => { this.isBusy = false; })
    ).subscribe((e: INetwork) => {
      //store the network information in memory
      this.network = e;
    });
  }


  //Return the epoch countdown 
  epochEndIns() {
    if (this.network){
      debugger;
      let epoch = new Date(this.network.data.cardano.currentEpoch.startedAt).getTime() + 5 * 24 * 60 * 60 * 1000;
      return epoch
    }
  }

  private GetPools(reset: boolean) {

    if (reset)
      this.page = 1;

    this.isBusy = true;

    //Subscription for retreiving pool data
    this.svc.getPools(this.page).pipe(
      takeUntil(this.$destroy),
      finalize(() => { this.isBusy = false; })
    ).subscribe((e: PoolModel[]) => {

      //store the pools in memory
      this.pools = e;

    });
  }

  //loop over the pools passing the pool id 
  //get the metadata of the pool
  getPool(poolId: string) {

    this.isPanelBusy = true;

    let pool = this.pools.find((e) => e.poolId == poolId);

    this.svc.getPool(pool).pipe(
      takeUntil(this.$destroy),
      finalize(() => { this.isPanelBusy = false; })
    ).subscribe((e) => {
      pool.poolMeta = e;
    });
  }

  accordianClick(event) {
    //Add pool-id to array and note open or close
    this.openById[event.panelId] = event.nextState;

    if (event.nextState)
      this.getPool(event.panelId);

  }

  //Page changed event
  onPageChanged(pageNumber: number) {
    this.page = pageNumber;
  }

  //Clean up subscriptions
  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }
}
