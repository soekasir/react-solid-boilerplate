import { Component } from "react";
import { resolve } from "inversify-react";
import { CounterStore } from "../../modules/Counter/CounterStore";
import { observer } from "mobx-react";
import { CounterButton } from "../../modules/Counter/Component";

@observer
export default class App extends Component {
  @resolve(CounterStore)
  counter!: CounterStore;

  render() {
    return (
      <div>
        counter from global container: {this.counter.count}
        <CounterButton/>
      </div>
    );
  }
}
