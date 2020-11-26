import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Table,
    Container,
    Tab,
    Flag,
    Pagination,
    Responsive,
} from 'semantic-ui-react';
import { getRank } from '../actions';
import { LANG } from '../assets';
import { formatDate2 } from '../utils';

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
        getRank(page).then((data) => {
            console.log(data);
            setData(data);
        });
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
                            }>
                            #
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={pivot === 'username' ? direction : null}
                            onClick={() =>
                                handleSort({
                                    pivot,
                                    setPivot,
                                    data,
                                    setData,
                                    direction,
                                    setDirection,
                                    column: 'username',
                                })
                            }>
                            닉네임
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={pivot === 'country' ? direction : null}
                            onClick={() =>
                                handleSort({
                                    pivot,
                                    setPivot,
                                    data,
                                    setData,
                                    direction,
                                    setDirection,
                                    column: 'country',
                                })
                            }>
                            국가
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={pivot === 'score' ? direction : null}
                            onClick={() =>
                                handleSort({
                                    pivot,
                                    setPivot,
                                    data,
                                    setData,
                                    direction,
                                    setDirection,
                                    column: 'score',
                                })
                            }>
                            점수
                        </Table.HeaderCell>
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

function NormalRankTable({ userinfo }) {
    const [pivot, setPivot] = useState(null);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastpage] = useState(1);
    const [direction, setDirection] = useState(null);

    useEffect(() => {
        getRank(page).then((data) => {
            console.log(data);
            setData(data);
        });
        // let rankData = getRank(page);
        // if (Array.isArray(rankData)) setData(rankData);
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
                            }>
                            #
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            width={2}
                            sorted={pivot === 'username' ? direction : null}
                            onClick={() =>
                                handleSort({
                                    pivot,
                                    setPivot,
                                    data,
                                    setData,
                                    direction,
                                    setDirection,
                                    column: 'username',
                                })
                            }>
                            {
                                LANG[userinfo?.language || 'en']['RANK'][
                                    'USERNAME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            width={1}
                            sorted={pivot === 'country' ? direction : null}
                            onClick={() =>
                                handleSort({
                                    pivot,
                                    setPivot,
                                    data,
                                    setData,
                                    direction,
                                    setDirection,
                                    column: 'country',
                                })
                            }>
                            {
                                LANG[userinfo?.language || 'en']['RANK'][
                                    'NATIONALITY'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            width={2}
                            sorted={pivot === 'score' ? direction : null}
                            onClick={() =>
                                handleSort({
                                    pivot,
                                    setPivot,
                                    data,
                                    setData,
                                    direction,
                                    setDirection,
                                    column: 'score',
                                })
                            }>
                            {LANG[userinfo?.language || 'en']['RANK']['SCORE']}
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={pivot === 'homepage' ? direction : null}
                            width={3}
                            onClick={() =>
                                handleSort({
                                    pivot,
                                    setPivot,
                                    data,
                                    setData,
                                    direction,
                                    setDirection,
                                    column: 'homepage',
                                })
                            }>
                            {
                                LANG[userinfo?.language || 'en']['RANK'][
                                    'HOMEPAGE'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={pivot === 'comment' ? direction : null}
                            width={5}
                            onClick={() =>
                                handleSort({
                                    pivot,
                                    setPivot,
                                    data,
                                    setData,
                                    direction,
                                    setDirection,
                                    column: 'comment',
                                })
                            }>
                            {
                                LANG[userinfo?.language || 'en']['RANK'][
                                    'COMMENT'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={pivot === 'lastauth' ? direction : null}
                            onClick={() =>
                                handleSort({
                                    pivot,
                                    setPivot,
                                    data,
                                    setData,
                                    direction,
                                    setDirection,
                                    column: 'lastauth',
                                })
                            }>
                            {
                                LANG[userinfo?.language || 'en']['RANK'][
                                    'LAST_AUTH'
                                ]
                            }
                        </Table.HeaderCell>
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
                                <Table.Cell>
                                    <a
                                        href='https://studium.p6.is'
                                        target='_blank'
                                        className='dark_a'>
                                        studium.p6.is
                                    </a>
                                </Table.Cell>
                                <Table.Cell>잘 부탁드립니다</Table.Cell>
                                <Table.Cell>{formatDate2(lastauth)}</Table.Cell>
                            </Table.Row>
                        )
                    )}
                </Table.Body>
            </Table>
            <Container textAlign='center'>
                <Pagination
                    size='tiny'
                    boundaryRange={0}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    disabled={lastPage <= 1}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={lastPage}
                    onPageChange={(e, { activePage }) => setPage(activePage)}
                    style={{ 'margin-bottom': '14px' }}
                />
            </Container>
        </Container>
    );
}

const NormalPanes = ({ userinfo }) => [
    {
        menuItem: LANG[userinfo?.language || 'en']['RANK']['RANKING'],
        render: () => (
            <Tab.Pane
                attached={false}
                style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
                <NormalRankTable userinfo={userinfo} />
            </Tab.Pane>
        ),
    },
    {
        menuItem: LANG[userinfo?.language || 'en']['RANK']['HELL_OF_FAME'],
        render: () => (
            <Tab.Pane
                attached={false}
                style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
                <NormalRankTable userinfo={userinfo} />
            </Tab.Pane>
        ),
    },
];

// const MobilePanes = ()=> [
//     {
//         menuItem: '순위',
//         render: () => (
//             <Tab.Pane
//                 attached={false}
//                 style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
//                 <MobileRankTable />
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

const Rank = ({ userinfo }) => (
    <>
        <Responsive minWidth={992}>
            <Tab panes={NormalPanes({ userinfo })} />
        </Responsive>
        {/* <Responsive maxWidth={991}>
            <Tab panes={MobilePanes({userinfo})} userinfo={userinfo} />
        </Responsive> */}
    </>
);

export { Rank };
