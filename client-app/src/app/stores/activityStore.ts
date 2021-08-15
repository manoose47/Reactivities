import { makeAutoObservable} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode =  false
    loading = false;
    loadgingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.loadgingInitial = true;
        try {
            const response = await agent.Activities.list();
            response.forEach(x => { 
                x.date = x.date.split('T')[0] 
                this.activities.push(x);
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.loadgingInitial = false;
        }
    }
}