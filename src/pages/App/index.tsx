import React from "react";
import TodoAppLayout from "../../components/Layouts/TodoApp.Layout";
import ActivityComponent from "../../modules/Activity/Activity.Component";

export default class App extends React.Component {
  render() {
    return (
      <TodoAppLayout>
        <ActivityComponent/>
      </TodoAppLayout>
    );
  }
}
