import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  // set a state when the component loads
  const [activities, setActivities] = useState<Activity[]>([]);

  // useEffect will trigger each time the componnent loads
  // EXCEPT, we've added an empty array at the end, which means this useEffect will only run once.
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      // running setActivities will update the state
      setActivities(response.data);
    })
  }, [])

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
}

export default App;
