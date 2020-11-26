import { TempData } from '../vars';

function sendMessage({userinfo, input}) {
    // TODO: sid 기반으로 동작하도록 바꿔야함
    TempData.push({
        'id': TempData.length,
        'username': userinfo.username,
        'timestamp': 1578563233642,
        'body': input
    })
    return;
}

export { sendMessage };