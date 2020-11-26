import _ from 'lodash';
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
    Segment,
    Icon,
} from 'semantic-ui-react';

import { CONFIG } from '../../assets';
import { createUser } from '../../actions/admin';
import { Redirect } from 'react-router-dom';
const { COUNTRIES } = CONFIG;

const status = CONFIG['STATUS']['USER_CREATE'];

const UserCreate = ({ userinfo }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [active, setActive] = useState(true);
    const [homepage, setHomepage] = useState('');
    const [nationality, setNationality] = useState('kr');
    const [comment, setComment] = useState('');
    const [response, setResponse] = useState('');

    return (
        <Container>
            <div style={{ padding: 0, color: '#5d5d5d', 'margin-top': '6px' }}>
                <span
                    style={{
                        'font-weight': 'bold',
                        'margin-left': '7px',
                    }}>
                    회원 등록
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
                    <Redirect to='/' />
                    {response.message || 'Registered Successfully'}
                </Message>
            )} */}
            <Grid padded>
                <Grid.Row>
                    <Table definition size='small'>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}>아이디</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        // placeholder='admin'
                                        onChange={(e, { value }) => {
                                            setUsername(value);
                                        }}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>이메일</Table.Cell>
                                <Table.Cell>
                                    <Input
                                        // placeholder='admin@studium.p6.is'
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
                                        // placeholder='Country'
                                        search
                                        selection
                                        onChange={(e, { value }) => {
                                            setNationality(value);
                                        }}
                                        options={COUNTRIES.map((x) => {
                                            delete x.flag;
                                            return x;
                                        })}
                                        // defaultValue='kr'
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
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>소개</Table.Cell>
                                <Table.Cell>
                                    <Form size='small'>
                                        <TextArea
                                            onChange={(e, { value }) => {
                                                setComment(value);
                                            }}></TextArea>
                                    </Form>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <Grid.Row centered>
                    <Button
                        size='tiny'
                        color='purple'
                        onClick={() =>
                            createUser({
                                userinfo,
                                username,
                                email,
                                password,
                                passwordRepeat,
                                active,
                                nationality,
                                homepage,
                                comment,
                                setResponse,
                            })
                        }>
                        생성
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

export { UserCreate };
