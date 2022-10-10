import { Container, interfaces } from "inversify";
import { Provider } from "inversify-react";
import React from "react";
import { Props } from "./props";

type Type = "singleton" | "transient";

type Service = {
  constructor: interfaces.ServiceIdentifier;
  type?: Type;
};

const createProvider = (
  providers: Service[],
  standalone = false,
  container: Container = new Container()
) => {
  return class NewProvider extends React.Component<Props> {
    constructor(props: Props) {
      super(props);
      this.bind();
    }

    bind() {
      for (let i = 0; i < providers.length; i++) {
        if (!providers[i].type || providers[i].type === "singleton") {
          container.bind(providers[i].constructor).toSelf().inSingletonScope();
        }
        if (providers[i].type === "transient") {
          container.bind(providers[i].constructor).toSelf().inTransientScope();
        }
      }
    }

    render() {
      return (
        <Provider container={container} standalone={standalone}>
          {this.props.children}
        </Provider>
      );
    }
  };
};

export const createModule = ({
  providers,
  standalone = false,
  container = new Container(),
  Component,
}: {
  providers: Service[];
  standalone?: boolean;
  container?: Container;
  Component: Function;
}) => {
  const Provider = createProvider(providers, standalone, container);
  return function () {
    return (
      <Provider>
        <Component />
      </Provider>
    );
  };
};

/** global container */
export const GLOBALCONTAINER = new Container();

/** make a class accessible globally as singleton */
export const singleton = (Service: any) => {
  GLOBALCONTAINER.bind(Service).toSelf().inSingletonScope();
};
/** make a class accessible globally as transient */
export const transient = (Service: any) => {
  GLOBALCONTAINER.bind(Service).toSelf().inTransientScope();
};

export class GlobalContainer extends React.Component<Props> {
  render() {
    return (
      <Provider standalone={true} container={GLOBALCONTAINER}>
        {this.props.children}
      </Provider>
    );
  }
}

export const createContainer = (
  container = new Container(),
  standalone = true
) => {
  /** make the class accessible across module */
  const include = (type: Type) => (Service: any) => {
    if (type === "singleton") {
      container.bind(Service).toSelf().inSingletonScope();
    }
    if (type === "transient") {
      container.bind(Service).toSelf().inTransientScope();
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
