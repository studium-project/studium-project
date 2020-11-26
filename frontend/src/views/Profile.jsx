import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, Message, TextArea } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { getProfile, saveProfile } from '../actions';
import { CONFIG, LANG } from '../assets';
const { COUNTRIES } = CONFIG;

function Profile({ userinfo }) {
    const [data, setData] = useState({});
    const [country, setCountry] = useState('kr');
    const [response, setResponse] = useState(null);

    useEffect(() => {
        setData(getProfile({ userinfo }));
    });

    if (userinfo.guest) {
        return <Redirect to='/login' />;
    }
    return (
        <Form>
            {response == '200' ? (
                <Message info>
                    <p>적용되었습니다.</p>
                </Message>
            ) : null}
            <Form.Field>
                <label>
                    {LANG[userinfo?.language || 'en']['PROFILE']['EMAIL']}
                </label>
                <input value={data.email} />
            </Form.Field>
            <Form.Field>
                <label>
                    {LANG[userinfo?.language || 'en']['PROFILE']['NICKNAME']}
                </label>
                <input value={data.username} />
                <small>변경하면 한달동안 변경이 불가능합니다.</small>
            </Form.Field>
            <Form.Field>
                <label>
                    {LANG[userinfo?.language || 'en']['PROFILE']['NATIONALITY']}
                </label>
                <Dropdown
                    placeholder='Country'
                    fluid
                    search
                    selection
                    value={country}
                    options={COUNTRIES.map((x) => {
                        delete x.flag;
                        return x;
                    })}
                    onChange={(e, { value }) => {
                        setCountry(value);
                    }}
                />
            </Form.Field>
            <Form.Field>
                <label>
                    {LANG[userinfo?.language || 'en']['PROFILE']['COMMENT']}
                </label>
                {typeof data?.comment === 'string' && (
                    <TextArea
                        placeholder='자신을 간략하게 소개해주세요.'
                        // value=
                    >
                        {data?.comment}
                    </TextArea>
                )}
            </Form.Field>
            <Form.Field>
                <label>
                    {LANG[userinfo?.language || 'en']['PROFILE']['PASSWORD']}
                </label>
                <input type='password' />
                {/* <small>
                    비밀번호 변경을 하고싶지 않은 경우 작성하실 필요가 없습니다.
                </small> */}
            </Form.Field>
            <Form.Field>
                <label>
                    {
                        LANG[userinfo?.language || 'en']['PROFILE'][
                            'PASSWORD_REPEAT'
                        ]
                    }
                </label>
                <input type='password' />
            </Form.Field>
            <Button
                type='submit'
                fluid
                color='purple'
                onClick={() =>
                    saveProfile({ userinfo, setResponse, newProfile: {} })
                }>
                적용
            </Button>
        </Form>
    );
}

export { Profile };
