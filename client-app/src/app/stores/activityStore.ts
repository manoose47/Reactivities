import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activitiesRegistry = new Map<string, Activity>();
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
                this.activitiesRegistry.set(x.id, x)
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
        this.selectedActivity = this.activitiesRegistry.get(id);
    }
    
    cancelActivity = () => {
        this.selectedActivity = undefined
    }
    
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelActivity();
        this.editMode = true;
    }
    
    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            activity.id = uuid();
            await agent.Activities.create(activity);
            runInAction(()=> {
                this.activitiesRegistry.set(activity.id, activity);
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
                this.activitiesRegistry.set(activity.id, activity);
            })
            this.postSubmitActivity(activity)
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    deleteActivity = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Activities.delete(id)
            runInAction(()=> {
                this.activitiesRegistry.delete(id);
                this.setLoading(false);
            })
        } catch (error) {
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

    get activitiesByDate()  { return Array.from(this.activitiesRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))}

    
    
}