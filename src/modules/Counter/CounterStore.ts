import { action, observable, makeObservable } from "mobx";
import { injectable } from "inversify";
import { singleton } from "../../utils/IoC";

@injectable()
@singleton //add to global container as singleton
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
