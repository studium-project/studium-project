import React, { Component, Fragment, useState } from 'react';

import { CONFIG } from '../../assets/CONFIG';
import { API_SERVER } from '../../config';

const getAdmin = ({ userinfo, id }) => {
    return new Promise((resolve) => {
        console.log(id);
        fetch(API_SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userinfo?.token,
            },
            body: JSON.stringify({
                query: CONFIG['QUERY']['ADMIN'],
                variables: { id },
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                resolve(res.data.admins[0]);
            });
    });
};

export { getAdmin };
