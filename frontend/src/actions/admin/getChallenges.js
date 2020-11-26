import React, { Component, Fragment, useState } from 'react';
import { API_SERVER } from '../../config';
import { CONFIG } from '../../assets';

// const status = CONFIG['STATUS']['REGISTER'];

function getChallenges({ userinfo }) {
    return new Promise((resolve) => {
        fetch(API_SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userinfo?.token,
            },
            body: JSON.stringify({
                query: CONFIG['QUERY']['CHALLENGES'],
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                const { challenges } = res.data;
                for (let i = 0; i < challenges.length; ++i) {
                    challenges[i].idx = i + 1;
                }
                // console.log(challenges);
                resolve(challenges);
            });
    });
}

export { getChallenges };
