import { Component } from 'react'
import { Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Sticky } from "../../components/Sticky";
import ModalAddActivity from "./components/ModalAddActivity";
import emptyPng from'./icons/empty.png';
import { AlertDelete } from "./components/AlertDelete";
import ActivityStore from "./Store";
import { resolve } from 'inversify-react';
import { observer } from 'mobx-react';
import AlertService from '../../components/Alert/AlertService';
import ActivityItem from './components/ActivityItem';

type ActivityComponentState={
  isModalAddOpen:boolean,
  deleteId?:number
}

@observer
export default class ActivityComponent extends Component<{},ActivityComponentState> {
  @resolve(ActivityStore)
  private readonly store!:ActivityStore;
  @resolve(AlertService)
  private readonly alert!: AlertService;

  constructor(props:{}){
    super(props)
    this.state={
      isModalAddOpen:false,
      deleteId:undefined
    }
  }

  handleDelete=()=>{
    if(this.state.deleteId){
      this.store.delete(this.state.deleteId)
      .then(()=>{
        this.alert.create("berhasil menghapus activity")
      }).catch(()=>{
        this.alert.create("gagal menghapus activity","error")
      })
      .finally(()=>{
        this.setState({deleteId:undefined})
      });
    }
  }

  render() {
    return (
      <>
        <ModalAddActivity
          open={this.state.isModalAddOpen}
          onClose={() => this.setState({isModalAddOpen: false})}
          afterSubmit={() => {
            this.setState({isModalAddOpen: false})
          }}
        />
        <AlertDelete
          open={!!this.state.deleteId}
          onClose={() => {this.setState({deleteId: undefined})}}
          message={
            <>
              apakah anda yakin menghapus activity ?
            </>
          }
          onOk={this.handleDelete}
        />
        <Sticky>
          <Grid
            container
            justifyContent="space-between"
            p={1}
            style={{ backgroundColor: "#F4F4F4" }}
          >
            <Grid item data-cy="activity-title">
              <Typography color="#111111" variant="h3">
                Activity
              </Typography>
            </Grid>
            <Grid item>
              <Button
                data-cy="activity-add-button"
                color="primary"
                variant="contained"
                sx={{ borderRadius: 45, boxShadow: "none" }}
                startIcon={<AddIcon />}
                onClick={() => this.setState({isModalAddOpen: true})}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Sticky>
        <Grid container gap={3} mt="40px">
          {
            !!this.store.all && this.store.all.map((data) => {
              return (
                <ActivityItem
                  key={data.id}
                  data={data}
                  onDelete={()=>{
                    this.setState({deleteId: data.id})
                  }}
                />
              );
            })
          }
          {
            !this.store.all  && 
            <div data-cy="activity-empty-state">
              <img alt="empty activity" src={emptyPng}></img>
            </div>
          }
        </Grid>
      </>
    )
  }
}
