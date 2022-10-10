import { Component } from "react";
import {
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { layoutWidth } from "../../../styles/theme";
import { IDelete } from "../icons";
import { ActivityDto } from "../Store";

interface PActivity {
  data: ActivityDto;
  onDelete: () => void;
}

export default class ActivityItem extends Component<PActivity> {
  render() {
    const {props}=this;
    return (
      <Paper
        style={{
          width: layoutWidth/5,
          height: 140,
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Grid
          position="relative"
          display="flex"
          direction="column"
          justifyContent="space-between"
          width="100%"
          height="100%"
        >
          <Grid item>
            <Link
              to={"/listitem?activity=" + props.data.id}
              style={{ textDecoration: "none" }}
            >
              <Typography color="#111111" variant="h6">
                {props.data.title}
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            position="absolute"
            bottom={0}
          >
            <Grid item>
              <Typography color="#888888" variant="body1">
                {format(new Date(props.data.created_at), "dd MMMM yyyy")}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={props.onDelete}>
                <IDelete />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}