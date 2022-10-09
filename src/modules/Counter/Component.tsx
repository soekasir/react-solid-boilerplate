/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { resolve } from "inversify-react";
import { CounterStore } from "./CounterStore";
import { observer } from "mobx-react";

@observer
export class CounterButton extends React.Component {
  @resolve(CounterStore)
  counter!: CounterStore;

  render() {
    console.log("button render");
    return (
      <div>
          counter: {this.counter.count}
        <button onClick={() => this.counter.increase()}>+</button>
        <button onClick={() => this.counter.decrease()}>-</button>
      </div>
    );
  }
}
