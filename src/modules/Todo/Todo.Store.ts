import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import { ActivityDto } from "../Activity/Activity.Dto";
import { ActivityServiceApi } from "../Activity/Activity.Service";
import { CreateTodoDto, TodoDto } from "./Todo.Dto";
import { TodoServiceApi } from "./Todo.Service";

export enum SortType {
  Newest = "newest",
  Oldest = "oldest",
  AZ = "az",
  ZA = "za",
  Unfinished = "unfinished",
}

@injectable()
export class TodoStore {
  @inject(TodoServiceApi)
  private todoServiceApi!: TodoServiceApi
  @inject(ActivityServiceApi)
  private activityServiceAPi!:ActivityServiceApi
  
  public datas?: TodoDto[];
  public activity?: ActivityDto;

  constructor() {
    makeObservable(this, {
      datas: observable,
      delete: action,
      load: action,
      create: action,
      check: action,
      activity: observable
    });
  }

  load(activityId: number | string) {
    this.todoServiceApi.getAll(activityId).then((res) => {
      this.datas = res;
    });
    this.activityServiceAPi.get(activityId).then((res)=>{
      this.activity=res
    })
  }

  create(data: CreateTodoDto) {
    return this.todoServiceApi.create(data).then((res)=>{
      this.datas?.unshift(res);
      return res;
    })
  }

  delete(id: number) {
    return this.todoServiceApi.delete(id)
  }

  update(id: number, data: any) {}

  sort(sortType: SortType) {
    this.datas?.sort((a, b) => {
      if (sortType === SortType.Newest) return a.id > b.id ? -1 : 1;
      if (sortType === SortType.Oldest) return a.id < b.id ? -1 : 1;
      if (sortType === SortType.AZ) return a.title < b.title ? -1 : 1;
      if (sortType === SortType.ZA) return a.title > b.title ? -1 : 1;
      if (sortType === SortType.Unfinished) return a.is_active === 1 ? -1 : 0;
      return 0;
    });
  }

  check(id: number, is_active: boolean, index: number) {
    this.todoServiceApi.update(id, { is_active: !is_active }).then(() => {
      if (this.datas) {
        this.datas[index].is_active = !is_active ? 1 : 0;
      }
    });
  }

  get all(){
    if(this.datas){
      return JSON.parse(JSON.stringify(this.datas)) as TodoDto[]
    }
    return []
  }
}
