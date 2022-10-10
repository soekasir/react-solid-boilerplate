import axios from "axios";
import { injectable } from "inversify";
import { ActivityDto, CreateActivity } from "./Activity.Dto";

const URL_API=process.env.REACT_APP_TODO_API
const EMAIL_ACCOUNT_API=process.env.REACT_APP_EMAIL_TODO

@injectable()
export class ActivityServiceApi {
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