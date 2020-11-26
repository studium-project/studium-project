import React, { Component, Fragment, useState } from 'react';

import { CONFIG } from '../../assets/CONFIG';
import { API_SERVER } from '../../config';
// const status = CONFIG['STATUS']['FLAG_LOG'];

const getAdmins = ({ userinfo, page }) => {
    let limit = CONFIG['QUERY']['ADMINS_LIMIT'];
    let offset = limit * (page - 1);

    return new Promise((resolve) => {
        fetch(API_SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userinfo?.token,
            },
            body: JSON.stringify({
                query: CONFIG['QUERY']['ADMINS'],
                variables: {
                    limit,
                    offset,
                    type: 'admins',
                },
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                const {
                    admins,
                    total: { count },
                } = res.data;
                console.log(admins, count);
                for (let i = 0; i < admins.length; ++i) {
                    admins[i].idx = offset + i + 1;
                }
                resolve({ admins, count: Math.ceil(count / limit) });
            });
    });
};

export { getAdmins };
