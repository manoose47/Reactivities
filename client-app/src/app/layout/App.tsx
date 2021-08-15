import React, { Fragment, useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  // retrieve the activity store from the store context
  const {activityStore} = useStore();
  
  // set a state when the component loads
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, selectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // useEffect will trigger each time the component loads
  // EXCEPT, we've added an empty array at the end, which means this useEffect will only run once.
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  function handleSelectActivity(id: string) {
    selectActivity(activities.find(x => x.id === id));
  }

  function handleCancelActivity() {
    selectActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleUpsertActivity(activity: Activity) {
    // If activity is not null
    // retrieve the remaining activities in the array and add the passed activity to the array
    // else simply add the new activity to the existing activities array
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity).then(
        () => {
          setActivities([...activities.filter(x => x.id !== activity.id), activity])
          callback(activity)
        }
      )
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(
        () => {
          setActivities([...activities, activity])
          callback(activity)
        }
      )
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    }
    );
  }

  function callback(activity: Activity) {
    setEditMode(false);
    selectActivity(activity);
    console.log(activity);
    setSubmitting(false);
  }

  if (activityStore.loadgingInitial) return <LoadingComponent />

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activityStore.activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={handleCancelActivity}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          editMode={editMode}
          upsertActivity={handleUpsertActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);


