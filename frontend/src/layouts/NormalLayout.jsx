import React, { useState, Component } from 'react';
import {
    Challenge,
    Chat,
    Info,
    Login,
    MainMenu,
    Profile,
    Rank,
    Register,
    Settings,
    NotFound,
    Logout,
} from '../views';
import {
    Logs,
    Users,
    UserDetail,
    UserDelete,
    UserEdit,
    Challenges,
    UserCreate,
    AdminCreate,
    ChallengeDetail,
    ChallengeEdit,
    ChallengeCreate,
    AdminDetail,
    AdminEdit,
    AdminDelete,
} from '../views/admin';
import { Grid, Container, Dropdown } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import { Footer } from '.';
import { ChallengeDelete } from '../views/admin/ChallengeDelete';
import { CONFIG } from '../assets';

const NormalLayout = (props) => {
    return (
        <Container style={{ 'margin-top': '24px' }}>
            <Grid celled>
                <Grid.Row color='white' style={{ 'line-height': '2em' }}>
                    <Container textAlign='right' verticalAlign='middle'>
                        {props?.userinfo?.language && (
                            <Dropdown
                                style={{
                                    'margin-right': '16px',
                                    // 'font-weight': 'bold',
                                    'font-size': '12px',
                                }}
                                className='locale'
                                text={
                                    props?.userinfo?.language == 'kr'
                                        ? 'KR'
                                        : 'EN'
                                }
                                defaultValue={props.userinfo.language}>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            let newInfo = props.userinfo;
                                            newInfo.language = 'kr';
                                            props.setUserinfo(newInfo);
                                            localStorage.setItem(
                                                CONFIG['USER_INFO'],
                                                JSON.stringify(newInfo)
                                            );
                                            props.setDone(false);
                                        }}>
                                        Korean
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            let newInfo = props.userinfo;
                                            newInfo.language = 'en';
                                            props.setUserinfo(newInfo);
                                            localStorage.setItem(
                                                CONFIG['USER_INFO'],
                                                JSON.stringify(newInfo)
                                            );
                                            props.setDone(false);
                                        }}>
                                        English
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Container>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <MainMenu
                            userinfo={props.userinfo}
                            setUserinfo={props.setUserinfo}
                        />
                    </Grid.Column>
                    <Grid.Column stretched width={12}>
                        <Switch>
                            <Route path='/' exact component={Info} />
                            <Route
                                path='/login'
                                render={() => (
                                    <Login
                                        userinfo={props.userinfo}
                                        setUserinfo={props.setUserinfo}
                                        setDone={props.setDone}
                                    />
                                )}
                            />
                            <Route
                                path='/logout'
                                render={() => (
                                    <Logout
                                        userinfo={props.userinfo}
                                        setUserinfo={props.setUserinfo}
                                        setDone={props.setDone}
                                    />
                                )}
                            />
                            <Route
                                path='/register'
                                render={() => (
                                    <Register
                                        userinfo={props.userinfo}
                                        setUserinfo={props.setUserinfo}
                                    />
                                )}
                            />
                            <Route
                                path='/challenge'
                                render={() => (
                                    <Challenge userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/rank'
                                render={() => (
                                    <Rank userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/settings'
                                render={() => (
                                    <Settings userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/profile'
                                render={() => (
                                    <Profile userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/chat'
                                render={() => (
                                    <Chat userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/logs/:type?'
                                render={() => (
                                    <Logs userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/manage_users/:type?'
                                render={() => (
                                    <Users userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/user_details/:userid'
                                render={() => (
                                    <UserDetail userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/edit_user/:userid'
                                render={() => (
                                    <UserEdit userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/delete_user/:userid'
                                render={() => (
                                    <UserDelete userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/create_user'
                                render={() => (
                                    <UserCreate userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/create_admin'
                                render={() => (
                                    <AdminCreate userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/admin_details/:userid'
                                render={() => (
                                    <AdminDetail userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/edit_admin/:userid'
                                render={() => (
                                    <AdminEdit userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/delete_admin'
                                render={() => (
                                    <AdminDelete userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/manage_challenges/:type?'
                                render={() => (
                                    <Challenges userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/challenge_details/:challengeId'
                                render={() => (
                                    <ChallengeDetail
                                        userinfo={props.userinfo}
                                    />
                                )}
                            />
                            <Route
                                path='/admin/edit_challenge/:challengeId?'
                                render={() => (
                                    <ChallengeEdit userinfo={props.userinfo} />
                                )}
                            />
                            <Route
                                path='/admin/create_challenge'
                                render={() => (
                                    <ChallengeCreate
                                        userinfo={props.userinfo}
                                    />
                                )}
                            />
                            <Route
                                path='/admin/delete_challenge/:challengeId'
                                render={() => (
                                    <ChallengeDelete
                                        userinfo={props.userinfo}
                                    />
                                )}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row color='white' style={{ 'line-height': '2em' }}>
                    <Container textAlign='center' verticalAlign='middle'>
                        <Footer />
                    </Container>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export { NormalLayout };
