import { Container } from "inversify";
import { Provider } from "inversify-react";
import React from "react";
import { Props } from "./props";

type Type="singleton"|"transient";

type Target={
  constructor:Function,
  type:Type
}

export const createProvider = (
  targets: Target[],
  standalone=true,
  container: Container = new Container(),
) => {
  return class NewProvider extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
      this.bind();
    }

    bind() {
      for (let i = 0; i < targets.length; i++) {
        if(targets[i].type==="singleton"){
          container.bind(targets[i].constructor).toSelf().inSingletonScope();
        }
        if(targets[i].type==="transient"){
          container.bind(targets[i].constructor).toSelf().inTransientScope();
        }
      }
    }

    render() {
      return <Provider container={container} standalone={standalone}>{this.props.children}</Provider>;
    }
  };
};

/** global container */
const container = new Container();

/** make a class accessible globally */
export const singleton = (target: any) => {
  container.bind(target).toSelf().inSingletonScope();
};

export const transient = (target: any) => {
  container.bind(target).toSelf().inTransientScope();
};

export class GlobalContainer extends React.Component<Props> {
  render() {
    return <Provider standalone={true} container={container}>{this.props.children}</Provider>;
  }
}

export const createContainer = (container = new Container(),standalone=true) => {
  /** make the class accessible across module */
  const include =(type: Type)=> (target: any) => {
    if(type==="singleton"){
      container.bind(target).toSelf().inSingletonScope();
    }
    if(type==="transient"){
      container.bind(target).toSelf().inTransientScope();
    }
  };

  /** connect component with container */
  const connect = (Component: any) => () => {
    return (
      <Provider container={container} standalone={standalone}>
        <Component />
      </Provider>
    );
  };

  return {
    connect,
    include,
    container,
  };
};
