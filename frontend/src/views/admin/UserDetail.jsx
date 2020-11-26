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
    Header,
    Grid,
    Segment,
    List,
    Divider,
    Label,
    Icon,
    Item,
    Checkbox,
} from 'semantic-ui-react';
import { getFlag, getUser } from '../../actions/admin';
import { formatDate, maskFlag, formatDate2 } from '../../utils';
import { useParams, Link } from 'react-router-dom';
import { CONFIG } from '../../assets';

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

const UserTable = ({ userinfo }) => {
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
                        {/* <Table.HeaderCell>국가</Table.HeaderCell> */}
                        <Table.HeaderCell>유저명</Table.HeaderCell>
                        <Table.HeaderCell>이메일</Table.HeaderCell>
                        <Table.HeaderCell>가입일시</Table.HeaderCell>
                        <Table.HeaderCell>최근인증</Table.HeaderCell>
                        <Table.HeaderCell>점수</Table.HeaderCell>
                        <Table.HeaderCell>정보</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>posix</Table.Cell>
                        <Table.Cell>posix@ruu.kr</Table.Cell>
                        {/* <Table.Cell>Da***</Table.Cell> */}
                        <Table.Cell>2020/06/13 11:52</Table.Cell>
                        <Table.Cell>2020/06/19 13:02</Table.Cell>
                        <Table.Cell>1.2k</Table.Cell>
                        <Table.Cell>
                            <Button size='mini' color='grey'>
                                상세
                            </Button>
                            <Button size='mini' color='purple'>
                                수정
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>03sunf</Table.Cell>
                        <Table.Cell>03sunf@ruu.kr</Table.Cell>
                        {/* <Table.Cell>Da***</Table.Cell> */}
                        <Table.Cell>2020/06/13 11:52</Table.Cell>
                        <Table.Cell>2020/06/19 13:02</Table.Cell>
                        <Table.Cell>880</Table.Cell>
                        <Table.Cell>
                            <Button size='mini' color='grey'>
                                상세
                            </Button>
                            <Button size='mini' color='purple'>
                                수정
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                {/* <Table.Body>
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
                                <Table.Cell>
                                    <Popup
                                        content={flag}
                                        inverted
                                        size='tiny'
                                        position='right center'
                                        trigger={<span>{maskFlag(flag)}</span>}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    {{ 30: '성공' }[result]}
                                </Table.Cell>
                            </Table.Row>
                        )
                    )}
                </Table.Body> */}
            </Table>
            <Container textAlign='center'>
                <Pagination
                    boundaryRange={0}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    siblingRange={1}
                    totalPages={3}
                    size='mini'
                    onPageChange={(e, { activePage }) => setPage(activePage)}
                    style={{ 'margin-bottom': '14px' }}
                />
            </Container>
        </Container>
    );
};

const AdminTable = ({ userinfo }) => {
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
                        <Table.HeaderCell>권한</Table.HeaderCell>
                        <Table.HeaderCell>유저명</Table.HeaderCell>
                        <Table.HeaderCell>비밀번호</Table.HeaderCell>
                        <Table.HeaderCell>생성일시</Table.HeaderCell>
                        <Table.HeaderCell>정보</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>최고관리자</Table.Cell>
                        <Table.Cell>admin</Table.Cell>
                        <Table.Cell>ad***</Table.Cell>
                        <Table.Cell>2020/06/20 14:07</Table.Cell>
                        <Table.Cell>
                            <Button size='mini' color='grey'>
                                상세
                            </Button>
                            <Button size='mini' color='purple'>
                                수정
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                {/* <Table.Body>
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
                                <Table.Cell>
                                    <Popup
                                        content={flag}
                                        inverted
                                        size='tiny'
                                        position='right center'
                                        trigger={<span>{maskFlag(flag)}</span>}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    {{ 30: '성공' }[result]}
                                </Table.Cell>
                            </Table.Row>
                        )
                    )}
                </Table.Body> */}
            </Table>
            <Container textAlign='center'>
                <Pagination
                    boundaryRange={0}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    size='mini'
                    siblingRange={1}
                    totalPages={3}
                    onPageChange={(e, { activePage }) => setPage(activePage)}
                    style={{ 'margin-bottom': '14px' }}
                />
            </Container>
        </Container>
    );
};

const NormalPanes = [
    {
        menuItem: '일반 회원',
        render: () => (
            <Tab.Pane
                attached={false}
                style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
                <UserTable />
            </Tab.Pane>
        ),
    },
    {
        menuItem: '관리자',
        render: () => (
            <Tab.Pane
                attached={false}
                style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
                <AdminTable />
            </Tab.Pane>
        ),
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

const MobilePanes = [
    {
        menuItem: '플래그 제출',
        render: () => (
            <Tab.Pane
                attached={false}
                style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
                <MobileRankTable />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'Hell of Fame',
        render: () => (
            <Tab.Pane
                attached={false}
                style={{ padding: '0', border: 'none', 'box-shadow': 'none' }}>
                <MobileRankTable />
            </Tab.Pane>
        ),
    },
];

const UserDetail = ({ userinfo }) => {
    const [user, setUser] = useState(null);
    let { userid } = useParams();

    useEffect(() => {
        if (user === null && userinfo?.token) {
            setUser([]);
            getUser({ userinfo, id: userid }).then((user) => {
                user.nationality = CONFIG['COUNTRIES'].filter(
                    (data) => data.key === user.nationality
                )[0].text;

                setUser(user);
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
                        회원 상세 정보
                    </span>
                </Grid.Row>
                <Grid.Row>
                    <Table definition size='small'>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>아이디</Table.Cell>
                                <Table.Cell>{user?.username}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>이메일</Table.Cell>
                                <Table.Cell>{user?.email}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>비밀번호</Table.Cell>
                                <Table.Cell>{user?.masked_password}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>상태</Table.Cell>
                                <Table.Cell>
                                    <Checkbox
                                        size='small'
                                        label={'\u2028'}
                                        checked={user?.active}
                                        disabled
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>국가</Table.Cell>
                                <Table.Cell>{user?.nationality}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>홈페이지</Table.Cell>
                                <Table.Cell>
                                    <a
                                        href={user?.homepage}
                                        className='dark_a'
                                        target='_blank'>
                                        {user?.homepage}
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>소개</Table.Cell>
                                <Table.Cell>{user?.comment}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>가입일시</Table.Cell>
                                <Table.Cell>
                                    {formatDate2(user?.registered_time)}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>점수</Table.Cell>
                                <Table.Cell>{user?.score}점</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <Grid.Row centered>
                    <Link to={'/admin/edit_user/' + userid}>
                        <Button size='tiny' color='purple'>
                            수정
                        </Button>
                    </Link>
                    <Link to={'/admin/delete_user/' + userid}>
                        <Button size='tiny' color='red'>
                            삭제
                        </Button>
                    </Link>
                    <Link to='/admin/manage_users/normal'>
                        <Button size='tiny'>
                            목록
                        </Button>
                    </Link>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export { UserDetail };
