import { inject, injectable, } from "inversify";
import axios from "axios";
import { action, makeObservable, observable } from "mobx";

export enum Priority{
  VeryHigh="very-high",
  High="high",
  Medium="medium",
  Low="low",
  VeryLow="very-low",
}

export interface CreateActivity {
  title: string,
}

export interface ActivityDto extends CreateActivity {
  id: number,
  created_at: string,
}

export interface CreateTodoDto{
  activity_group_id : number,
  title : string,
  priority : Priority,
}

export interface TodoDto extends CreateTodoDto{
  id : number,
  is_active : number,
  created_at : string,
}

/** Item Todo */
// export function apiGetAllToDo(id:number|string){
//   return axios.get(URL_API+'todo-items?activity_group_id='+id).then((res)=>res.data.data as TodoDto[]) 
// }


// export function apiDeleteItem(id:number,){
//   return axios.delete(URL_API+'todo-items/'+id)
// }

// export function apiCreateItem(data:CreateTodoDto){
//   return axios.post(URL_API+'todo-items/',data)
// }

// export function apiUpdateItem(id:number,data:any){
//   return axios.patch(URL_API+'todo-items/'+id,data)
// }

const URL_API=process.env.REACT_APP_TODO_API
const EMAIL_ACCOUNT_API="sasageyo@mail.com"

@injectable()
export class ActivityService {
  async getAll(){
    const res = await axios.get(URL_API + 'activity-groups/?email=' + EMAIL_ACCOUNT_API);
    return res.data.data as ActivityDto[]; 
  }
  async get(id:number|string){
    const res = await axios.get(URL_API + 'activity-groups/' + id);
    return res.data as ActivityDto; 
  }
  async delete(id:number){
    return axios.delete(URL_API+'activity-groups/'+id).then((res)=>res.data)
  }
  async create(data:CreateActivity){
    const addedEmail={...data,email:EMAIL_ACCOUNT_API}
    const res = await axios.post(URL_API + 'activity-groups', addedEmail);
    return res.data as ActivityDto; 
  }
};

@injectable()
export default class ActivityStore{
  public all?:ActivityDto[];
  @inject(ActivityService)
  public activityService!: ActivityService

  constructor(){
    makeObservable(this,{
      all: observable,
      delete: action,
      load: action,
      create: action,
    })
    this.load();
  }

  load(){
    this.activityService.getAll().then((data)=>{
      this.all=data;
    })
  }

  async create(data:CreateActivity){
    return await this.activityService.create(data).then((res)=>{
      this.all?.unshift(res)
      return res;
    });
  }


  async delete(id:number){
    return await this.activityService.delete(id).then((res)=>{
      this.all = this.all?.filter((item) => item.id !== id);
      return res
    });
  }
}
