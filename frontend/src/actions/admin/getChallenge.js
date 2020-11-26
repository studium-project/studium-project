import React, { Component, Fragment, useState } from 'react';
import { API_SERVER } from '../../config';
import { CONFIG } from '../../assets';

function getChallenge({ userinfo, id }) {
    return new Promise((resolve) => {
        // console.log(id);
        fetch(API_SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userinfo?.token,
            },
            body: JSON.stringify({
                query: CONFIG['QUERY']['CHALLENGE'],
                variables: { id },
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);
                res.data.challenges[0].description = res.data.challenges[0].description.replace(
                    /  \n/g,
                    '\n'
                );
                res.data.challenges[0].hint = res.data.challenges[0].hint.replace(
                    /  \n/g,
                    '\n'
                );
                resolve(res.data.challenges[0]);
            });
    });
}

export { getChallenge };
