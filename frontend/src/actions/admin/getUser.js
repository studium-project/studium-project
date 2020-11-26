import React, { Component, Fragment, useState } from 'react';

import { CONFIG } from '../../assets/CONFIG';
import { API_SERVER } from '../../config';

const getUser = ({ userinfo, id }) => {
    return new Promise((resolve) => {
        fetch(API_SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userinfo?.token,
            },
            body: JSON.stringify({
                query: CONFIG['QUERY']['USER'],
                variables: { id },
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                resolve(res.data.users[0]);
            });
    });
};

export { getUser };
