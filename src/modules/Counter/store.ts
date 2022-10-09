import { action, observable, makeObservable } from "mobx";
import { injectable } from "inversify";
import { global } from "../../utils/container";

@injectable()
@global
export class CounterStore {
  count = 0
  
  constructor(){
    makeObservable(this,{
      count: observable,
      increase: action,
      decrease: action
    })
  }

  increase() {
    this.count++
  }

  decrease() {
    this.count--
  }
}
