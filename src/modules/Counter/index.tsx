import React from "react";
import { resolve } from "inversify-react";
import { CounterStore } from "./store";
import { observer } from "mobx-react";

@observer
class CounterValue extends React.Component {
  @resolve(CounterStore)
  counter!: CounterStore;

  render() {
    console.log("value render");
    return <div>count: {this.counter.count}</div>;
  }
}

class CounterButton extends React.Component {
  @resolve(CounterStore)
  counter!: CounterStore;

  render() {
    console.log("button render");
    return (
      <div>
        <button onClick={() => this.counter.increase()}>+</button>
        <button onClick={() => this.counter.decrease()}>-</button>
      </div>
    );
  }
}

export default class Counter extends React.Component {
  render() {
    return (
      <div>        
        <CounterValue />
        <CounterButton />
      </div>
    )
  }
}