import { CONFIG } from '../../assets';
import { API_SERVER } from '../../config';
import { makeResponse as r } from '../../utils';
const status = CONFIG['STATUS']['USER_EDIT'];

const editUser = ({
    userinfo,
    email,
    password,
    passwordRepeat,
    active,
    nationality,
    homepage,
    comment,
    setResponse,
    id,
}) => {
    console.log(
        userinfo,
        email,
        password,
        passwordRepeat,
        active,
        nationality,
        homepage,
        comment,
        id
    );

    setResponse(r(status.PROGRESS));

    if (!email) {
        return setResponse(r(status.INVALID, '이메일를 입력해 주세요'));
    }
    if ((password || passwordRepeat) && password !== passwordRepeat) {
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
            query: CONFIG['QUERY']['EDIT_USER'],
            variables: {
                id,
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
                const { message, code, id } = res.data.modifyUser;

                if (code === status.SUCCESS) {
                    window.location.hash = '/admin/user_details/' + id;
                    setResponse(r(status.SUCCESS, message));
                } else {
                    return setResponse(r(status.INVALID, message));
                }
            } catch (e) {
                setResponse(r(status.INVALID, 'Something Wrong'));
            }
        });
};

export { editUser };
