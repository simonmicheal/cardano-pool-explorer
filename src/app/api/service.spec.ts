import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PoolMetaModel, PoolModel } from '../models/pool-model';
import { ExplorerService } from './services';

describe('ExplorerService', () => {
    let service: ExplorerService; // Add this
    let pools : Array<PoolModel>;
    let meta : PoolMetaModel;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [ExplorerService,HttpClient]
        });

        pools = new  Array<PoolModel>();
        pools.push({ poolId:'pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt',poolMeta:null});
        pools.push({ poolId:'pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy',poolMeta:null});

        meta = new PoolMetaModel();
        meta.description = '';
        meta.hash = '';
        meta.homepage = '';
        meta.name = 'OctasPool';
        meta.pool_id ='pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt';
        meta.ticker = null;
        meta.url = '';

        service = TestBed.get(ExplorerService,HttpClient); // Add this
    });

    it('should be created', () => { // Remove inject()
        expect(service).toBeTruthy();
    });

    // Add tests for all() method
    describe('get pools', () => {
        it('should return a collection of pools', () => {

            let response;
            spyOn(service, 'getPools').and.returnValue(of(pools));

            service.getPools(1).subscribe(res => {
                response = res;
            });

            expect(response).toEqual(pools);
        });
    });

    describe('getPool', () => {
        it('should return a single user', () => {

          let response;
          spyOn(service, 'getPool').and.returnValue(of(meta));
      
          service.getPool(pools[0]).subscribe(res => {
            response = res;
          });
      
          expect(response.pool_id).toEqual(meta.pool_id);
        });
      });
});