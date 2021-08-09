import React from 'react';
import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemHeader, ItemMeta, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity, deleteActivity }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <ItemContent>
                            <ItemHeader as='a'>
                                {activity.title}
                            </ItemHeader>
                            <ItemMeta>
                                {activity.date}
                            </ItemMeta>
                            <ItemDescription>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </ItemDescription>
                            <ItemExtra>
                                <Button floated='right' onClick={() => selectActivity(activity.id)} content='View' color='blue' />
                                <Button floated='right' onClick={() => deleteActivity(activity.id)} content='Delete' color='red' />
                                <Label basic content={activity.category}></Label>
                            </ItemExtra>
                        </ItemContent>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}