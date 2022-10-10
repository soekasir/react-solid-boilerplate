import { Alert as AlertMui, AlertColor, Snackbar, Typography } from "@mui/material";
import { resolve } from "inversify-react";
import { observer } from "mobx-react";
import { Component } from 'react'
import AlertService from "./AlertService";

@observer
export default class Alert extends Component {
  @resolve(AlertService)
  alert!: AlertService;

  render() {
    return (
      <Snackbar open={this.alert.open} autoHideDuration={2000} onClose={this.alert.close} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <AlertMui onClose={this.alert.close} severity={this.alert.type as AlertColor } sx={{ width: '100%' }}>
        <Typography variant="h6">
          {this.alert.message}
        </Typography>
      </AlertMui>
    </Snackbar>
    )
  }
}
