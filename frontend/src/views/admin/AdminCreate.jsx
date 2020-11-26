import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Table,
    Container,
    Button,
    Grid,
    Input,
    Checkbox,
    TextArea,
    Form,
    Dropdown,
    Message,
    Icon,
    Select,
} from 'semantic-ui-react';

import { CONFIG } from '../../assets';
import { createUser, createAdmin } from '../../actions/admin';
import { useParams, Redirect } from 'react-router-dom';
const { COUNTRIES } = CONFIG;

const status = CONFIG['STATUS']['ADMIN_CREATE'];

const AdminCreate = ({ userinfo }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [active, setActive] = useState(true);
    const [role, setRole] = useState('super');
    const [privilege, setPrivilege] = useState([]);
    const [response, setResponse] = useState('');

    return (
        <Container>
            <div style={{ padding: 0, color: '#5d5d5d', 'margin-top': '6px' }}>
                <span
                    style={{
                        'font-weight': 'bold',
                        'margin-left': '7px',
                    }}>
                    관리자 등록
                </span>
            </div>
            {response.code === status.INVALID && (
                <Message warning style={{ 'margin-bottom': '0' }}>
                    <Icon name='exclamation' />
                    {response.message || 'Invalid Request'}
                </Message>
            )}
            {response.code === status.PROGRESS && (
                <Message info style={{ 'margin-bottom': '0' }}>
                    등록 중
                </Message>
            )}
            {response.code === status.SUCCESS && (
                <Message positive style={{ 'margin-bottom': '0' }}>
                    <Icon name='check' />
                    <Redirect to='/' />
                    {response.message || 'Registered Successfully'}
                </Message>
            )}
            <Grid padded>
                <Grid.Row>
                    <Table definition size='small'>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>아이디</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        onChange={(e, { value }) => {
                                            setUsername(value);
                                        }}
                                        // placeholder='admin'
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>비밀번호</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        onChange={(e, { value }) => {
                                            setPassword(value);
                                        }}
                                        //  placeholder='********'
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>비밀번호 확인</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        onChange={(e, { value }) => {
                                            setPasswordRepeat(value);
                                        }}
                                        //  placeholder='********'
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>상태</Table.Cell>
                                <Table.Cell>
                                    <Checkbox
                                        size='small'
                                        checked={active}
                                        onClick={() => {
                                            setActive(!active);
                                        }}
                                        label={'\u2028'}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>역할</Table.Cell>
                                <Table.Cell>
                                    <Select
                                        options={[
                                            {
                                                text: '최고관리자',
                                                key: 'super',
                                                value: 'super',
                                            },
                                            {
                                                text: '중간관리자',
                                                key: 'middle',
                                                value: 'middle',
                                            },
                                        ]}
                                        onChange={(e, { value }) => {
                                            setRole(value);
                                        }}
                                        value={role}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>권한</Table.Cell>
                                <Table.Cell>
                                    <Dropdown
                                        multiple
                                        selection
                                        fluid
                                        value={privilege}
                                        disabled={role === 'super'}
                                        value={privilege}
                                        onChange={(e, { value }) => {
                                            setPrivilege(value);
                                        }}
                                        options={[
                                            {
                                                key: '1',
                                                text: 'Highlighter',
                                                value: '1',
                                            },
                                            {
                                                key: '2',
                                                text: 'Variable machine',
                                                value: '2',
                                            },
                                            {
                                                key: '3',
                                                text: 'Fortune cookie',
                                                value: '3',
                                            },
                                            {
                                                key: '4',
                                                text: 'Createdchall',
                                                value: '4',
                                            },
                                        ]}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <Grid.Row centered>
                    <Button
                        size='tiny'
                        color='purple'
                        onClick={() =>
                            createAdmin({
                                userinfo,
                                username,
                                password,
                                passwordRepeat,
                                active,
                                role,
                                privilege,
                                setResponse,
                            })
                        }>
                        생성
                    </Button>
                    <Button
                        size='tiny'
                        color='grey'
                        onClick={() => window.history.back()}>
                        취소
                    </Button>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export { AdminCreate };
