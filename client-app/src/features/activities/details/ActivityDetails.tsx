import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";


export default function ActivityDetails() {
    
    const {activityStore} = useStore();
    const {selectedActivity, openForm, cancelActivity} = activityStore;
    if(!selectedActivity) return <LoadingComponent/>;
    
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{selectedActivity.title}</Card.Header>
                <Card.Meta>
                    <span>{selectedActivity.date}</span>
                </Card.Meta>
                <Card.Description>{selectedActivity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths="2">
                    <Button basic color="blue" content="Edit" onClick={() => openForm(selectedActivity.id)}></Button>
                    <Button basic color="grey" content="Cancel" onClick={cancelActivity}></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}
