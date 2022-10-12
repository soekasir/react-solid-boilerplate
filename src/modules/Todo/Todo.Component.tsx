/* eslint-disable react-hooks/exhaustive-deps */
import { Component } from "react";
import { Sticky } from "../../components/Sticky";
import { getParameterByName } from "../../hooks";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Checkbox,
  Popover,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import {
  ISortAZ,
  ISortNewest,
  ISortOldest,
  ISortUnfinished,
  ISortZA,
  SortIcon,
} from "./icons";
import { Priority } from "./Todo.Dto";
import { AlertDelete } from "../Activity/components/AlertDelete";
import { IDelete } from "../Activity/icons";
import { SortType, TodoStore } from "./Todo.Store";
import { observer } from "mobx-react";
import { resolve } from 'inversify-react';
import AlertService from "../../components/Alert/AlertService";

type TPriorityColor = {
  [key: string]: string;
};

const PriorityColor: TPriorityColor = {
  "very-high": "#ED4C5C",
  high: "#F8A541",
  medium: "#00A790",
  low: "#428BC1",
  "very-low": "#B01AFF",
};

const defaultForm = (activityId: number) => ({
  title: "",
  priority: "" as Priority,
  activity_group_id: activityId,
});

interface State{
  isDialogAddOpen: boolean,
  deleteId: number|null,
  sortAnchor: HTMLButtonElement | null
}

interface Props{

}

@observer
export class TodoComponent extends Component<Props,State> {
  @resolve(TodoStore)
  store!: TodoStore;

  @resolve(AlertService)
  alert!: AlertService;

  state={
    isDialogAddOpen:false,
    deleteId: null,
    sortAnchor: null
  }
  activityId = parseInt(getParameterByName("activity")??"0");
  form=defaultForm(this.activityId)

  componentDidMount(): void {
    this.store.load(this.activityId)
  }

  setIsDialogAddOpen(isDialogAddOpen:boolean){
    this.setState({isDialogAddOpen})
  }

  setDeleteId(deleteId:number|null){
    this.setState({deleteId})
  }

  getDeleteTitle(){
    // let filtered=data.items?.filter((item) => item.id === deleteId);
    // if(filtered && filtered[0]){
    //   return filtered[0].title
    // }
    return "Title nih gess yaah"
  };

  handleDelete(){
    this.store.delete(this.activityId)
  }

  handleSubmitForm(){
    this.store.create(this.form).then(()=>{
      this.alert.create('berhasil menambahkan data')
    }).catch(()=>{
      this.alert.create('gagal menambahkan data','error')
    })
  }

  handleClickSort(event: React.MouseEvent<HTMLButtonElement>){
    this.setState({sortAnchor:event.currentTarget})
  }

  handleCloseSort(){
    this.setState({sortAnchor:null})
  }

  handleCheckBox(id: number, is_active: boolean, index: number){
    this.store.check(id,is_active,index);
  }

  render() {
    const { isDialogAddOpen, deleteId, sortAnchor }=this.state
    return (
      <>
        <Dialog
          fullWidth
          open={isDialogAddOpen}
          onClose={() => this.setIsDialogAddOpen(false)}
        >
          <DialogTitle>Tambah List Item</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <TextField
              required
              id="outlined-required"
              label="Tambahkan nama list item"
              onChange={(e) => {
                this.form.title = e.currentTarget.value;
              }}
            />
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="demo-select-small">Priority</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Age"
                required
                onChange={(e) => {
                  this.form.priority = e.target.value as Priority;
                }}
              >
                {Object.keys(PriorityColor).map((key) => {
                  return (
                    <MenuItem value={key}>
                      <Grid container gap={1}>
                        <CircleIcon
                          style={{
                            color: PriorityColor[key],
                            height: 12,
                            width: 12,
                          }}
                        />
                        <Typography>
                          {key
                            .split("-")
                            .map(
                              (string) =>
                                string[0].toUpperCase() + string.substring(1)
                            )
                            .join(" ")}
                        </Typography>
                      </Grid>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              sx={{ borderRadius: 45, boxShadow: "none" }}
              onClick={()=>this.handleSubmitForm()}
            >
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
        <AlertDelete
          open={!!deleteId}
          onClose={() => this.setDeleteId(null)}
          message={<>apakah anda yakin menghapus list item <br/> "{this.getDeleteTitle()}"?</>}
          onOk={()=>this.handleDelete()}
        />
        <Sticky>
          <Grid
            container
            justifyContent="space-between"
            p={1}
            style={{ backgroundColor: "#F4F4F4" }}
          >
            <Grid item display="flex" direction="row" alignItems="center">
              <Link to="/">
                <IconButton>
                  <ArrowBackIosNewIcon />
                </IconButton>
              </Link>
              <Typography color="#111111" variant="h3">
                {this.store.activity?.title ?? "Title Activity"}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <SortIcon onClick={(e:any)=>this.handleClickSort(e)} />
                <Popover
                  open={!!sortAnchor}
                  anchorEl={sortAnchor}
                  onClose={()=>this.handleCloseSort()}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Grid width={200}>
                    <Grid
                      container
                      direction="row"
                      gap={2}
                      className="btn"
                      style={{
                        borderRadius: "6px 6px 0px 0px",
                        border: "1px solid #E5E5E5",
                        backgroundColor: "#FFFFFF",
                        padding: 14,
                      }}
                      onClick={() => this.store.sort(SortType.Newest)}
                    >
                      <ISortNewest />
                      <Typography>Terbaru</Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      gap={2}
                      className="btn"
                      style={{
                        border: "1px solid #E5E5E5",
                        backgroundColor: "#FFFFFF",
                        padding: 14,
                      }}
                      onClick={() => this.store.sort(SortType.Oldest)}
                    >
                      <ISortOldest />
                      <Typography>Terlama</Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      gap={2}
                      className="btn"
                      style={{
                        border: "1px solid #E5E5E5",
                        backgroundColor: "#FFFFFF",
                        padding: 14,
                      }}
                      onClick={() => this.store.sort(SortType.AZ)}
                    >
                      <ISortAZ />
                      <Typography>A-Z</Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      gap={2}
                      className="btn"
                      style={{
                        border: "1px solid #E5E5E5",
                        backgroundColor: "#FFFFFF",
                        padding: 14,
                      }}
                      onClick={() => this.store.sort(SortType.ZA)}
                    >
                      <ISortZA />
                      <Typography>Z-A</Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      gap={2}
                      className="btn"
                      style={{
                        borderRadius: "0px 0px 6px 6px",
                        border: "1px solid #E5E5E5",
                        backgroundColor: "#FFFFFF",
                        padding: 14,
                      }}
                      onClick={() => this.store.sort(SortType.Unfinished)}
                    >
                      <ISortUnfinished />
                      <Typography>Belum Selesai</Typography>
                    </Grid>
                  </Grid>
                </Popover>
              </IconButton>
              <Button
                color="primary"
                variant="contained"
                sx={{ borderRadius: 45, boxShadow: "none" }}
                startIcon={<AddIcon />}
                onClick={() => this.setIsDialogAddOpen(true)}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Sticky>
        <Grid container gap={3} mt="20px" direction="column">
          {this.store.all?.map((item, index) => {
            return (
              <Grid
                style={{
                  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: 12,
                  padding: 24,
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <Grid display="flex" alignItems="center">
                  <Checkbox
                    checked={!!!item.is_active}
                    onChange={() =>
                      this.handleCheckBox(item.id, !!item.is_active, index)
                    }
                  />
                </Grid>
                <Grid display="flex" alignItems="center">
                  <CircleIcon
                    style={{
                      color: PriorityColor[item.priority],
                      height: 12,
                      width: 12,
                    }}
                  />
                </Grid>
                <Grid flexGrow={1} display="flex" alignItems="center">
                  <Typography
                    color={!!item.is_active ? "#000000" : "#888888"}
                    style={{
                      textDecoration: !!item.is_active ? "none" : "line-through",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Grid>
                <Grid display="flex" alignItems="center">
                  <IconButton onClick={() => this.setDeleteId(item.id)}>
                    <IDelete />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
}
