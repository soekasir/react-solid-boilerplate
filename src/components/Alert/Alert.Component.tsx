import {
  Alert as AlertMui,
  AlertColor,
  Snackbar,
  Typography,
} from "@mui/material";
import AlertService from "./AlertService";
import { resolve } from 'inversify-react';
import { observer } from "mobx-react";
import { Component } from "react";

@observer
export default class Alert extends Component{
  @resolve(AlertService)
  alertService!:AlertService

  render(){
    return (
      <Snackbar
        open={this.alertService.open}
        autoHideDuration={2000}
        onClose={this.alertService.close}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <AlertMui
          onClose={this.alertService.close}
          severity={this.alertService.type as AlertColor}
          sx={{ width: "100%" }}
        >
          <Typography variant="h6">{this.alertService.message}</Typography>
        </AlertMui>
      </Snackbar>
    );
  }
};
