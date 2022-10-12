import React from "react";
import TodoAppLayout from "../../components/Layouts/TodoApp.Layout";
import { TodoComponent } from "../../modules/Todo/Todo.Component";

export default class TodoList extends React.Component {
  render() {
    return (
      <TodoAppLayout>
        <TodoComponent/>
      </TodoAppLayout>
    );
  }
}
