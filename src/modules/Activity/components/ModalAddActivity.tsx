import { Component } from "react";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CreateActivityDto } from "../Activity.Dto";

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFF",
  boxShadow: 24,
  p: 2,
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (form:CreateActivityDto)=>void
}

export default class ModalAddActivity extends Component<Props> {
  private readonly form: CreateActivityDto = {
    title: "",
  };

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
              onClick={()=>this.props.onSubmit(this.form)}
            >
              create
            </Button>
          </Grid>
        </Box>
      </Modal>
    );
  }
}
