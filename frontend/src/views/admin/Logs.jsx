import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Table,
    Container,
    Tab,
    Popup,
    Flag,
    Pagination,
    Responsive,
    Icon,
} from 'semantic-ui-react';
import { getFlag, getLogin, getRegister } from '../../actions/admin';
import { formatDate, maskFlag } from '../../utils';
import { LANG } from '../../assets';
import { useParams } from 'react-router-dom';

const handleSort = ({
    pivot,
    setPivot,
    data,
    setData,
    direction,
    setDirection,
    column,
}) => {
    if (pivot !== column) {
        setPivot(column);
        setData(_.sortBy(data, [column]));
        setDirection('ascending');
    } else {
        setData(data.reverse());
        setDirection(direction === 'ascending' ? 'descending' : 'ascending');
    }
};

function MobileRankTable({ userinfo }) {
    const [pivot, setPivot] = useState(null);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [direction, setDirection] = useState(null);

    useEffect(() => {
        setData(getFlag(page));
    });

    return (
        <Container>
            <Table
                unstackable
                singleLine
                selectable
                sortable
                textAlign='center'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={pivot === 'id' ? direction : null}
                            onClick={() =>
                                handleSort({
                                    pivot,
                                    setPivot,
                                    data,
                                    setData,
                                    direction,
                                    setDirection,
                                    column: 'id',
                                })
                            }></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(
                        data,
                        ({
                            id,
                            username,
                            country,
                            score,
                            comment,
                            lastauth,
                        }) => (
                            <Table.Row>
                                <Table.Cell>{id}</Table.Cell>
                                <Table.Cell>{username}</Table.Cell>
                                <Table.Cell>
                                    <Flag name={country} />
                                </Table.Cell>
                                <Table.Cell>{score}</Table.Cell>
                            </Table.Row>
                        )
                    )}
                </Table.Body>
            </Table>
            <div style={{ 'text-align': 'center' }}>
                <Pagination
                    boundaryRange={0}
                    onPageChange={(e, { activePage }) => setPage(activePage)}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={3}
                    style={{ 'margin-bottom': '14px' }}
                />
            </div>
        </Container>
    );
}

const FlagLogTable = ({ userinfo }) => {
    const [pivot, setPivot] = useState(null);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [direction, setDirection] = useState(null);

    useEffect(() => {
        let data = getFlag(page);
        if (Array.isArray(data)) setData(data);
    });

    return (
        <Container>
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
                            {LANG[userinfo?.language || 'en']['LOGS']['IP']}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['LOGS'][
                                    'USERNAME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['LOGS'][
                                    'CHALLENGE_NAME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['LOGS'][
                                    'SUBMITTED_TIME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {LANG[userinfo?.language || 'en']['LOGS']['FLAG']}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {LANG[userinfo?.language || 'en']['LOGS']['RESULT']}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(
                        data,
                        ({
                            id,
                            ip,
                            username,
                            challenge,
                            submitted_time,
                            flag,
                            result,
                        }) => (
                            <Table.Row>
                                <Table.Cell>{id}</Table.Cell>
                                <Table.Cell>{ip}</Table.Cell>
                                <Table.Cell>{username}</Table.Cell>
                                <Table.Cell>{challenge}</Table.Cell>
                                <Table.Cell>
                                    {submitted_time &&
                                        formatDate(new Date(submitted_time))}
                                </Table.Cell>

                                <Popup
                                    content={flag}
                                    inverted
                                    size='tiny'
                                    position='right center'
                                    trigger={
                                        <Table.Cell>
                                            <span>{maskFlag(flag)}</span>
                                        </Table.Cell>
                                    }
                                />

                                <Table.Cell>
                                    {{ 30: <Icon name='check' /> }[result]}
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
                    firstItem={null}
                    size='mini'
                    lastItem={null}
                    siblingRange={1}
                    totalPages={3}
                    onPageChange={(e, { activePage }) => setPage(activePage)}
                    style={{ 'margin-bottom': '14px' }}
                />
            </Container>
        </Container>
    );
};

const LoginLogTable = ({ userinfo }) => {
    const [pivot, setPivot] = useState(null);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [direction, setDirection] = useState(null);

    useEffect(() => {
        let data = getLogin(page);
        if (Array.isArray(data)) setData(data);
    });

    return (
        <Container>
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
                            {LANG[userinfo?.language || 'en']['LOGS']['IP']}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['LOGS'][
                                    'USERNAME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['LOGS'][
                                    'PASSWORD'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell width={2}>
                            {
                                LANG[userinfo?.language || 'en']['LOGS'][
                                    'FAIL_COUNT'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['LOGS'][
                                    'PROCCESSED_TIME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {LANG[userinfo?.language || 'en']['LOGS']['RESULT']}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(
                        data,
                        ({
                            id,
                            ip,
                            username,
                            password,
                            processed_time,
                            fail_count,
                            result,
                        }) => (
                            <Table.Row>
                                <Table.Cell>{id}</Table.Cell>
                                <Table.Cell>{ip}</Table.Cell>
                                <Table.Cell>{username}</Table.Cell>
                                <Table.Cell>{password}</Table.Cell>
                                <Table.Cell>{fail_count}</Table.Cell>
                                <Table.Cell>
                                    {processed_time &&
                                        formatDate(new Date(processed_time))}
                                </Table.Cell>
                                <Table.Cell>
                                    {{ 40: <Icon name='check' /> }[result]}
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
                    size='mini'
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={3}
                    onPageChange={(e, { activePage }) => setPage(activePage)}
                    style={{ 'margin-bottom': '14px' }}
                />
            </Container>
        </Container>
    );
};
const RegisterLogTable = ({ userinfo }) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        let data = getRegister(page);
        if (Array.isArray(data)) setData(data);
    });

    return (
        <Container>
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
                            {LANG[userinfo?.language || 'en']['LOGS']['IP']}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['LOGS'][
                                    'USERNAME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['LOGS'][
                                    'PASSWORD'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {LANG[userinfo?.language || 'en']['LOGS']['EMAIL']}
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['LOGS'][
                                    'PROCCESSED_TIME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {LANG[userinfo?.language || 'en']['LOGS']['RESULT']}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(
                        data,
                        ({
                            id,
                            ip,
                            username,
                            password,
                            email,
                            processed_time,
                            result,
                        }) => (
                            <Table.Row>
                                <Table.Cell>{id}</Table.Cell>
                                <Table.Cell>{ip}</Table.Cell>
                                <Table.Cell>{username}</Table.Cell>
                                <Table.Cell>{password}</Table.Cell>
                                <Table.Cell>{email}</Table.Cell>
                                <Table.Cell>
                                    {processed_time &&
                                        formatDate(new Date(processed_time))}
                                </Table.Cell>
                                <Table.Cell>
                                    {{ 50: <Icon name='check' /> }[result]}
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
                    size='mini'
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={3}
                    onPageChange={(e, { activePage }) => setPage(activePage)}
                    style={{ 'margin-bottom': '14px' }}
                />
            </Container>
        </Container>
    );
};

const NormalPanes = ({ userinfo }) => [
    {
        menuItem: LANG[userinfo?.language || 'en']['LOGS']['FLAG_SUBMIT'],
        render: () => {
            window.location.hash = '/admin/logs/submit_flag';
            return (
            <Tab.Pane
                attached={false}
                style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
                <FlagLogTable userinfo={userinfo} />
            </Tab.Pane>
        )},
    },
    {
        menuItem: LANG[userinfo?.language || 'en']['LOGS']['LOGIN'],
        render: () => {
            window.location.hash = '/admin/logs/login';
            return (
            <Tab.Pane
                attached={false}
                style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
                <LoginLogTable userinfo={userinfo} />
            </Tab.Pane>
        )},
    },
    {
        menuItem: LANG[userinfo?.language || 'en']['LOGS']['REGISTER'],
        render: () =>  {
            window.location.hash = '/admin/logs/register';
            return (
            <Tab.Pane
                attached={false}
                style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
                <RegisterLogTable userinfo={userinfo} />
            </Tab.Pane>
        )},
    },
    // {
    //     menuItem: 'Hell of Fame',
    //     render: () => (
    //         <Tab.Pane
    //             attached={false}
    //             style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
    //             <FlagLogTable />
    //         </Tab.Pane>
    //     ),
    // },
];

// const MobilePanes = ({userinfo}) => [
//     {
//         menuItem: '플래그 제출',
//         render: () => (
//             <Tab.Pane
//                 attached={false}
//                 style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
//                 <MobileRankTable userinfo={userinfo} />
//             </Tab.Pane>
//         ),
//     },
//     {
//         menuItem: 'Hell of Fame',
//         render: () => (
//             <Tab.Pane
//                 attached={false}
//                 style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
//                 <MobileRankTable />
//             </Tab.Pane>
//         ),
//     },
// ];

const Logs = ({ userinfo }) => {
    const { type } = useParams();
    if (!type) {
        window.location.hash = '/admin/logs/submit_flag';
    }

    return (
        <>
            <Responsive minWidth={992}>
                {userinfo?.token && <Tab 
                    defaultActiveIndex={({'submit_flag': 0, 'login': 1, 'register': 2})[type] || 0} panes={NormalPanes({ userinfo })} />}
            </Responsive>
            {/* <Responsive maxWidth={991}>
            <Tab panes={MobilePanes(userinfo)} />
        </Responsive> */}
        </>
    );
};

export { Logs };
