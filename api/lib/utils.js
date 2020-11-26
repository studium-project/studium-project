const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { COUNTRY } = require('../assets/config');
const { MONGO_URL, SALT, JWT_SECRET } = require('./config');
const { MongoClient } = require('mongodb');

const hashPwd = (password) => {
    password = crypto
        .createHash('sha256')
        .update(password + SALT)
        .digest()
        .toString('hex');

    password = crypto
        .createHash('sha256')
        .update(password)
        .digest()
        .toString('hex');

    return password;
};

const makeResponse = (code, message, data = {}) => {
    data.code = code;
    data.message = message;

    return data;
};

const signJWT = (data) => {
    return jwt.sign(data, JWT_SECRET);
};

const trimAll = (data) => {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            try {
                data[key] = data[key].trim();
            } catch {
                continue;
            }
        }
    }

    return data;
};

const isValidObj = (data) => {
    return typeof data === 'object' && data !== null;
};

const isValidCC = (data) => {
    if (COUNTRY.indexOf(data.toLowerCase()) === -1) {
        return false;
    }
    return true;
};

const isAuthed = (data) => {
    if (data === undefined) return false;
    if (jwt.verify(data.split(' ')[1], JWT_SECRET)) return true;
};

const isSuper = (data) => {
    if (data === undefined) return false;
    const plain = jwt.verify(data.split(' ')[1], JWT_SECRET);

    if (plain.admin && plain.role == 'Super Admin') {
        return true;
    } else {
        return false;
    }
};

const isAdmin = (data) => {
    if (data === undefined) return false;
    const plain = jwt.verify(data.split(' ')[1], JWT_SECRET);

    if (plain.admin) {
        return true;
    } else {
        return false;
    }
};

const maskPwd = (data) => {
    return data.slice(0, 2) + data.slice(2).replace(/./g, '*');
};

const setLang = (data) => {
    if (data === 'kr') {
        return 'ko';
    }
    return 'en';
};

const getMongoClient = () => {
    return new Promise((resolve) => {
        const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

        client.connect(function (err) {
            if (err) throw err;

            resolve(client.db('studium'));
        });
    });
};

const getUserName = (data) => {
    if (data === undefined) return false;
    const plain = jwt.verify(data.split(' ')[1], JWT_SECRET);

    return plain.username;
};

module.exports = {
    maskPwd,
    hashPwd,
    makeResponse,
    signJWT,
    trimAll,
    isValidObj,
    isValidCC,
    isAuthed,
    isSuper,
    isAdmin,
    setLang,
    getMongoClient,
    getUserName,
};
