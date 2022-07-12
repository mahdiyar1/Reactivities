import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    editProfile: (profile: Partial<Profile>) => void;
}

export default observer(function ProfileEditForm({editProfile}: Props) {
    const {profileStore : {profile}} = useStore();
    
    
    return (
            <Formik 
                validationSchema={Yup.object({displayName: Yup.string().required()})} 
                enableReinitialize 
                initialValues={{displayName: profile?.displayName, bio: profile?.bio}} 
                onSubmit={values => editProfile(values)} 
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <MyTextInput name='displayName' placeholder='Display Name' />
                        <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive
                            type='submit'
                            content='Update profile' />
                    </Form>
                )}
            </Formik>
    )
})