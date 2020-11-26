import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
    Segment,
    Input,
    Grid,
    Divider,
    Icon,
    Container,
    Image,
} from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import { sendMessage, getMessage } from '../actions';
import { formatDate } from '../utils';

function _Message({ divider = true, username, timestamp, body }) {
    return (
        <>
            <b>{username}</b>{' '}
            <small style={{ color: '#999' }}>{formatDate(timestamp)}</small>
            <br />
            {body}
            <Route render={() => (divider ? <Divider fitted /> : null)} />
        </>
    );
}

function MessageSender({ userinfo, input, setInput, refresh }) {
    return (
        <Route
            render={() =>
                userinfo ? (
                    // logged in
                    <Form
                        onSubmit={() => {
                            if (input) {
                                sendMessage({ userinfo, input });
                                refresh();
                                setInput('');
                            }
                        }}>
                        <Grid>
                            <Grid.Column width={13}>
                                <Form.Input
                                    fluid
                                    placeholder='Please Be Gentle'
                                    onChange={({ target: { value } }) =>
                                        setInput(value)
                                    }
                                    value={input}
                                />
                            </Grid.Column>
                            <Grid.Column
                                width={3}
                                style={{ 'padding-left': '0' }}>
                                <Form.Button
                                    fluid
                                    style={{
                                        background: '#3bc089',
                                        color: 'white',
                                        'padding-left': '0',
                                        'padding-right': '0',
                                    }}>
                                    <Icon name='send' style={{ margin: '0' }} />
                                </Form.Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                ) : (
                    // no session
                    <Form
                        onSubmit={() => {
                            if (input) {
                                sendMessage({ userinfo, input });
                                refresh();
                                setInput('');
                            }
                        }}>
                        <Grid>
                            <Grid.Column width={14}>
                                <Form.Input
                                    fluid
                                    placeholder='Login First'
                                    // disabled
                                    value={''}
                                />
                            </Grid.Column>
                            <Grid.Column
                                width={2}
                                style={{ 'padding-left': '0' }}>
                                <Form.Button
                                    fluid
                                    style={{
                                        background: '#3bc089',
                                        color: 'white',
                                        'padding-left': '0',
                                        'padding-right': '0',
                                    }}>
                                    <Icon name='send' style={{ margin: '0' }} />
                                </Form.Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )
            }
        />
    );
}

function Chat({ userinfo, userInfo }) {
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [lastId, setLastId] = useState(null);

    const refresh = () => {
        if (lastId == null) {
            setLastId(getMessage(null).nextId);
        }

        let res = getMessage(lastId);
        if (
            res.code === 200 &&
            Array.isArray(res.data) &&
            res.data.length > 0
        ) {
            setData(data.concat(res.data));
            setLastId(res.nextId);
        }
    };

    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 1000);
        return () => clearInterval(interval);
    });

    return (
        <Container>
            <Segment.Group>
                <Segment style={{ height: '320px', 'overflow-y': 'scroll' }}>
                    {_.map(data, _Message)}
                </Segment>
                <Segment>
                    <MessageSender
                        userinfo={userinfo}
                        input={input}
                        setInput={setInput}
                        refresh={refresh}
                    />
                </Segment>
                {/* <Segment style={{ 'text-align': 'center' }}>
                    <img
                        src='/banner_728x90.webp'
                        style={{
                            width: '100%',
                            marginTop: '5px',
                            'max-width': '600px',
                        }}
                    />
                </Segment> */}
            </Segment.Group>
        </Container>
    );
}

export { Chat };
