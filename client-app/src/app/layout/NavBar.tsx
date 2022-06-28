import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu} from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
    const {activityStore} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header as={NavLink} to='/' exact >
                    <img src={require('../../assets/logo.png')} alt="logo" style={{marginRight: '10px'}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities' />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}