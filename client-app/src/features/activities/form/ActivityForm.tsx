import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

function ActivityForm() {

  const {activityStore} = useStore();

  const {selectedActivity : activity, closeForm, updateActivity, createActivity, loading} = activityStore;

  const initialState = activity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: ''
  };

  // initial state is either the passed down state, or the empty element we defined.
  const [formActivity, setFormActivity] = useState(initialState);


  function handleSubmit() {
    formActivity.id ? updateActivity(formActivity): createActivity(formActivity);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormActivity({ ...formActivity, [name]: value })
  }

  return (

    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input placeholder="Title" name='title' value={formActivity.title} onChange={handleInputChange} />
        <Form.TextArea placeholder="Description" name='description' value={formActivity.description} onChange={handleInputChange} />
        <Form.Input placeholder="Category" name='category' value={formActivity.category} onChange={handleInputChange} />
        <Form.Input type="Date" placeholder="Date" name='date' value={formActivity.date} onChange={handleInputChange} />
        <Form.Input placeholder="City" name='city' value={formActivity.city} onChange={handleInputChange} />
        <Form.Input placeholder="Venue" name='venue' value={formActivity.venue} onChange={handleInputChange} />
        <Button floated="right" loading={loading} positive type="submit" content="Submit" />
        <Button floated="right" type="button" content="Cancel" onClick={closeForm} />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm)
