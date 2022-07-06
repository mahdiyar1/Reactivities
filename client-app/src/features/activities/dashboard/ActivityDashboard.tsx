import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFilter from "./ActivityFilters";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const {loadingActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1) loadingActivities();
      }, [activityRegistry.size, loadingActivities])
    
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <GridColumn width='6'>
                <ActivityFilter />
            </GridColumn>
        </Grid>
    )
})