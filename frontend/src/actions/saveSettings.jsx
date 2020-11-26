const TempData = {
    'code': 200
};

function saveSettings({userinfo, newSettings, setResponse}) {
    setResponse(TempData.code);
}

export { saveSettings };