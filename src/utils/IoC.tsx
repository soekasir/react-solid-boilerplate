import { Container } from "inversify";
import { Provider } from "inversify-react";
import React from "react";
import { Props } from "./props";

export const createProvider = (targets:any[], container:Container=new Container()) => {

  return class NewProvider extends React.Component<Props> {

    constructor(props:Props){
      super(props);
      this.bind();
    }

    bind() {
      for (let i = 0; i < targets.length; i++) {
        container.bind(targets[i]).toSelf().inSingletonScope();
      }
    }

    render() {
      return (
        <Provider container={container}>{this.props.children}</Provider>
      );
    }
  }
};

/** global container */
const container=new Container();

/** make a class accessible globally */
export const global=(target:any)=>{
  container.bind(target).toSelf().inSingletonScope();
}

export class GlobalContainer extends React.Component<Props> {
  render() {
    return (
      <Provider container={container}>{this.props.children}</Provider>
    );
  }
}

export const createContainer=(container=new Container())=>{

  let TheComponent=()=>null;

  /** make the class accessible across module */
  const include = (target: any) => {
    container.bind(target).toSelf().inSingletonScope();
  };

  /** connect component with container */
  const component=(Component: any) => {
    TheComponent=Component
  };

  return ({
    component,
    include,
    container,
    Component:()=><Provider container={container}>
    {TheComponent && <TheComponent />}
  </Provider>
  })
}
