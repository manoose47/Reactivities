import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity(id: string): void;
  cancelActivity(): void;
  openForm(id: string): void;
  closeForm(): void;
  editMode: boolean;
  upsertActivity(activity: Activity): void;
  deleteActivity(id: string): void;
  submitting: boolean;
}

export default function ActivityDashboard({ activities, selectActivity, cancelActivity, selectedActivity, editMode, openForm, closeForm, upsertActivity, deleteActivity, submitting }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelActivity={cancelActivity} openForm={openForm} />
        }
        {editMode &&
          <ActivityForm closeForm={closeForm} activity={selectedActivity} upsert={upsertActivity} submitting={submitting} />
        }
      </Grid.Column>
    </Grid>
  );
}
