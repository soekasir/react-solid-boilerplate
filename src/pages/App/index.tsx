import React from "react";
import TodoAppLayout from "../../components/Layouts/TodoApp.Layout";
import ActivityModule from "../../modules/Activity/Activity.Module";

export default class App extends React.Component {
  render() {
    return (
      <TodoAppLayout>
        <ActivityModule/>
      </TodoAppLayout>
    );
  }
}
