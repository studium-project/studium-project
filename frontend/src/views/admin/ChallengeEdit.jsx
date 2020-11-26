import React, { useState, useEffect } from 'react';
import {
    Table,
    Container,
    Button,
    Grid,
    TextArea,
    Form,
    Dropdown,
    Input,
    Message,
    Icon,
} from 'semantic-ui-react';
import { getChallenge, editChallenge } from '../../actions/admin';
import { useParams } from 'react-router-dom';
import { CONFIG } from '../../assets';

const status = CONFIG['STATUS']['CHALLENGE_EDIT'];

const ChallengeEdit = ({ userinfo }) => {
    const [data, setData] = useState(null);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [point, setPoint] = useState(100);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState([]);
    const [hint, setHint] = useState('');
    const [response, setResponse] = useState([]);
    let { challengeId } = useParams();

    useEffect(() => {
        if (data === null && userinfo?.token) {
            setData([]);
            getChallenge({ userinfo, id: challengeId }).then((challenge) => {
                setData(challenge);
                setName(challenge.name);
                setAuthor(challenge.author);
                setPoint(challenge.point);
                setDescription(challenge.description);
                setCategory(challenge.category);
                setHint(challenge.hint);
            });
        }
    });

    return (
        <Container>
            <div style={{ padding: 0, color: '#5d5d5d', 'margin-top': '6px' }}>
                <span
                    style={{
                        'font-weight': 'bold',
                        'margin-left': '7px',
                    }}>
                    문제 정보 수정
                </span>
            </div>
            {response.code === status.INVALID && (
                <Message warning style={{ 'margin-bottom': '0' }}>
                    <Icon name='exclamation' />
                    {response.message || 'Invalid Request'}
                </Message>
            )}
            {/* {response.code === status.PROGRESS && (
                <Message info style={{ 'margin-bottom': '0' }}>
                    등록 중
                </Message>
            )} */}
            {/* {response.code === status.SUCCESS && (
                <Message positive style={{ 'margin-bottom': '0' }}>
                    <Icon name='check' />
                    {response.message || 'Registered Successfully'}
                </Message>
            )} */}
            <Grid padded>
                <Grid.Row>
                    <Table definition size='small'>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>이름</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        onChange={(e, { value }) => {
                                            setName(value);
                                        }}
                                        value={name}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>출제자</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        onChange={(e, { value }) => {
                                            setAuthor(value);
                                        }}
                                        value={author}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>포인트</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        type='number'
                                        onChange={(e, { value }) => {
                                            setPoint(parseInt(value));
                                        }}
                                        value={point}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>내용</Table.Cell>
                                <Table.Cell>
                                    <Form size='small'>
                                        <TextArea
                                            fluid
                                            onChange={(e, { value }) => {
                                                setDescription(value);
                                            }}
                                            value={description}
                                        />
                                    </Form>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>힌트</Table.Cell>
                                <Table.Cell>
                                    <Form size='small'>
                                        <TextArea
                                            fluid
                                            onChange={(e, { value }) => {
                                                setHint(value);
                                            }}
                                            value={hint}
                                        />
                                    </Form>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>카테고리</Table.Cell>
                                <Table.Cell>
                                    {data?.category && (
                                        <Dropdown
                                            fluid
                                            multiple
                                            selection
                                            onChange={(e, { value }) => {
                                                setCategory(value);
                                            }}
                                            value={category}
                                            options={CONFIG['CATEGORY']}
                                        />
                                    )}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>풀이수</Table.Cell>
                                <Table.Cell>0</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <Grid.Row centered>
                    <Button
                        size='tiny'
                        color='purple'
                        onClick={() =>
                            editChallenge({
                                id: challengeId,
                                userinfo,
                                name,
                                author,
                                point,
                                description,
                                category,
                                hint,
                                setResponse,
                            })
                        }>
                        적용
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

export { ChallengeEdit };
