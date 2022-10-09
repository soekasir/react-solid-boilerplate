import { Component } from "react";
import { CounterButton } from "../../modules/Counter/Component";
import CounterModule from "../../modules/Counter";

export default class App extends Component {

  render() {
    return (
      <div>
        from global container: singleton
        <CounterButton/>
        <br/>
        from counter module: transient
        <CounterModule/>
        <br/>
        from global container: singleton
        <CounterButton/>
      </div>
    );
  }
}
