import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Table,
    Container,
    Button,
    Grid,
    TextArea,
    Form,
    Dropdown,
} from 'semantic-ui-react';
import { getChallenge } from '../../actions/admin';
import { useParams, Link } from 'react-router-dom';
import { CONFIG } from '../../assets';

const ChallengeDetail = ({ userinfo }) => {
    const [data, setData] = useState(null);
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
            <Grid padded>
                <Grid.Row style={{ padding: 0, color: '#5d5d5d' }}>
                    <span
                        style={{
                            'font-weight': 'bold',
                            'margin-top': '6px',
                            'margin-left': '7px',
                        }}>
                        {' '}
                        문제 상세 정보
                    </span>
                </Grid.Row>
                <Grid.Row>
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
                                <Table.Cell>{data?.point}점</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>설명</Table.Cell>
                                <Table.Cell>
                                    <Form size='small'>
                                        <TextArea
                                            fluid
                                            disabled
                                            value={data?.description}
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
                                            disabled
                                            value={data?.hint}
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
                                        disabled
                                        value={data?.category}
                                        options={CONFIG['CATEGORY']}
                                    />
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
                    <Link to={'/admin/edit_challenge/' + data?.id}>
                        <Button size='tiny' color='purple'>
                            수정
                        </Button>
                    </Link>
                    <Link to={'/admin/delete_challenge/' + data?.id}>
                        <Button size='tiny' color='red'>
                            삭제
                        </Button>
                    </Link>
                    <Link to={'/admin/manage_challenges'}>
                        <Button size='tiny'>목록</Button>
                    </Link>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export { ChallengeDetail };
