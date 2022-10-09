import { Container } from "inversify";
import { Provider } from "inversify-react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const createContainer = (targets:Function[]) => {

  return class NewContainer extends React.Component<Props> {
    container = new Container();
    constructor(props:Props){
      super(props);
      this.bind();
    }

    bind() {
      for (let i = 0; i < targets.length; i++) {
          this.container.bind(targets[i]).toSelf().inSingletonScope();
      }
    }

    render() {
      return (
        <Provider container={this.container}>{this.props.children}</Provider>
      );
    }
  }
};

const container=new Container();

export const makeGlobal=(target:Function)=>{
  container.bind(target).toSelf().inSingletonScope();
}

export class GlobalContainer extends React.Component<Props> {
  render() {
    return (
      <Provider container={container}>{this.props.children}</Provider>
    );
  }
}
