import React from "react";
import { resolve } from "inversify-react";
import { CounterStore } from "./store";
import { observer } from "mobx-react";

@observer
class Counter extends React.Component {
  @resolve(CounterStore)
  counter!: CounterStore;

  render() {
    return (
      <div>
        count: {this.counter.count}
        <button onClick={() => this.counter.increase()}>+</button>
        <button onClick={() => this.counter.decrease()}>-</button>
        <button onClick={() => this.counter.json()}>json</button>
      </div>
    );
  }
}

export default Counter
