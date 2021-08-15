import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

// Store is like a container for all our other data stores
interface Store {
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

// here we are creating a ReactContext, i.e. a reference to the different state stores that can be used throughout the App
export const StoreContext = createContext(store);


// Here we create a hook, that when called will return the current store context 
export function useStore() {
    return useContext(StoreContext);
}