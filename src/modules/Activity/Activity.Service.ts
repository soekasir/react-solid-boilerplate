import { ActivityDto, CreateActivityDto } from "./Activity.Dto";
import { injectable } from "inversify";
import BaseApi from "../Base/BaseApi";

const EMAIL_ACCOUNT_API=process.env.REACT_APP_EMAIL_TODO

@injectable()
export class ActivityServiceApi extends BaseApi {
  async getAll(){
    const res = await this.request.get('activity-groups/?email=' + EMAIL_ACCOUNT_API);
    return res.data.data as ActivityDto[];
  }
  async get(id:number|string){
    const res = await this.request.get('activity-groups/' + id);
    return res.data as ActivityDto; 
  }
  async delete(id:number){
    return this.request.delete('activity-groups/'+id).then((res)=>res.data)
  }
  async create(data:CreateActivityDto){
    const addedEmail={...data,email:EMAIL_ACCOUNT_API}
    const res = await this.request.post('activity-groups/', addedEmail);
    return res.data as ActivityDto; 
  }
};
