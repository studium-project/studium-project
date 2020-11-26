import React, { Component, Fragment, useState } from 'react';

import { CONFIG } from '../../assets/CONFIG';
import { API_SERVER } from '../../config';
// const status = CONFIG['STATUS']['FLAG_LOG'];

const getUsers = ({ userinfo, page }) => {
    let limit = CONFIG['QUERY']['USERS_LIMIT'];
    let offset = limit * (page - 1);

    return new Promise((resolve) => {
        fetch(API_SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userinfo?.token,
            },
            body: JSON.stringify({
                query: CONFIG['QUERY']['USERS'],
                variables: {
                    limit,
                    offset,
                    type: 'users',
                },
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                const {
                    users,
                    total: { count },
                } = res.data;
                for (let i = 0; i < users.length; ++i) {
                    users[i].idx = offset + i + 1;
                }
                resolve({ users, count: Math.ceil(count / limit) });
            });
    });
};

export { getUsers };
