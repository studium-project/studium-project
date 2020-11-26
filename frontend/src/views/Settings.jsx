import React, { Component, useState, useEffect } from 'react';
import {
    Form,
    Header,
    Segment,
    Button,
    Dropdown,
    Message,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { saveSettings } from '../actions';
import { LANG } from '../assets';

function Settings({ userinfo }) {
    const [response, setResponse] = useState(null);
    const [language, setLanguage] = useState(null);
    const [keepSession, setKeepSession] = useState(true);

    if (userinfo.guest) {
        return <Redirect to='/login' />;
    }

    return (
        <Form>
            <Segment.Group>
                <Segment>
                    <Header textAlign='center' size='small'>
                        {LANG[userinfo.language || 'en']['SETTINGS']['HEADER']}
                    </Header>
                </Segment>
                <Segment style={{ 'font-size': '13px' }}>
                    {/* {response == '200' ? (
                        <Message info>
                            <p>적용되었습니다.</p>
                        </Message>
                    ) : null} */}
                    <Form.Field>
                        {LANG[userinfo.language || 'en']['SETTINGS']['STR1']}
                        &nbsp;
                        <Dropdown
                            inline
                            options={[
                                {
                                    key: 'kr',
                                    text:
                                        LANG[userinfo.language || 'en'][
                                            'SETTINGS'
                                        ]['LANGUAGE']['KR'],
                                    value: 'kr',
                                },
                                {
                                    key: 'en',
                                    text:
                                        LANG[userinfo.language || 'en'][
                                            'SETTINGS'
                                        ]['LANGUAGE']['EN'],
                                    value: 'en',
                                },
                            ]}
                            value={language || userinfo?.language}
                            onChange={(e, { value }) => setLanguage(value)}
                        />
                        &nbsp;
                        {LANG[userinfo.language || 'en']['SETTINGS']['STR2']}
                        &nbsp;
                        <Dropdown
                            inline
                            options={[
                                {
                                    key: 'true',
                                    text:
                                        LANG[userinfo.language || 'en'][
                                            'SETTINGS'
                                        ]['SESSION']['KEEP'],
                                    value: true,
                                },
                                {
                                    key: 'false',
                                    text:
                                        LANG[userinfo.language || 'en'][
                                            'SETTINGS'
                                        ]['SESSION']['EXPIRE'],
                                    value: false,
                                },
                            ]}
                            value={keepSession}
                            onChange={(e, { value }) => setKeepSession(value)}
                        />
                        &nbsp;
                        {LANG[userinfo.language || 'en']['SETTINGS']['STR3']}
                    </Form.Field>
                </Segment>
                <Segment>
                    <Button
                        fluid
                        size='small'
                        color='green'
                        onClick={() =>
                            saveSettings({
                                userinfo,
                                setResponse,
                                newSettings: { language, keepSession },
                            })
                        }>
                        {LANG[userinfo.language || 'en']['SETTINGS']['APPLY']}
                    </Button>
                </Segment>
            </Segment.Group>
        </Form>
    );
}

export { Settings };
