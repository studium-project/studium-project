const TempData1 = [
    {
        id: 1,
        username: 'posix',
        country: 'us',
        score: '12800',
        comment: 'http://p6.is',
        lastauth: 1578897192469,
    },
];

const TempData2 = [
    {
        id: 2,
        username: 'munsiwoo',
        country: 'tw',
        score: '12300',
        comment: 'http://munsiwoo.kr',
        lastauth: 1578894192469,
    },
];

function getRank(page) {
    return new Promise((r) => {
        return r(TempData1);
    });
    // if (page == 1) return TempData1;
    // else return TempData2;
}

export { getRank };
