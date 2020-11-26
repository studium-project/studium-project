import React, { useState } from 'react';
import {
    Button,
    Form,
    Grid,
    Message,
    Checkbox,
    Container,
    Icon,
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { doLogin } from '../actions';
import { CONFIG, LANG } from '../assets';

const status = CONFIG['STATUS']['LOGIN'];

function Login({ userinfo, setUserinfo, setDone }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(0);

    // console.log(userinfo);
    return (
        <>
            <Grid columns={1} style={{ 'flex-grow': '0' }}>
                <Grid.Column>
                    <Form className='attached fluid segment'>
                        {response.code === status.INVALID && (
                            <Message negative>
                                <Icon name='question' />
                                {response.message ||
                                    '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.'}
                            </Message>
                        )}
                        {response.code === status.PROGRESS && (
                            <Message info>&nbsp;로그인 시도 중</Message>
                        )}
                        {response.code === status.SUCCESS && (
                            <Message positive>
                                <Icon name='check' />
                                <Redirect to='/' />
                                {response.message || 'Logged in Successfully'}
                            </Message>
                        )}
                        {userinfo && userinfo.token && <Redirect to='/' />}
                        <Form.Field>
                            <Form.Input
                                fluid
                                icon='user'
                                label={
                                    LANG[userinfo?.language || 'en']['LOGIN'][
                                        'NICKNAME'
                                    ]
                                }
                                iconPosition='left'
                                value={username}
                                placeholder='admin'
                                onChange={({ target: { value } }) =>
                                    setUsername(value)
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                fluid
                                icon='lock'
                                label={
                                    LANG[userinfo?.language || 'en']['LOGIN'][
                                        'PASSWORD'
                                    ]
                                }
                                iconPosition='left'
                                value={password}
                                placeholder='Password'
                                type='password'
                                onChange={({ target: { value } }) =>
                                    setPassword(value)
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                defaultChecked
                                label={
                                    <label>
                                        {
                                            LANG[userinfo?.language || 'en'][
                                                'LOGIN'
                                            ]['REMEMBER']
                                        }
                                    </label>
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <Button
                                color='violet'
                                content={
                                    LANG[userinfo?.language || 'en']['LOGIN'][
                                        'LOGIN'
                                    ]
                                }
                                onClick={() =>
                                    doLogin({
                                        username,
                                        password,
                                        setUsername,
                                        setPassword,
                                        setResponse,
                                        setUserinfo,
                                        setDone,
                                    })
                                }
                                fluid
                            />
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid>
            <Message
                attached='bottom'
                warning
                style={{ 'flex-grow': '0', 'margin-bottom': '14px' }}>
                <Container textAlign='center'>
                    {LANG[userinfo?.language || 'en']['LOGIN']['STR1']}
                    <Link to='/register'>
                        {LANG[userinfo?.language || 'en']['LOGIN']['STR2']}
                    </Link>
                    {LANG[userinfo?.language || 'en']['LOGIN']['STR3']}
                </Container>
            </Message>
        </>
    );
}

export { Login };
