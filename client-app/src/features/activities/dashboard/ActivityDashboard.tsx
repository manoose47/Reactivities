import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  upsertActivity(activity: Activity): void;
  deleteActivity(id: string): void;
  submitting: boolean;
}

export default observer(function ActivityDashboard({ upsertActivity, deleteActivity, submitting }: Props) {

  const {activityStore} = useStore();
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList deleteActivity={deleteActivity} submitting={submitting} />
      </Grid.Column>
      <Grid.Column width="6">
        {activityStore.selectedActivity && !activityStore.editMode && <ActivityDetails />
        }
        {activityStore.editMode &&
          <ActivityForm upsert={upsertActivity} submitting={submitting} />
        }
      </Grid.Column>
    </Grid>
  );
})
