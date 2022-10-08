import { Container } from "inversify";
import { Provider } from "inversify-react";
import React from "react";
import {CounterStore} from "./modules/Counter/store";

interface Props {
  children: React.ReactNode;
}

export default class AppContainer extends React.Component<Props> {
  private readonly container = new Container();

  constructor(props: Props) {
    super(props);
    this.bind()
  }
  
  bind(){
    const { container } = this;
    container.bind(CounterStore).toSelf().inSingletonScope()
  }

  render() {
    return (
      <Provider container={this.container}>{this.props.children}</Provider>
    );
  }
}
