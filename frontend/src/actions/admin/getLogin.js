import React, { Component, Fragment, useState } from 'react';

import { CONFIG } from '../../assets/CONFIG';
const status = CONFIG['STATUS']['LOGIN_LOG'];

const TempData = [
    {
        id: 1,
        ip: '10.35.23.176',
        username: 'posix',
        password: 'Da******',
        processed_time: 1592629641137,
        fail_count: 0,
        result: status.CORRECT,
    },
];
const getLogin = ({ userinfo }) => {
    return TempData;
};

export { getLogin };
