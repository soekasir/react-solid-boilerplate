import { action, observable, makeObservable } from "mobx";
import { injectable } from "inversify";

@injectable()
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

  json(){
    console.log(JSON.parse(JSON.stringify(Object.keys(this))))
  }
}
