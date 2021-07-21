import { ModelBase } from "./model-base";

export class PoolModel extends ModelBase {

  constructor(s?: any) {
    super(s);

    if (s) {
      this.poolId = s;
      this.poolMeta = new PoolMetaModel();
    }
  }

  poolId: string;
  poolMeta: PoolMetaModel;
}

export class PoolMetaModel extends ModelBase {

  constructor(s?: any) {
    super(s);
  }

  description: string;
  hash: string;
  hex: string;
  homepage: string
  name: string;
  pool_id: string;
  ticker: null
  url: string;

}


