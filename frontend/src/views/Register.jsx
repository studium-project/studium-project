import React, { useState } from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Container,
    List,
    Icon,
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { doRegister } from '../actions';
import { CONFIG, LANG } from '../assets';

const status = CONFIG['STATUS']['REGISTER'];

const Register = ({ userinfo, setUserinfo }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [agree, setAgree] = useState(false);
    const [response, setResponse] = useState('');

    return (
        <Container style={{ 'margin-bottom': '14px' }}>
            <Message
                attached
                header='가입을 환영합니다!'
                content='아래 항목을 작성하면 아이디를 생성할 수 있습니다.'
            />
            <Form className='attached fluid segment'>
                {response.code === status.INVALID && (
                    <Message negative>
                        <Icon name='warning' />
                        {response.message || 'Invalid Input'}
                    </Message>
                )}
                {response.code === status.PROGRESS && (
                    <Message info>로그인 시도 중</Message>
                )}
                {response.code === status.NEEDAGREE && (
                    <Message warning style={{ display: 'block' }}>
                        약관 동의가 필요합니다.
                    </Message>
                )}
                {response.code === status.SUCCESS && (
                    <Message positive>
                        <Icon name='check' />
                        <Redirect to='/' />
                        {response.message || 'Registered Successfully'}
                    </Message>
                )}
                {userinfo && userinfo.token && <Redirect to='/' />}
                <Grid columns={1}>
                    <Grid.Column width={16}>
                        <Form.Field>
                            <label>
                                {
                                    LANG[userinfo?.language || 'en'][
                                        'REGISTER'
                                    ]['EMAIL']
                                }
                            </label>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='admin@studium.p6.is'
                                onChange={({ target: { value } }) =>
                                    setEmail(value)
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                {
                                    LANG[userinfo?.language || 'en'][
                                        'REGISTER'
                                    ]['NICKNAME']
                                }
                            </label>
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='admin'
                                onChange={({ target: { value } }) =>
                                    setUsername(value)
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                {
                                    LANG[userinfo?.language || 'en'][
                                        'REGISTER'
                                    ]['PASSWORD']
                                }
                            </label>
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={({ target: { value } }) =>
                                    setPassword(value)
                                }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>
                                {
                                    LANG[userinfo?.language || 'en'][
                                        'REGISTER'
                                    ]['PASSWORD_REPEAT']
                                }
                            </label>
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={({ target: { value } }) =>
                                    setPasswordRepeat(value)
                                }
                            />
                        </Form.Field>
                        <Form.Checkbox
                            onChange={() => setAgree(!agree)}
                            inline
                            label='약관에 동의합니다.'
                        />
                        <Form.Field>
                            <Button
                                color='violet'
                                onClick={() =>
                                    doRegister({
                                        username,
                                        password,
                                        email,
                                        setUsername,
                                        setPassword,
                                        setEmail,
                                        setResponse,
                                        setUserinfo,
                                        agree,
                                    })
                                }
                                content='회원가입'
                                fluid
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid>
            </Form>
            <Message attached='bottom' warning>
                <Container textAlign='center'>
                    계정이 있나요? <Link to='/login'>로그인</Link>하세요.
                </Container>
            </Message>
        </Container>
    );
};

export { Register };
