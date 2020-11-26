import React, { useState } from 'react';
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
import { Menu, Icon, Grid, Container, Dropdown } from 'semantic-ui-react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Footer } from '.';
import { subMenuOptions } from '../vars';

const MyProfile = ({ userinfo }) => (
    <Menu.Item>
        <img src={userinfo.imageUrl} style={{ height: '35px' }} />
        <Icon name='dropdown' />
    </Menu.Item>
);

function MobileLayout({ userinfo, setUserinfo }) {
    const [redirect, setRedirect] = useState(null);

    return (
        <>
            <Menu>
                {userinfo ? (
                    <Dropdown
                        trigger={<MyProfile userinfo={userinfo} />}
                        onChange={
                            (...e) => console.log(e)
                            // subMenuCallback({ value, setRedirect })
                        }
                        options={subMenuOptions}
                        pointing='top'
                        icon={null}
                    />
                ) : (
                    <Menu.Item href='#/login'>
                        <Icon name='sign-in' />
                        로그인
                    </Menu.Item>
                )}
                {redirect}
                <Menu.Menu position='right'>
                    <Menu.Item href='#/welcome'>
                        <Icon name='handshake outline' />
                        소개
                    </Menu.Item>
                    <Menu.Item href='#/challenge'>
                        <Icon name='dna' />
                        문제
                    </Menu.Item>
                    <Menu.Item href='#/rank'>
                        <Icon name='winner' />
                        랭킹
                    </Menu.Item>
                    {/* <Menu.Item
                        href='#/chat'
                    >
                        <Icon name='talk' />
                        채팅
                    </Menu.Item> */}
                </Menu.Menu>
            </Menu>
            <div style={{ margin: '14px 14px 0' }}>
                <Switch>
                    <Route path='/' exact component={Info} />
                    <Route
                        path='/login'
                        render={(props) => (
                            <Login
                                userInfo={userinfo}
                                setUserinfo={setUserinfo}
                            />
                        )}
                    />
                    <Route path='/logout' component={Logout} />
                    <Route
                        path='/register'
                        render={(props) => (
                            <Register
                                userinfo={userinfo}
                                setUserinfo={setUserinfo}
                            />
                        )}
                    />
                    <Route path='/welcome' component={Info} />
                    <Route path='/challenge' component={Challenge} />
                    <Route path='/rank' component={Rank} />
                    <Route
                        path='/settings'
                        render={() => <Settings userinfo={userinfo} />}
                    />
                    <Route
                        path='/profile'
                        render={() => <Profile userinfo={userinfo} />}
                    />
                    <Route
                        path='/chat'
                        render={(props) => <Chat userinfo={userinfo} />}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
            <Container textAlign='center' verticalAlign='middle'>
                <Footer />
            </Container>
        </>
    );
}

export { MobileLayout };
