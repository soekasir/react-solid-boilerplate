import { injectable, inject } from "inversify";
import { action, makeObservable, observable } from "mobx";
import { ActivityDto, CreateActivityDto } from "./Activity.Dto";
import { ActivityServiceApi } from "./Activity.Service";

@injectable()
export class ActivityStore {
  datas?: ActivityDto[];
  @inject(ActivityServiceApi)
  activityService!:ActivityServiceApi;

  constructor() {
    makeObservable(this, {
      datas: observable,
      delete: action,
      load: action,
      create: action,
      activityService: observable
    });
  }

  load() {
    this.activityService.getAll().then((data) => {
      this.datas = data;
    });
  }

  async create(data: CreateActivityDto) {
    return await this.activityService.create(data).then((res) => {
      this.datas?.unshift(res);
      return res;
    });
  }

  async delete(id: number) {
    return await this.activityService.delete(id).then((res) => {
      this.datas = this.datas?.filter((item) => item.id !== id);
      return res;
    });
  }

  get all(){
    if(this.datas){
      return JSON.parse(JSON.stringify(this.datas)) as ActivityDto[]
    }
    return []
  }
}
