import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Table,
    Container,
    Tab,
    Popup,
    Flag,
    Button,
    Pagination,
    Responsive,
    Label,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getFlag, getLogin, getRegister } from '../../actions/admin';
import { formatDate, maskFlag } from '../../utils';
import { getChallenges } from '../../actions/admin';
import capitalize from 'capitalize';
import { LANG } from '../../assets';

const UserTable = ({ userinfo }) => {
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        if (data === null && userinfo?.token) {
            setData([]);
            getChallenges({ userinfo }).then((challenges) =>
                setData(challenges)
            );
        }
    });

    return (
        <Container>
            <Link to='/admin/create_challenge'>
                <Button
                    style={{
                        float: 'right',
                        'margin-bottom': '12px',
                        'letter-spacing': '1px',
                    }}
                    size='tiny'>
                    {
                        LANG[userinfo?.language || 'en']['CHALLENGES'][
                            'NEW_CHALLENGE'
                        ]
                    }
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
                        <Table.HeaderCell width={4}>
                            {
                                LANG[userinfo?.language || 'en']['CHALLENGES'][
                                    'NAME'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['CHALLENGES'][
                                    'POINTS'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['CHALLENGES'][
                                    'SOLVES'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['CHALLENGES'][
                                    'AUTHOR'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['CHALLENGES'][
                                    'TAGS'
                                ]
                            }
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {
                                LANG[userinfo?.language || 'en']['CHALLENGES'][
                                    'INFO'
                                ]
                            }
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
                                name,
                                author,
                                category,
                                description,
                                hint,
                                solves,
                                point,
                            }) => (
                                <Table.Row>
                                    <Table.Cell>{idx}</Table.Cell>
                                    <Table.Cell>{name}</Table.Cell>
                                    <Table.Cell>{point}</Table.Cell>
                                    <Table.Cell>{solves}</Table.Cell>
                                    <Table.Cell>{author}</Table.Cell>
                                    <Table.Cell>
                                        {category.map((tag) => (
                                            <Label
                                                inverted
                                                basic
                                                style={{
                                                    padding: '5px 9px',
                                                    'font-size': '13px',
                                                    'font-weight': '400',
                                                    color: '#474747',
                                                    'font-family':
                                                        'Ubuntu Mono',
                                                    'letter-spacing': '0px',
                                                }}>
                                                {tag}
                                            </Label>
                                        ))}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            to={
                                                '/admin/challenge_details/' + id
                                            }>
                                            <Button size='mini' color='purple'>
                                                {
                                                    LANG[
                                                        userinfo?.language ||
                                                            'en'
                                                    ]['CHALLENGES']['DETAILS']
                                                }
                                            </Button>
                                        </Link>
                                        <Link
                                            to={'/admin/edit_challenge/' + id}>
                                            <Button size='mini' color='purple'>
                                                {
                                                    LANG[
                                                        userinfo?.language ||
                                                            'en'
                                                    ]['CHALLENGES']['MODIFY']
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
        menuItem: LANG[userinfo?.language || 'en']['CHALLENGES']['HEADER'],
        render: () => (
            <Tab.Pane
                attached={false}
                style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
                <UserTable userinfo={userinfo} />
            </Tab.Pane>
        ),
    },
    // {
    //     menuItem: '관리자',
    //     render: () => (
    //         <Tab.Pane
    //             attached={false}
    //             style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
    //             <AdminTable />
    //         </Tab.Pane>
    //     ),
    // },
];

const MobilePanes = [
    // {
    //     menuItem: '플래그 제출',
    //     render: () => (
    //         <Tab.Pane
    //             attached={false}
    //             style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
    //             <MobileRankTable />
    //         </Tab.Pane>
    //     ),
    // },
    // {
    //     menuItem: 'Hell of Fame',
    //     render: () => (
    //         <Tab.Pane
    //             attached={false}
    //             style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
    //             <MobileRankTable />
    //         </Tab.Pane>
    //     ),
    // },
];

const Challenges = ({ userinfo }) => (
    <>
        <Responsive minWidth={992}>
            <Tab panes={NormalPanes({ userinfo })} />
        </Responsive>
        <Responsive maxWidth={991}>
            <Tab panes={MobilePanes} />
        </Responsive>
    </>
);

export { Challenges };
