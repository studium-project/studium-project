import { CONFIG } from '../../assets';
import { API_SERVER } from '../../config';
import { makeResponse as r } from '../../utils';
const status = CONFIG['STATUS']['USER_CREATE'];

const createAdmin = ({
    userinfo,
    username,
    password,
    passwordRepeat,
    active,
    role,
    privilege,
    setResponse,
}) => {
    console.log(
        userinfo,
        username,
        password,
        passwordRepeat,
        active,
        role,
        privilege
    );
    setResponse(r(status.PROGRESS));

    if (!username) {
        return setResponse(r(status.INVALID, '아이디를 입력해 주세요'));
    }
    if (!password) {
        return setResponse(r(status.INVALID, '비밀번호를 입력해 주세요'));
    }
    if (!passwordRepeat) {
        return setResponse(r(status.INVALID, '비밀번호 확인을 입력해 주세요'));
    }
    if (!role) {
        return setResponse(r(status.INVALID, '역할을 입력해 주세요'));
    }
    if (!Array.isArray(privilege)) {
        return setResponse(r(status.INVALID, '올바르지 않은 권한 입니다.'));
    }
    fetch(API_SERVER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: CONFIG['QUERY']['REGISTER'],
            variables: {
                userinfo,
                username,
                password,
                active,
                role,
                privilege,
                token: userinfo.token,
            },
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            try {
                const { token, message, code } = res.data.register;

                if (code === status.SUCCESS) {
                    setResponse(r(status.SUCCESS, message));
                } else {
                    return setResponse(r(status.INVALID, message));
                }
            } catch {
                setResponse(r(status.INVALID, 'Something Wrong'));
            }
        });
};

export { createAdmin };
