export interface INetwork {
  data: Data
}

export interface Data {
  cardano: Cardano
}

export interface Cardano {
  tip: Tip
  currentEpoch: CurrentEpoch
}

export interface Tip {
  number: number
  slotNo: number
}

export interface CurrentEpoch {
  number: number
  startedAt: string
  blocksCount: string
}