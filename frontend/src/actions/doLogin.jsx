import React, { Component, Fragment, useState } from 'react';
import qrcode from 'qrcode';
import { API_SERVER } from '../config';
import { CONFIG, LANG } from '../assets';
import { makeResponse as r } from '../utils';

const status = CONFIG['STATUS']['LOGIN'];

function doLogin({
    username,
    password,
    setUsername,
    setPassword,
    setResponse,
    setUserinfo,
    setDone,
}) {
    setResponse(r(status.PROGRESS));

    fetch(API_SERVER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: CONFIG['QUERY']['LOGIN'],
            variables: { username, password },
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            const { token, message, code, score, nationality } = res.data.login;

            if (code === status.SUCCESS || code === status.ADMIN) {
                qrcode.toDataURL(username, (err, base64) => {
                    if (err) throw err;

                    let userinfo = {
                        // sid: 'asdf',
                        username,
                        language: 'kr' || 'kr',
                        // settings: { language: 'kr', keepSession: true },
                        imageUrl: base64,
                        token,
                        keepSession: false,
                        is_admin: !!(code === status.ADMIN),
                        score: score || 0,
                    };

                    // if (username === 'posix') {
                    //     userinfo.imageUrl = '/posix.jpg';
                    // }
                    // console.log(userinfo);

                    localStorage.setItem(
                        CONFIG['USER_INFO'],
                        JSON.stringify(userinfo)
                    );

                    setUserinfo(userinfo);
                    setDone(false);
                    setResponse(r(status.SUCCESS, message));
                });
            } else {
                return setResponse(r(status.INVALID, message));
            }
        })
        .catch((e) => setResponse(r(status.INVALID, 'Unknown Error')));
}

export { doLogin };
