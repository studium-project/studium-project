import React, { Component, Fragment, useState } from 'react';
import {
    Grid,
    Menu,
    Container,
    Icon,
    Button,
    Dropdown,
    Message,
    Segment,
    Divider,
    Image,
    Statistic,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { subMenuOptions } from '../vars';
import qrcode from 'qrcode';
import { LANG } from '../assets';

const MyProfile = ({
    userinfo: { username, imageUrl, language, score, is_admin },
}) => (
    <Segment
        compact
        style={{ display: 'inline-block', 'margin-bottom': '0' }}
        textAlign='center'>
        <Image
            size='tiny'
            style={{
                'margin-bottom': '1rem',
                display: 'inline-block',
                // padding: username === 'posix' && '3px',
            }}
            src={imageUrl}
            bordered
        />
        <br />
        <b>{username}</b>
        <br />
        <small>
            {is_admin && LANG[language || 'en']['MENU']['ADMINISTRATOR']}
            {!is_admin && score + LANG[language || 'en']['MENU']['POINT']}
        </small>
    </Segment>
);

function ProfileWindow({ userinfo, setRedirect }) {
    return userinfo?.token ? (
        <Segment textAlign='center' style={{ background: '#efefef' }}>
            <Dropdown
                trigger={<MyProfile userinfo={userinfo} />}
                icon={null}
                className='profile'
                pointing='right'>
                <Dropdown.Menu>
                    <Dropdown.Item
                        text={
                            LANG[userinfo?.language || 'en']['MENU']['PROFILE']
                        }
                        icon='user'
                        // style={{
                        //     'font-weight':
                        //         window.location.hash === '#/profile' && 'bold',
                        // }}
                        onClick={() => (window.location.hash = '/profile')}
                    />
                    <Dropdown.Item
                        text={
                            LANG[userinfo?.language || 'en']['MENU']['SETTINGS']
                        }
                        icon='settings'
                        // style={{
                        //     'font-weight':
                        //         window.location.hash === '#/settings' && 'bold',
                        // }}
                        onClick={() => (window.location.hash = '/settings')}
                    />
                    <Dropdown.Item
                        text={
                            LANG[userinfo?.language || 'en']['MENU']['LOGOUT']
                        }
                        icon='sign out'
                        onClick={() => (window.location.hash = '/logout')}
                    />
                </Dropdown.Menu>
            </Dropdown>
        </Segment>
    ) : (
        <Menu fluid vertical>
            <Menu.Item
                name='login'
                href='#/login'
                style={{ 'text-align': 'left' }}>
                <Icon name='lock' />
                {LANG[userinfo?.language || 'en']['MENU']['LOGIN']}
            </Menu.Item>
        </Menu>
    );
}

//
function MainMenu({ userinfo }) {
    const [active, setActive] = useState(null);
    const [redirect, setRedirect] = useState(null);

    return (
        <>
            <Container style={{ 'text-align': 'center' }}>
                <ProfileWindow userinfo={userinfo} setRedirect={setRedirect} />
                {redirect}
            </Container>
            {userinfo?.token && (
                <Menu fluid vertical>
                    <Menu.Item
                        name='home'
                        href='#/'
                        active={active === 'home'}
                        onClick={(e, { value }) => setActive(value)}>
                        <Icon name='handshake outline' />
                        {LANG[userinfo?.language || 'en']['MENU']['INTRODUCE']}
                    </Menu.Item>
                    <Menu.Item
                        name='rank'
                        href='#/rank'
                        active={active === 'rank'}
                        onClick={(e, { value }) => setActive(value)}>
                        {LANG[userinfo?.language || 'en']['MENU']['RANK']}
                        <Icon name='winner' />
                    </Menu.Item>
                    <Menu.Item
                        name='challenge'
                        href='#/challenge'
                        active={active === 'challenge'}
                        onClick={(e, { value }) => setActive(value)}>
                        {LANG[userinfo?.language || 'en']['MENU']['CHALLENGE']}
                        <Icon name='dna' />
                    </Menu.Item>
                    <Menu.Item
                        name='chat'
                        href='#/chat'
                        active={active === 'chat'}
                        onClick={(e, { value }) => setActive(value)}>
                        {LANG[userinfo?.language || 'en']['MENU']['CHAT']}
                        <Icon name='talk' />
                    </Menu.Item>
                </Menu>
            )}
            {!userinfo?.token && (
                <Menu fluid vertical>
                    <Menu.Item
                        name='home'
                        href='#/'
                        active={active === 'home'}
                        onClick={(e, { value }) => setActive(value)}>
                        <Icon name='handshake outline' />
                        {LANG[userinfo?.language || 'en']['MENU']['INTRODUCE']}
                    </Menu.Item>
                    <Menu.Item
                        name='rank'
                        href='#/rank'
                        active={active === 'rank'}
                        onClick={(e, { value }) => setActive(value)}>
                        {LANG[userinfo?.language || 'en']['MENU']['RANK']}
                        <Icon name='winner' />
                    </Menu.Item>
                    <Menu.Item
                        name='chat'
                        href='#/chat'
                        active={active === 'chat'}
                        onClick={(e, { value }) => setActive(value)}>
                        {LANG[userinfo?.language || 'en']['MENU']['CHAT']}
                        <Icon name='talk' />
                    </Menu.Item>
                </Menu>
            )}
            {userinfo && userinfo.is_admin && (
                <Menu fluid vertical>
                    <Menu.Item
                        name='manage_users'
                        href='#/admin/manage_users'
                        active={active === 'manage_users'}
                        onClick={(e, { value }) => setActive(value)}>
                        {LANG[userinfo?.language || 'en']['MENU']['MEMBERS']}
                        <Icon name='user' />
                    </Menu.Item>
                    <Menu.Item
                        name='manage_challenges'
                        href='#/admin/manage_challenges'
                        active={active === 'manage_challenges'}
                        onClick={(e, { value }) => setActive(value)}>
                        {
                            LANG[userinfo?.language || 'en']['MENU'][
                                'MANAGE_CHALLENGES'
                            ]
                        }
                        <Icon name='pencil' />
                    </Menu.Item>
                    <Menu.Item
                        name='logs'
                        href='#/admin/logs'
                        active={active === 'logs'}
                        onClick={(e, { value }) => setActive(value)}>
                        {LANG[userinfo?.language || 'en']['MENU']['LOGS']}
                        <Icon name='time' />
                    </Menu.Item>
                </Menu>
            )}
        </>
    );
}

export { MainMenu };
