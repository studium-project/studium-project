import React, { Component, Fragment, useState } from 'react';
import qrcode from 'qrcode';
import { API_SERVER } from '../config';
import { CONFIG } from '../assets';
import { makeResponse as r } from '../utils';

const status = CONFIG['STATUS']['REGISTER'];

function doRegister({
    username,
    password,
    email,
    setUsername,
    setPassword,
    setEmail,
    setResponse,
    setUserinfo,
    agree,
}) {
    if (!agree) {
        return setResponse(r(status.NEEDAGREE));
    }

    setResponse(r(status.PROGRESS));

    fetch(API_SERVER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: CONFIG['QUERY']['REGISTER'],
            variables: { username, password, email, nationality: 'us' },
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            try {
                const { token, message, code } = res.data.register;

                if (code === status.SUCCESS) {
                    qrcode.toDataURL(username, (err, base64) => {
                        if (err) throw err;

                        let userinfo = {
                            // sid: 'asdf',
                            username: username,
                            // language: 'kr',
                            // settings: { language: 'kr', keepSession: true },
                            keepSession: false,
                            imageUrl: base64,
                            token,
                            score: 1234,
                        };

                        localStorage.setItem(
                            CONFIG['USER_INFO'],
                            JSON.stringify(userinfo)
                        );

                        setUserinfo(userinfo);
                        setResponse(r(status.SUCCESS, message));
                    });
                } else {
                    return setResponse(r(status.INVALID, message));
                }
            } catch {
                setResponse(r(status.INVALID, 'Something Wrong'));
            }
        });
}

export { doRegister };
