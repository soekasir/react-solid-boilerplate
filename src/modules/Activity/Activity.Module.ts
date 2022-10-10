import { createModule } from "../../utils/IoC";
import ActivityComponent from "./Activity.Component";
import {ActivityStore} from "./Activity.Store";

const ActivityModule=createModule({
  providers: [ { constructor: ActivityStore, type:"singleton" } ],
  Component: ActivityComponent,
})

export default ActivityModule
