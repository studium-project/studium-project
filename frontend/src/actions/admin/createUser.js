import { CONFIG } from '../../assets';
import { API_SERVER } from '../../config';
import { makeResponse as r } from '../../utils';
const status = CONFIG['STATUS']['USER_CREATE'];

const createUser = ({
    userinfo,
    username,
    email,
    password,
    passwordRepeat,
    active,
    nationality,
    homepage,
    comment,
    setResponse,
}) => {
    console.log(
        userinfo,
        username,
        email,
        password,
        passwordRepeat,
        active,
        nationality,
        homepage,
        comment
    );
    setResponse(r(status.PROGRESS));

    if (!username) {
        return setResponse(r(status.INVALID, '아이디를 입력해 주세요'));
    }
    if (!email) {
        return setResponse(r(status.INVALID, '이메일를 입력해 주세요'));
    }
    if (!password) {
        return setResponse(r(status.INVALID, '비밀번호를 입력해 주세요'));
    }
    if (!passwordRepeat) {
        return setResponse(r(status.INVALID, '비밀번호 확인을 입력해 주세요'));
    }
    if (password !== passwordRepeat) {
        return setResponse(r(status.INVALID, '비밀번호가 일치하지 않습니다'));
    }
    if (!nationality) {
        return setResponse(
            r(status.INVALID, '국가 정보가 입력되지 않았습니다')
        );
    }
    fetch(API_SERVER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userinfo?.token,
        },
        body: JSON.stringify({
            query: CONFIG['QUERY']['CREATE_USER'],
            variables: {
                username,
                email,
                password,
                active,
                nationality,
                homepage,
                comment,
            },
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            try {
                const { id, message, code } = res.data.createUser;

                if (code === status.SUCCESS) {
                    setResponse(r(status.SUCCESS, message));
                    window.location.hash = '/admin/user_details/' + id
                } else {
                    return setResponse(r(status.INVALID, message));
                }
            } catch {
                setResponse(r(status.INVALID, 'Something Wrong'));
            }
        });
};

export { createUser };
