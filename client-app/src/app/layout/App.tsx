import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {
  // set a state when the component loads
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, selectActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  // useEffect will trigger each time the componnent loads
  // EXCEPT, we've added an empty array at the end, which means this useEffect will only run once.
  useEffect(() => {
    agent.Activities.list().then(response => {
      // running setActivities will update the state
      setActivities(response);
    })
  }, [])

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

    activity.id ?
    setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, {...activity, id: uuid()}])
    setEditMode(false);
    selectActivity(activity);
    console.log(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelActivity={handleCancelActivity}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          editMode={editMode}
          upsertActivity={handleUpsertActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
