import { createModule } from "../../utils/IoC";
import ActivityComponent from "./Component";
import ActivityStore, { ActivityService } from "./Store";

const ActivityModule=createModule({
  providers: [ { constructor: ActivityStore, type:"singleton" },{constructor: ActivityService} ],
  Component: ActivityComponent,
})

export default ActivityModule
