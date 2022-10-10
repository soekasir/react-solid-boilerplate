import React from "react";
import TodoAppLayout from "../../components/Layouts/TodoAppLayout";
import ActivityModule from "../../modules/Activity/Module";

export default class App extends React.Component {
  render() {
    return (
      <TodoAppLayout>
        <ActivityModule/>
      </TodoAppLayout>
    );
  }
}
