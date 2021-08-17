import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemHeader, ItemMeta, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

function ActivityList() {

    const {activityStore} = useStore();
    const {loading, activitiesByDate, selectActivity, deleteActivity} = activityStore;

    const [target, setTarget] = useState('');

    // I guess If I was being ambitious could call this a decorator on the delete method
    function DeleteAction(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }



    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
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
                                <Button name={activity.id} floated='right' onClick={(e) => DeleteAction(e, activity.id)} loading={loading && target === activity.id} content='Delete' color='red' />
                                <Label basic content={activity.category}></Label>
                            </ItemExtra>
                        </ItemContent>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}

export default observer(ActivityList)