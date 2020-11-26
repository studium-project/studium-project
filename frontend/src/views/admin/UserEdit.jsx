import React, { useState, useEffect } from 'react';
import {
    Table,
    Container,
    Button,
    Grid,
    Input,
    Checkbox,
    TextArea,
    Form,
    Dropdown,
    Message,
    Icon,
} from 'semantic-ui-react';

import { CONFIG } from '../../assets';
import { getUser, editUser } from '../../actions/admin';
import { formatDate } from '../../utils';
import { useParams, Redirect } from 'react-router-dom';
const status = CONFIG['STATUS']['USER_EDIT'];
const { COUNTRIES } = CONFIG;

const UserEdit = ({ userinfo }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [active, setActive] = useState(true);
    const [homepage, setHomepage] = useState('');
    const [nationality, setNationality] = useState('kr');
    const [comment, setComment] = useState(null);
    const [response, setResponse] = useState('');
    let { userid } = useParams();

    useEffect(() => {
        if (user === null && userinfo?.token) {
            setUser([]);
            getUser({ userinfo, id: userid }).then((user) => {
                setUser(user);
                setUsername(user.username);
                setEmail(user.email);
                setActive(user.active);
                setHomepage(user.homepage);
                setNationality(user.nationality);
                setComment(user.comment);
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
                    회원 정보 수정
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
                    저장중
                </Message>
            )} */}
            {/* {response.code === status.SUCCESS && (
                <Message positive style={{ 'margin-bottom': '0' }}>
                    <Icon name='check' />
                    {response.message || '수정되었습니다'}
                </Message>
            )} */}
            <Grid padded>
                <Grid.Row>
                    <Table definition size='small'>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>아이디</Table.Cell>
                                <Table.Cell>
                                    <Input defaultValue={username} disabled />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>이메일</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        placeholder='admin@studium.p6.is'
                                        value={email}
                                        onChange={(e, { value }) => {
                                            setEmail(value);
                                        }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>비밀번호</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        type='password'
                                        // placeholder='********'
                                        onChange={(e, { value }) => {
                                            setPassword(value);
                                        }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>비밀번호 확인</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        type='password'
                                        // placeholder='********'
                                        onChange={(e, { value }) => {
                                            setPasswordRepeat(value);
                                        }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>상태</Table.Cell>
                                <Table.Cell>
                                    <Checkbox
                                        size='small'
                                        checked={active}
                                        onClick={() => {
                                            setActive(!active);
                                        }}
                                        label={'\u2028'}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>국가</Table.Cell>
                                <Table.Cell>
                                    <Dropdown
                                        placeholder='Country'
                                        search
                                        selection
                                        options={COUNTRIES.map((x) => {
                                            delete x.flag;
                                            return x;
                                        })}
                                        onChange={(e, { value }) => {
                                            setNationality(value);
                                        }}
                                        value={nationality}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>홈페이지</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        fluid
                                        onChange={(e, { value }) => {
                                            setHomepage(value);
                                        }}
                                        defaultValue={homepage}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>소개</Table.Cell>
                                <Table.Cell>
                                    <Form size='small'>
                                        {typeof comment === 'string' && (
                                            <TextArea
                                                onChange={(e, { value }) => {
                                                    setComment(value);
                                                }}>
                                                {comment}
                                            </TextArea>
                                        )}
                                        {typeof comment !== 'string' && (
                                            <TextArea></TextArea>
                                        )}
                                    </Form>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>가입일시</Table.Cell>
                                <Table.Cell>
                                    {user?.registered_time &&
                                        formatDate(user?.registered_time)}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>점수</Table.Cell>
                                <Table.Cell>{user?.score || 0}점</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <Grid.Row centered>
                    <Button
                        size='tiny'
                        color='purple'
                        onClick={() =>
                            editUser({
                                userinfo,
                                email,
                                password,
                                passwordRepeat,
                                active,
                                nationality,
                                homepage,
                                comment,
                                setResponse,
                                id: userid,
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

export { UserEdit };
