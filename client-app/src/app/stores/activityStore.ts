import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode =  false
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const response = await agent.Activities.list();
            response.forEach(x => { 
                x.date = x.date.split('T')[0] 
                this.activities.push(x);
            })
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(x => x.id === id);
    }
    
    cancelActivity(): void {
        this.selectedActivity = undefined
    }
    
    openForm(id?: string): void {
        id ? this.selectActivity(id) : this.cancelActivity();
        this.editMode = true;
    }
    
    closeForm() : void {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            activity.id = uuid();
            await agent.Activities.create(activity);
            runInAction(()=> {
                this.activities.push(activity);
            })
            this.postSubmitActivity(activity)
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    updateActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.update(activity);
            runInAction(()=> {
                this.activities.filter(x => x.id !== activity.id);
                this.activities.push(activity);
            })
            this.postSubmitActivity(activity)
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    postSubmitActivity(activity: Activity) {
        runInAction(() => {
            this.editMode = false;
            this.setLoading(false);
            this.selectActivity(activity.id);
        })
    }
    
}