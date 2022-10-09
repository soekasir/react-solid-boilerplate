/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { resolve } from "inversify-react";
import { CounterStore } from "./CounterStore";
import CounterContainer from ".";

@CounterContainer.component
export class CounterButton extends React.Component {
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
