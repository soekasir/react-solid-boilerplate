import { injectable } from "inversify";
import BaseApi from "../Base/BaseApi";
import { CreateTodoDto, TodoDto } from "./Todo.Dto";

@injectable()
export class TodoServiceApi extends BaseApi {

  async getAll(activityId: number | string) {
    const res = await this.request.get("todo-items?activity_group_id=" + activityId);
    return res.data.data as TodoDto[];
  }

  delete(id: number) {
    return this.request.delete("todo-items/" + id);
  }

  async create(data: CreateTodoDto) {
    const res = await this.request.post("todo-items/", data);
    return res.data as TodoDto;
  }

  update(id: number, data: any) {
    return this.request.patch("todo-items/" + id, data);
  }

}
