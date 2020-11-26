import React, { Component, Fragment, useState } from 'react';

import { CONFIG } from '../../assets/CONFIG';
const status = CONFIG['STATUS']['REGISTER_LOG'];

const TempData = [
    {
        id: 1,
        ip: '10.35.23.176',
        username: 'posix',
        password: 'Da******',
        email: 'admin@ruu.kr',
        processed_time: 1592629641137,
        result: status.CORRECT,
    },
];
const getRegister = ({ userinfo }) => {
    return TempData;
};

export { getRegister };
