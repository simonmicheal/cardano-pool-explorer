//Base model class
export class ModelBase {

    constructor(dataItem?) {
  
      if (dataItem) {
        for (const property in dataItem) {
          if (dataItem.hasOwnProperty(property)) {
            this[property] = dataItem[property];
          }
        }
      }
    }  
  }