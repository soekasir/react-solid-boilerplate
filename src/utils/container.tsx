import { Container } from "inversify";
import { Provider } from "inversify-react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const createContainer = (targets:Function[], container:Container=new Container()) => {

  return class NewContainer extends React.Component<Props> {

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

/** 
 * You can copy bellow code to create module container
 */

/** global container */
const container=new Container();

/** make the class accessible globally */
export const global=(target:Function)=>{
  container.bind(target).toSelf().inSingletonScope();
}

export class GlobalContainer extends React.Component<Props> {
  render() {
    return (
      <Provider container={container}>{this.props.children}</Provider>
    );
  }
}
