import React from 'react';
import { Redirect } from 'react-router-dom';
import { CONFIG } from '../assets';

const Logout = ({ setUserinfo, setDone, userinfo }) => {
    let info = { guest: true, language: userinfo.language };
    // console.log(info);
    setUserinfo(info);
    localStorage.setItem(CONFIG['USER_INFO'], JSON.stringify(info));
    setDone(false);
    return <Redirect to='/login' />;
};
export { Logout };
