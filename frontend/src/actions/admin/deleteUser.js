import { CONFIG } from '../../assets';
import { API_SERVER } from '../../config';
import { makeResponse as r } from '../../utils';
const status = CONFIG['STATUS']['USER_DELETE'];

const deleteUser = ({ userinfo, id, setResponse }) => {
    // console.log(token, id);

    setResponse(r(status.PROGRESS));

    fetch(API_SERVER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userinfo?.token,
        },
        body: JSON.stringify({
            query: CONFIG['QUERY']['DELETE_USER'],
            variables: {
                id,
            },
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            window.location.hash = '/admin/manage_users/normal';
            // try {
            //     const { message, code } = res.data.deleteuser;

            //     if (code === status.SUCCESS) {
            //         setResponse(r(status.SUCCESS, message));
            //     } else {
            //         return setResponse(r(status.INVALID, message));
            //     }
            // } catch (e) {
            //     setResponse(r(status.INVALID, 'Something Wrong'));
            // }
        });
};

export { deleteUser };
