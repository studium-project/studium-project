import React, { Component, Fragment, useState, useEffect } from 'react';
import {
    Tab,
    Grid,
    Menu,
    Container,
    Icon,
    Responsive,
    Message,
    Segment,
    Dropdown,
    Form,
    Header,
    Label,
} from 'semantic-ui-react';
import { HashRouter } from 'react-router-dom';
import { MobileLayout, NormalLayout } from './layouts';
import { CONFIG } from './assets';

function App() {
    const [userinfo, setUserinfo] = useState({});
    const [done, setDone] = useState(false);

    // console.log(userinfo);
    useEffect(() => {
        if (!done) {
            setUserinfo({});
            try {
                let info = JSON.parse(
                    localStorage.getItem(CONFIG['USER_INFO'])
                );

                if (info === null) {
                    let info = { guest: true };
                    if (!info.language) {
                        if (navigator.language === 'ko-KR') {
                            info.language = 'kr';
                            info.language = 'en';
                        } else {
                            info.language = 'en';
                        }
                    }
                    setUserinfo(info);
                    setDone(true);
                    return;
                }

                if (!info.language) {
                    if (navigator.language === 'ko-KR') {
                        info.language = 'kr';
                        info.language = 'en';
                    } else {
                        info.language = 'en';
                    }
                }
                setUserinfo(info);
                setDone(true);
            } catch (e) {
                let info = { guest: true };
                if (!info.language) {
                    if (navigator.language === 'ko-KR') {
                        info.language = 'kr';
                        info.language = 'en';
                    } else {
                        info.language = 'en';
                    }
                }
                setUserinfo(info);
                setDone(true);
            }
        }
    });
    return (
        <HashRouter>
            <Responsive minWidth={992}>
                <NormalLayout
                    userinfo={userinfo}
                    setUserinfo={setUserinfo}
                    setDone={setDone}
                />
            </Responsive>
            <Responsive maxWidth={991}>
                <MobileLayout userinfo={userinfo} setUserinfo={setUserinfo} />
            </Responsive>
        </HashRouter>
    );
}

export default App;
