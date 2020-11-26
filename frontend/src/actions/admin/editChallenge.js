import { CONFIG } from '../../assets';
import { API_SERVER } from '../../config';
import { makeResponse as r } from '../../utils';

const status = CONFIG['STATUS']['CHALLENGE_EDIT'];

const editChallenge = ({
    id,
    userinfo,
    name,
    author,
    point,
    description,
    category,
    hint,
    setResponse,
}) => {
    if (!name) {
        return setResponse(r(status.INVALID, '이름을 입력해 주세요'));
    }
    if (!author) {
        return setResponse(r(status.INVALID, '출제자를 입력해 주세요'));
    }
    if (!description) {
        return setResponse(r(status.INVALID, '내용을 입력해 주세요'));
    }

    description = description.replace(/\n/g, '  \n');
    hint = hint.replace(/\n/g, '  \n');

    fetch(API_SERVER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userinfo.token,
        },
        body: JSON.stringify({
            query: CONFIG['QUERY']['EDIT_CHALLENGE'],
            variables: {
                name,
                author,
                point,
                description,
                category,
                hint,
                id,
            },
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            try {
                const { message, code, id } = res.data.modifyChall;

                if (code === status.SUCCESS) {
                    window.location.hash = '/admin/challenge_details/' + id;
                    setResponse(r(status.SUCCESS, message));
                } else {
                    return setResponse(r(status.INVALID, message));
                }
            } catch {
                setResponse(r(status.INVALID, 'Something Wrong'));
            }
        });
};

export { editChallenge };
