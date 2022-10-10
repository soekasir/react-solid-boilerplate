import { Component } from "react";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ActivityStore, CreateActivity } from "../Activity.Store";
import { resolve } from "inversify-react";
import AlertService from "../../../components/Alert/AlertService";

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFF",
  boxShadow: 24,
  p: 2,
};

interface ModalAddActivityProps {
  open: boolean;
  onClose: () => void;
  afterSubmit: () => void;
}

export default class ModalAddActivity extends Component<ModalAddActivityProps> {
  @resolve(ActivityStore)
  private readonly store!: ActivityStore;
  @resolve(AlertService)
  private readonly alert!: AlertService;

  private form: CreateActivity = {
    title: "",
  };

  submit=()=>{
    this.store.create(this.form).then(()=>{
      this.alert.create(`berhasil menambahkan activity "${this.form.title}"`)
    }).finally(()=>{
      this.props.afterSubmit();
    })
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <Box sx={{ ...boxStyle, width: 200 }}>
          <Grid container gap={2}>
            <TextField
              required
              id="outlined-required"
              label="Title"
              onChange={(e) => {
                this.form.title = e.currentTarget.value;
              }}
            />
            <Button
              color="primary"
              variant="contained"
              sx={{ borderRadius: 45, boxShadow: "none" }}
              startIcon={<AddIcon />}
              onClick={this.submit}
            >
              create
            </Button>
          </Grid>
        </Box>
      </Modal>
    );
  }
}
