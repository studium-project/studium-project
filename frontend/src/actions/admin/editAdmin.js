import { CONFIG } from '../../assets';
import { makeResponse as r } from '../../utils';
const status = CONFIG['STATUS']['USER_EDIT'];

const editAdmin = ({
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
    console.log(CONFIG['QUERY']['EDIT_USER']);
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

    if (!email) {
        return setResponse(r(status.INVALID, '이메일를 입력해 주세요'));
    }
    if (!password) {
        return setResponse(r(status.INVALID, '비밀번호를 입력해 주세요'));
    }
    if (!passwordRepeat) {
        return setResponse(r(status.INVALID, '비밀번호를 입력해 주세요'));
    }
    if (password !== passwordRepeat) {
        return setResponse(r(status.INVALID, '비밀번호가 일치하지 않습니다'));
    }
    if (!nationality) {
        return setResponse(
            r(status.INVALID, '국가 정보가 입력되지 않았습니다')
        );
    }
};

export { editAdmin };
