import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
    Icon,
    Dropdown,
    Tab,
    Segment,
    Grid,
    Label,
    Form,
    Message,
    Table,
    Button,
} from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import { getChallenges } from '../actions';
import { debug } from '../utils';
import capitalize from 'capitalize';
import { LANG } from '../assets';

const panes = ({ description, hint, userinfo }) => [
    {
        menuItem: LANG[userinfo?.language || 'en']['CHALLENGES']['DESCRIPTION'],
        render: () => (
            <Tab.Pane attached={false} className='new-font'>
                <ReactMarkdown
                    source={description}
                    renderers={{
                        link: (props) => (
                            <a
                                href={props.href}
                                target='_blank'
                                style={{ 'font-family': 'Raleway' }}>
                                {props.children}
                            </a>
                        ),
                    }}
                />
            </Tab.Pane>
        ),
    },
    hint && {
        menuItem: LANG[userinfo?.language || 'en']['CHALLENGES']['HINT'],
        render: () => (
            <Tab.Pane attached={false} className='new-font'>
                <ReactMarkdown
                    source={hint}
                    renderers={{
                        link: (props) => (
                            <a href={props.href} target='_blank'>
                                {props.children}
                            </a>
                        ),
                    }}
                />
            </Tab.Pane>
        ),
    },
    {
        menuItem:
            LANG[userinfo?.language || 'en']['CHALLENGES']['HELL_OF_FAME'],
        render: () => (
            <Table singleLine selectable textAlign='center' size='small'>
                <Table.Header>
                    <Table.HeaderCell width={2}>#</Table.HeaderCell>
                    <Table.HeaderCell width={3}>
                        {
                            LANG[userinfo?.language || 'en']['CHALLENGES'][
                                'SOLVER'
                            ]
                        }
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {
                            LANG[userinfo?.language || 'en']['CHALLENGES'][
                                'SUBMITTED_TIME'
                            ]
                        }
                    </Table.HeaderCell>
                </Table.Header>
                <Table.Row>
                    <Table.Cell>1st</Table.Cell>
                    <Table.Cell>Balsn</Table.Cell>
                    <Table.Cell>2020/06/20 08:00</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>2nd</Table.Cell>
                    <Table.Cell>Defenit</Table.Cell>
                    <Table.Cell>2020/06/20 08:00</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>3rd</Table.Cell>
                    <Table.Cell>SED</Table.Cell>
                    <Table.Cell>2020/06/20 08:00</Table.Cell>
                </Table.Row>
            </Table>
        ),
    },
];

const Challenge = ({ userinfo }) => {
    const [data, setData] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        if (data === null && userinfo.token) {
            setData([]);

            getChallenges({ userinfo }).then(({ challenges }) =>
                setData(challenges)
            );
        }
    });

    return (
        <>
            {/* {response == 200 && <Message info content='인증되었습니다.' />}
            {response == 403 && (
                <Message negative content='잘못된 플래그입니다.' />
            )} */}
            <Form style={{ 'flex-grow': '0' }}>
                <Form.Field>
                    <Form.Group>
                        <Form.Input
                            width={13}
                            placeholder='Studium\{[a-zA-Z0-9_]{8,64}\}'
                        />
                        <Form.Button width={3} fluid color='violet'>
                            {
                                LANG[userinfo?.language || 'en']['CHALLENGES'][
                                    'SUBMIT'
                                ]
                            }
                        </Form.Button>
                    </Form.Group>
                </Form.Field>
            </Form>
            {_.map(
                data,
                ({
                    name,
                    solved,
                    solvers,
                    point,
                    category,
                    description,
                    hint,
                    solves,
                }) => {
                    solved = Math.random() < 0.5;
                    return (
                        <Segment.Group
                            style={{
                                'margin-top': '10px',
                                'margin-bottom': '10px',
                                'flex-grow': '0',
                            }}
                            inverted>
                            <Segment
                                secondary={solved}
                                style={{ padding: '0.6em 1em' }}>
                                <Grid>
                                    <Grid.Column
                                        width={12}
                                        style={{
                                            'letter-spacing': '1px',
                                        }}>
                                        <Icon
                                            name={solved ? 'check' : 'dna'}
                                            style={{ 'margin-right': '5px' }}
                                        />
                                        <span style={{ marginRight: '8px' }}>
                                            {name}
                                        </span>
                                        {category.map((tag) => (
                                            <Label
                                                inverted
                                                basic
                                                style={{
                                                    padding: '5px 9px',
                                                    'font-size': '13px',
                                                    'font-weight': '400',
                                                    color: '#474747',
                                                    'font-family':
                                                        'Ubuntu Mono',
                                                    'letter-spacing': '0px',
                                                }}>
                                                {tag}
                                            </Label>
                                        ))}
                                    </Grid.Column>
                                    <Grid.Column
                                        width={4}
                                        textAlign='right'
                                        style={{
                                            marginTop: '1px',
                                            marginBottom: '-8px',
                                            fontStyle: 'italic',
                                        }}>
                                        <span style={{ lineHeight: '23px' }}>
                                            {point}
                                            {
                                                LANG[
                                                    userinfo?.language || 'en'
                                                ]['CHALLENGES']['POINT']
                                            }
                                        </span>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment>
                                <Tab
                                    menu={{ secondary: true }}
                                    panes={panes({
                                        description,
                                        hint,
                                        userinfo,
                                    })}
                                />
                                <Grid style={{ padding: '0em' }}>
                                    <Grid.Column
                                        floated='left'
                                        width={5}
                                        verticalAlign='middle'
                                    />
                                    <Grid.Column
                                        floated='right'
                                        width={5}
                                        textAlign='right'
                                        style={{ padding: '0.3em 0.5em 0' }}
                                        verticalAlign='middle'
                                    />
                                </Grid>
                            </Segment>
                            {/* {category.length > 0 && (
                                <Segment
                                    style={{
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}>
                                </Segment>
                            )} */}
                        </Segment.Group>
                    );
                }
            )}
        </>
    );
};

export { Challenge };
