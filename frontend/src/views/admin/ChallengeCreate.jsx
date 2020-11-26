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
import { createChallenge } from '../../actions/admin';
import { Redirect } from 'react-router-dom';
import { CONFIG } from '../../assets';

const status = CONFIG['STATUS']['CHALLENGE_CREATE'];

const ChallengeCreate = ({ userinfo }) => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [point, setPoint] = useState(100);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState([]);
    const [hint, setHint] = useState('');
    const [response, setResponse] = useState([]);

    return (
        <Container>
            <div style={{ padding: 0, color: '#5d5d5d', 'margin-top': '6px' }}>
                <span
                    style={{
                        'font-weight': 'bold',
                        'margin-left': '7px',
                    }}>
                    새로운 문제
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
            )}
            {response.code === status.SUCCESS && (
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
                                    <Dropdown
                                        fluid
                                        multiple
                                        selection
                                        options={CONFIG['CATEGORY']}
                                        onChange={(e, { value }) => {
                                            setCategory(value);
                                        }}
                                        value={category}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <Grid.Row centered>
                    <Button
                        size='tiny'
                        color='purple'
                        onClick={() => {
                            createChallenge({
                                userinfo,
                                name,
                                author,
                                point,
                                description,
                                category,
                                hint,
                                setResponse,
                            });
                        }}>
                        등록
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

export { ChallengeCreate };
