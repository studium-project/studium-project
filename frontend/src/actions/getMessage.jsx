import { TempData } from '../vars';

function getMessage(lastId) {
    if (lastId === null)
        return ({"code": 200, "nextId": 1});
    else {
        return ({"code": 200, "nextId": TempData.length, "data": TempData.splice(lastId - 1)});
    }
}

export { getMessage, TempData };