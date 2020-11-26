import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Table,
    Container,
    Tab,
    Button,
    Pagination,
    Responsive,
} from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import {
    getUsers,
    getAdmins,
} from '../../actions/admin';
import { formatDate2, formatUsername } from '../../utils';
import { LANG } from '../../assets';

const UserTable = ({ userinfo }) => {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        if (data === null && userinfo?.token) {
            setData([]);
            getUsers({
                userinfo,
                page,
            }).then(({ users, count }) => {
                setData(users);
                setLastPage(count);
            });
        }
    });

    return (
        <Container>
            <Link to='/admin/create_user'>
                <Button
                    style={{
                        float: 'right',
                        'margin-bottom': '12px',
                        'letter-spacing': '1px',
                    }}
                    size='tiny'
                    // color='twitter'
                >
                    {LANG[userinfo.language || 'en']['USERS']['NEW_USER']}
                </Button>
            </Link>
            <Table
                singleLine
                selectable
                sortable
                textAlign='center'
                size='small'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo.language || 'en']['USERS'][
                                    'USERNAME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {LANG[userinfo.language || 'en']['USERS']['EMAIL']}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo.language || 'en']['USERS'][
                                    'REGISTER_TIME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo.language || 'en']['USERS'][
                                    'SUBMITTED_TIME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {LANG[userinfo.language || 'en']['USERS']['SCORE']}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {LANG[userinfo.language || 'en']['USERS']['INFO']}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data &&
                        _.map(
                            data,
                            ({
                                id,
                                idx,
                                username,
                                email,
                                registered_time,
                                last_submitted_time,
                                score,
                            }) => (
                                <Table.Row>
                                    <Table.Cell>{idx}</Table.Cell>
                                    <Table.Cell>
                                        {formatUsername(username)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {formatUsername(email)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {registered_time &&
                                            formatDate2(
                                                new Date(registered_time)
                                            )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {(last_submitted_time &&
                                            formatDate2(
                                                new Date(last_submitted_time)
                                            )) ||
                                            '-'}
                                    </Table.Cell>
                                    <Table.Cell>{score}</Table.Cell>
                                    <Table.Cell>
                                        <Link to={'/admin/user_details/' + id}>
                                            <Button size='mini' color='purple'>
                                                {
                                                    LANG[
                                                        userinfo.language ||
                                                            'en'
                                                    ]['USERS']['DETAILS']
                                                }
                                            </Button>
                                        </Link>
                                        <Link to={'/admin/edit_user/' + id}>
                                            <Button size='mini' color='purple'>
                                                {
                                                    LANG[
                                                        userinfo.language ||
                                                            'en'
                                                    ]['USERS']['MODIFY']
                                                }
                                            </Button>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        )}
                </Table.Body>
            </Table>
            <Container textAlign='center'>
                <Pagination
                    boundaryRange={0}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    disabled={lastPage <= 1}
                    siblingRange={7}
                    totalPages={lastPage}
                    size='mini'
                    onPageChange={(e, { activePage }) => {
                        setPage(activePage);
                        setData(null);
                    }}
                    style={{ 'margin-bottom': '14px' }}
                />
            </Container>
        </Container>
    );
};

const AdminTable = ({ userinfo }) => {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        // let users = await getUsers(page);
        if (data === null && userinfo?.token) {
            setData([]);
            getAdmins({
                userinfo,
                page,
            }).then(({ admins, count }) => {
                // console.log(admins);
                setData(admins);
                setLastPage(count);
            });
        }
    });

    return (
        <Container>
            <Link to='/admin/create_admin'>
                <Button
                    style={{
                        float: 'right',
                        'margin-bottom': '12px',
                        'letter-spacing': '1px',
                    }}
                    size='tiny'>
                    {LANG[userinfo.language || 'en']['USERS']['NEW_ADMIN']}
                </Button>
            </Link>
            <Table
                singleLine
                selectable
                sortable
                textAlign='center'
                size='small'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo.language || 'en']['USERS'][
                                    'PRIVILEGE'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo.language || 'en']['USERS'][
                                    'USERNAME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo.language || 'en']['USERS'][
                                    'PASSWORD'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo.language || 'en']['USERS'][
                                    'REGISTER_TIME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {LANG[userinfo.language || 'en']['USERS']['INFO']}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(
                        data,
                        ({
                            id,
                            idx,
                            username,
                            registered_time,
                            masked_password,
                        }) => (
                            <Table.Row>
                                <Table.Cell>{idx}</Table.Cell>
                                <Table.Cell>
                                    {
                                        LANG[userinfo.language || 'en'][
                                            'USERS'
                                        ]['STR1']
                                    }
                                </Table.Cell>
                                <Table.Cell>{username}</Table.Cell>
                                <Table.Cell>{masked_password}</Table.Cell>
                                <Table.Cell>
                                    {registered_time &&
                                        formatDate2(new Date(registered_time))}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={'/admin/admin_details/' + id}>
                                        <Button size='mini' color='purple'>
                                            {
                                                LANG[userinfo.language || 'en'][
                                                    'USERS'
                                                ]['DETAILS']
                                            }
                                        </Button>
                                    </Link>
                                    <Link to={'/admin/edit_admin/' + id}>
                                        <Button size='mini' color='purple'>
                                            {
                                                LANG[userinfo.language || 'en'][
                                                    'USERS'
                                                ]['MODIFY']
                                            }
                                        </Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        )
                    )}
                </Table.Body>
            </Table>
            <Container textAlign='center'>
                <Pagination
                    boundaryRange={0}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    disabled={lastPage <= 1}
                    siblingRange={7}
                    totalPages={lastPage}
                    size='mini'
                    onPageChange={(e, { activePage }) => {
                        setPage(activePage);
                        setData(null);
                    }}
                    style={{ 'margin-bottom': '14px' }}
                />
            </Container>
        </Container>
    );
};

const NormalPanes = ({ userinfo }) => [
    {
        menuItem: LANG[userinfo.language || 'en']['USERS']['NORMAL'],
        render: () => {
            window.location.hash = '/admin/manage_users/normal';
            return (
                <Tab.Pane
                    attached={false}
                    style={{
                        padding: '0',
                        border: 'none',
                        'box-shadow': 'none',
                    }}>
                    <UserTable userinfo={userinfo} />
                </Tab.Pane>
            );
        },
    },
    {
        menuItem: LANG[userinfo.language || 'en']['USERS']['ADMIN'],
        render: () => {
            window.location.hash = '/admin/manage_users/admin';
            return (
                <Tab.Pane
                    attached={false}
                    style={{
                        padding: '0',
                        border: 'none',
                        'box-shadow': 'none',
                    }}>
                    <AdminTable userinfo={userinfo} />
                </Tab.Pane>
            );
        },
    },
];

const Users = ({ userinfo }) => {
    const { type } = useParams();
    if (!type) {
        window.location.hash = '/admin/manage_users/normal';
    }
    return (
        <>
            <Responsive minWidth={992}>
                <Tab
                    panes={NormalPanes({ userinfo })}
                    defaultActiveIndex={type === 'admin' ? 1 : 0}
                />
            </Responsive>
        </>
    );
};

export { Users };
