import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Table,
    Container,
    Button,
    Grid,
    Input,
    Select,
    Checkbox,
    Dropdown,
} from 'semantic-ui-react';

import { CONFIG } from '../../assets';
import { getAdmin } from '../../actions/admin';
import { useParams } from 'react-router-dom';
const { COUNTRIES } = CONFIG;

const AdminEdit = ({ userinfo }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [active, setActive] = useState(true);
    const [role, setRole] = useState('super');
    const [privilege, setPrivilege] = useState([]);
    let { userid } = useParams();

    useEffect(() => {
        if (user === null && userinfo?.token) {
            setUser([]);
            getAdmin({ userinfo, id: userid }).then((user) => {
                // console.log(user);
                setUser(user);
                setRole('super');
            });
        }
    });

    return (
        <Container>
            <Grid padded>
                <Grid.Row style={{ padding: 0, color: '#5d5d5d' }}>
                    <span
                        style={{
                            'font-weight': 'bold',
                            'margin-top': '6px',
                            'margin-left': '7px',
                        }}>
                        {' '}
                        관리자 정보 수정
                    </span>
                </Grid.Row>
                <Grid.Row>
                    <Table definition size='small'>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>아이디</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        defaultValue={user?.username}
                                        disabled
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>비밀번호</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        // placeholder='********'
                                        onChange={(e, { value }) => {
                                            setPassword(value);
                                        }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>비밀번호 확인</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        // placeholder='********'
                                        onChange={(e, { value }) => {
                                            setPasswordRepeat(value);
                                        }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>상태</Table.Cell>
                                <Table.Cell>
                                    <Checkbox
                                        size='small'
                                        label={'\u2028'}
                                        checked={user?.active}
                                        onClick={() => {
                                            setActive(!user?.active);
                                        }}
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
                                        defaultValue={[]}
                                        multiple
                                        selection
                                        fluid
                                        value={privilege}
                                        disabled={role === 'super'}
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
                    {/* <Link to={'/admin/edit_admin/1' + userid}> */}
                    <Button size='tiny' color='purple'>
                        적용
                    </Button>
                    {/* </Link> */}
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

export { AdminEdit };
