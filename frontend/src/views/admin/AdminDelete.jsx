import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Table,
    Container,
    Tab,
    Flag,
    Button,
    Pagination,
    Message,
    Icon,
    Segment,
} from 'semantic-ui-react';
import { getFlag, getLogin, getRegister, getUser } from '../../actions/admin';
import { formatDate2, maskFlag } from '../../utils';
import { useParams, Link } from 'react-router-dom';

const AdminDelete = ({ userinfo }) => {
    const [user, setUser] = useState(null);
    let { userid } = useParams();

    useEffect(() => {
        if (user === null && userinfo?.token) {
            setUser([]);
            getUser({ userinfo, id: userid }).then((user) => {
                setUser(user);
            });
        }
    });

    return (
        <Container>
            <Message style={{ 'text-align': 'center' }} inverted>
                <Message
                    size='tiny'
                    color='red'
                    style={{ 'text-align': 'center' }}>
                    <Message.Content>
                        <Message.Header>
                            <Icon name='warning sign' />
                            경고! 이 작업은 되돌릴 수 없습니다
                        </Message.Header>
                        <p>확실한 경우에만 진행해 주세요</p>
                    </Message.Content>
                </Message>

                <Table definition size='small'>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell width={2}>아이디</Table.Cell>
                            <Table.Cell>{user?.username}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>비밀번호</Table.Cell>
                            <Table.Cell>{user?.masked_password}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>가입일시</Table.Cell>
                            <Table.Cell>
                                {formatDate2(user?.registered_time)}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>권한</Table.Cell>
                            <Table.Cell>최고관리자</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Button color='red' size='tiny'>
                    정말로 삭제한다
                </Button>
                {/* <Link to='/admin/user_details/1'> */}
                <Button
                    color='grey'
                    size='tiny'
                    onClick={() => window.history.back()}>
                    취소
                </Button>
                {/* </Link> */}
            </Message>
        </Container>
    );
};

export { AdminDelete };
