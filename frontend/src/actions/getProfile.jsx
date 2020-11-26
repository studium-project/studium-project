const TempData = {
    email: 'admin@example.com',
    username: 'admin',
    country: 'kr',
    comment: '잘 부탁드립니다.',
};

function getProfile({ userinfo }) {
    return TempData;
}

export { getProfile };
