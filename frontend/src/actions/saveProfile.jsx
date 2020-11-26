const TempData = {
    'code': 200
};

function saveProfile({userinfo, newProfile, setResponse}) {
    setResponse(TempData.code);
}

export { saveProfile };