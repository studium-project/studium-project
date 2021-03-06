import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Message, Icon } from 'semantic-ui-react';
import { getChallenge, deleteChallenge } from '../../actions/admin';
import { formatDate, maskFlag } from '../../utils';
import { useParams, Link } from 'react-router-dom';

const ChallengeDelete = ({ userinfo }) => {
    const [data, setData] = useState(null);
    const [response, setResponse] = useState(null);
    let { challengeId } = useParams();

    useEffect(() => {
        if (data === null && userinfo?.token) {
            setData([]);
            getChallenge({ userinfo, id: challengeId }).then((challenges) =>
                setData(challenges)
            );
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
                            <Table.Cell width={2}>이름</Table.Cell>
                            <Table.Cell>{data?.name}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>출제자</Table.Cell>
                            <Table.Cell>{data?.author}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>포인트</Table.Cell>
                            <Table.Cell>{data?.point || 0}점</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>풀이수</Table.Cell>
                            <Table.Cell>0</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Button
                    color='red'
                    size='tiny'
                    onClick={() =>
                        deleteChallenge({
                            id: challengeId,
                            userinfo,
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

export { ChallengeDelete };
