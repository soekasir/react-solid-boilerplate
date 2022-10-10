import { injectable, } from "inversify";
import { action, makeObservable, observable } from "mobx";
import { ActivityDto, CreateActivity } from "./Activity.Dto";
import { ActivityServiceApi } from "./Activity.Service";

const createActivityStoreClass=(activityService: ActivityServiceApi)=>{

  @injectable()
  class ActivityStore{
    public all?:ActivityDto[];
    public activityService=activityService
  
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

  return ActivityStore
}

export class ActivityStore extends createActivityStoreClass(new ActivityServiceApi()){}

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