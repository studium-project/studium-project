import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Message, Icon } from 'semantic-ui-react';
import { getUser, deleteUser } from '../../actions/admin';
import { formatDate2 } from '../../utils';
import { useParams } from 'react-router-dom';

const UserDelete = ({ userinfo }) => {
    const [user, setUser] = useState(null);
    const [response, setResponse] = useState(null);
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
                            <Table.Cell>이메일</Table.Cell>
                            <Table.Cell>{user?.email}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>가입일시</Table.Cell>
                            <Table.Cell>
                                {formatDate2(user?.registered_time)}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>국가</Table.Cell>
                            <Table.Cell>Korea, Republic of</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>점수</Table.Cell>
                            <Table.Cell>{user?.score}점</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Button
                    color='red'
                    size='tiny'
                    onClick={() =>
                        deleteUser({
                            userinfo,
                            id: userid,
                            setResponse,
                        })
                    }>
                    정말로 삭제한다
                </Button>
                <Button
                    color='grey'
                    size='tiny'
                    onClick={() => window.history.back()}>
                    취소
                </Button>
            </Message>
        </Container>
    );
};

export { UserDelete };
