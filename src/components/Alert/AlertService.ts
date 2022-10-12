import { AlertColor } from "@mui/material";
import { injectable } from "inversify/lib/annotation/injectable";
import { makeAutoObservable } from "mobx";


@injectable()
export default class AlertService{
  message=""
  type:AlertColor="success"
  open=false;

  constructor(){
    makeAutoObservable(this)
  }

  create(message:string,type:AlertColor="success"){
    this.message=message;
    this.type=type
    this.open=true
  }

  close=(event?: React.SyntheticEvent | Event, reason?: string)=>{
    if (reason === 'clickaway') {
      return;
    }
    this.open=false
  }
}