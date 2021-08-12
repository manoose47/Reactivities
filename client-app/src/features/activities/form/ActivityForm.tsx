import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  closeForm(): void;
  activity: Activity | undefined;
  upsert(activity: Activity): void;
  submitting: boolean;
}

export default function ActivityForm({ closeForm, activity, upsert, submitting }: Props) {

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
    upsert(formActivity);
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
        <Button floated="right" loading={submitting} positive type="submit" content="Submit" />
        <Button floated="right" type="button" content="Cancel" onClick={closeForm} />
      </Form>
    </Segment>
  );
}
