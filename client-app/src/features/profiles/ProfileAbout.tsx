import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileEditForm from "./ProfileEditForm";

interface Props {
    profile: Profile
}

export default observer(function ProfileAbout({profile}: Props) {
    const {profileStore: {isCurrentUser, updateProfile, loading}} = useStore();
    const [editProfileMode, setEditProfileMode] = useState(false);

    function handleEditProfile(profile: Partial<Profile>) {
        updateProfile(profile).then(() =>setEditProfileMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' content={`About ${profile.displayName}`} />
                    {isCurrentUser && (
                        <Button floated='right' basic 
                            content={editProfileMode ? 'Cancel' : 'Edit Profile'}
                            onClick={() => setEditProfileMode(!editProfileMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editProfileMode ? (
                        <ProfileEditForm editProfile={handleEditProfile} />
                    ) : (
                        <span style={{whiteSpace: "pre-wrap"}} >{profile.bio}</span>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})