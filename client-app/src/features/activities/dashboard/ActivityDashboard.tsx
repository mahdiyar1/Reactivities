import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const {loadingActivities, activityRegistry} = activityStore;
    const {selectedActivity, editMode} = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1) loadingActivities();
      }, [activityRegistry.size, loadingActivities])
    
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <GridColumn width='6'>
                <h1>Activity Filters</h1>
            </GridColumn>
        </Grid>
    )
})