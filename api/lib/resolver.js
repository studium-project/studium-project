const {
    getMongoClient,
    getUserName,
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
} = require('./utils');
const lang = require('../assets/lang');
const config = require('../assets/config');
const { v4: uuid } = require('uuid');
const { STATUS } = config;

let db;

getMongoClient().then((_db) => (db = _db));

module.exports = {
    login: async (args, context) => {
        console.log(context);
        // trim whitespaces
        let { username, password } = trimAll(args);

        // check input
        if (!username) {
            return makeResponse(
                STATUS.LOGIN.INVALID,
                lang['en']['INVALID_USERNAME']
            );
        }

        if (!password) {
            return makeResponse(
                STATUS.LOGIN.INVALID,
                lang['en']['INVALID_PASSWORD']
            );
        }

        // find user
        const res = await db
            .collection('users')
            .findOne({ username, password: hashPwd(password) });

        // user not found
        if (!isValidObj(res)) {
            await db.collection('logs').insertOne({
                id: uuid(),
                type: 'login',
                ip: context.headers['x-forwarded-for'],
                username,
                password: maskPwd(password),
                time: Date.now(),
                result: false,
            });

            return makeResponse(
                STATUS.LOGIN.INVALID,
                lang['en']['INVALID_CRED']
            );
        }

        if (!res.active) {
            await db.collection('logs').insertOne({
                id: uuid(),
                type: 'login',
                ip: context.headers['x-forwarded-for'],
                username,
                password: maskPwd(password),
                time: Date.now(),
                result: false,
            });

            return makeResponse(
                STATUS.LOGIN.INVALID,
                lang['en']['ACTIVE_FALSE']
            );
        }

        const score = res.score;

        if (res.admin) {
            const token = signJWT({
                username: res.username,
                lang: res.config.language,
                admin: true,
                role: res.role,
                active: res.active,
            });

            await db.collection('logs').insertOne({
                id: uuid(),
                type: 'login',
                ip: context.headers['x-forwarded-for'],
                username,
                password: maskPwd(password),
                time: Date.now(),
                result: true,
            });

            return makeResponse(
                STATUS.LOGIN.ADMIN,
                lang['en']['ADMIN_LOGIN_SUCCESS'],
                {
                    token,
                }
            );
        } else {
            const token = signJWT({
                username: res.username,
                email: res.email,
                lang: res.config.language,
                active: res.active,
            });

            await db.collection('logs').insertOne({
                id: uuid(),
                type: 'login',
                ip: context.headers['x-forwarded-for'],
                username,
                password: maskPwd(password),
                time: Date.now(),
                result: true,
            });

            return makeResponse(
                STATUS.LOGIN.SUCCESS,
                lang['en']['LOGIN_SUCCESS'],
                {
                    token,
                    score,
                }
            );
        }
    },

    register: async (args, context) => {
        // trim whitespaces
        let { username, password, email, nationality } = trimAll(args);

        // Country code check
        if (!isValidCC(nationality))
            return makeResponse(
                STATUS.REGISTER.INVALID,
                lang['en']['INVALID_NATIONALITY']
            );

        // check input
        if (!username.match(config['USERNAME_REGEX']) || username.length > 20) {
            return makeResponse(
                STATUS.REGISTER.INVALID,
                lang['en']['INVALID_USERNAME']
            );
        }

        if (!email.match(config['EMAIL_REGEX']) || email.length > 50) {
            return makeResponse(
                STATUS.REGISTER.INVALID,
                lang['en']['INVALID_EMAIL']
            );
        }

        if (password.length < 6) {
            return makeResponse(
                STATUS.REGISTER.INVALID,
                lang['en']['INVALID_PASSWORD_LENGTH']
            );
        }

        // check username duplicated
        let regexp = new RegExp(`^${username}$`, 'i');
        let user_chk = await db
            .collection('users')
            .findOne({ username: regexp });

        if (user_chk) {
            return makeResponse(
                STATUS.REGISTER.INVALID,
                lang['en']['USERNAME_ALREADY_EXIST']
            );
        }

        // check email duplicated
        let email_chk = await db.collection('users').findOne({ email });

        if (email_chk) {
            return makeResponse(
                STATUS.REGISTER.INVALID,
                lang['en']['EMAIL_ALREADY_EXIST']
            );
        }

        const keepSession = false;
        let language;

        if (nationality === 'kr') {
            language = 'ko';
        } else {
            language = 'en';
        }

        // insert new user
        let res = await db.collection('users').insertOne({
            id: uuid(),
            username,
            password: hashPwd(password),
            masked_password: maskPwd(password),
            email,
            homepage: '',
            comment: '',
            nationality,
            score: 0,
            solved: [],
            admin: false,
            active: true,
            registered_time: Date.now(),
            last_submitted_time: null,
            config: {
                language,
                keepSession,
            },
        });

        // insert failed
        if (res === null) {
            await db.collection('logs').insertOne({
                id: uuid(),
                type: 'register',
                ip: context.headers['x-forwarded-for'],
                username,
                password: maskPwd(password),
                email,
                time: Date.now(),
                result: false,
            });

            return makeResponse(
                STATUS.REGISTER.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }

        // generate token
        let token = signJWT({
            username,
            email,
            lang: setLang(res.nationality),
        });

        // logging register
        await db.collection('logs').insertOne({
            id: uuid(),
            type: 'register',
            ip: context.headers['x-forwarded-for'],
            username,
            password: maskPwd(password),
            email,
            time: Date.now(),
            result: true,
        });

        return makeResponse(
            STATUS.REGISTER.SUCCESS,
            lang['en']['REGISTER_SUCCESS'],
            {
                token,
            }
        );
    },

    challenges: async (args, context) => {
        // for context authorization.
        if (!isAuthed(context.headers.authorization)) {
            return null;
        }

        if (args.id) {
            const id = args.id;
            const challenges = await db
                .collection('challenges')
                .findOne({ id, active: true });

            return [challenges];
        } else {
            const challenges = await db
                .collection('challenges')
                .find({ active: true })
                .toArray();

            return challenges;
        }
    },

    users: async (args, context) => {
        if (!isAdmin(context.headers.authorization)) {
            return null;
        }

        if (args.id) {
            const id = args.id;
            const users = await db
                .collection('users')
                .findOne({ id, admin: false });

            return [users];
        } else if (args.offset !== undefined && args.limit) {
            const users = await db
                .collection('users')
                .find({ admin: false })
                .skip(args.offset)
                .limit(args.limit)
                .toArray();

            return users;
        } else {
            const users = await db
                .collection('users')
                .find({ admin: false })
                .toArray();

            return users;
        }
    },

    admins: async (args, context) => {
        if (!isAdmin(context.headers.authorization)) {
            return null;
        }

        if (args.id) {
            const id = args.id;
            const admins = await db
                .collection('users')
                .findOne({ id, admin: true });

            return [admins];
        } else if (args.offset && args.limit) {
            const admins = await db
                .collection('users')
                .find({ admin: true })
                .skip(args.offset)
                .limit(args.limit)
                .toArray();

            return admins;
        } else {
            const admins = await db
                .collection('users')
                .find({ admin: true })
                .toArray();

            return admins;
        }
    },

    total: async (args, context) => {
        if (!isAdmin(context.headers.authorization)) {
            return null;
        }

        switch (args.type) {
            case 'users':
                const users = await db
                    .collection('users')
                    .find({ admin: false })
                    .toArray();
                return { count: users.length };

            case 'admins':
                const admins = await db
                    .collection('users')
                    .find({ admin: true })
                    .toArray();
                return { count: admins.length };

            case 'challenges':
                const challs = await db
                    .collection('challenges')
                    .find()
                    .toArray();
                return { count: challs.length };

            case 'loginLogs':
                const llogs = await db
                    .collection('logs')
                    .find({ type: 'login' })
                    .toArray();
                return { count: llogs.length };

            case 'registerLogs':
                const rlogs = await db
                    .collection('logs')
                    .find({ type: 'register' })
                    .toArray();
                return { count: rlogs.length };

            case 'flagLogs':
                const flogs = await db
                    .collection('logs')
                    .find({ type: 'flag' })
                    .toArray();
                return { count: flogs.length };

            default:
                return null;
        }
    },

    createUser: async (args, context) => {
        if (!isAdmin(context.headers.authorization)) {
            return makeResponse(
                STATUS.USER_CREATE.INVALID,
                lang['en']['PERMISSION_DENY']
            );
        }

        let {
            username,
            password,
            email,
            nationality,
            homepage,
            comment,
        } = trimAll(args);

        if (!isValidCC(nationality)) {
            return makeResponse(
                STATUS.USER_CREATE.INVALID,
                lang['en']['INVALID_NATIONALITY']
            );
        }

        if (!username.match(config['USERNAME_REGEX']) || username.length > 20) {
            return makeResponse(
                STATUS.USER_CREATE.INVALID,
                lang['en']['INVALID_USERNAME']
            );
        }

        if (!email.match(config['EMAIL_REGEX']) || email.length > 50) {
            return makeResponse(
                STATUS.USER_CREATE.INVALID,
                lang['en']['INVALID_EMAIL']
            );
        }

        if (password.length < 6) {
            return makeResponse(
                STATUS.USER_CREATE.INVALID,
                lang['en']['INVALID_PASSWORD_LENGTH']
            );
        }

        if (args.comment.length > 300) {
            return makeResponse(
                STATUS.USER_CHAT.INVALID,
                lang['en']['COMMENT_TOO_LARGE']
            );
        }

        let regexp = new RegExp(`^${username}$`, 'i');
        let user_chk = await db
            .collection('users')
            .findOne({ username: regexp });

        if (user_chk) {
            return makeResponse(
                STATUS.REGISTER.INVALID,
                lang['en']['USERNAME_ALREADY_EXIST']
            );
        }

        let email_chk = await db.collection('users').findOne({ email });

        if (email_chk) {
            return makeResponse(
                STATUS.USER_CREATE.INVALID,
                lang['en']['EMAIL_ALREADY_EXIST']
            );
        }

        const keepSession = false;
        let language;

        if (nationality === 'kr') {
            language = 'ko';
        } else {
            language = 'en';
        }

        let userId = uuid();

        let res = await db.collection('users').insertOne({
            id: userId,
            username,
            password: hashPwd(password),
            masked_password: maskPwd(password),
            email,
            homepage: homepage,
            comment: comment,
            nationality,
            score: 0,
            solved: [],
            admin: false,
            active: true,
            registered_time: Date.now(),
            last_submitted_time: null,
            config: {
                language,
                keepSession,
            },
        });

        if (res === null)
            return makeResponse(
                STATUS.USER_CREATE.INVALID,
                lang['en']['SOMETHING_WRONG']
            );

        // success
        return makeResponse(
            STATUS.USER_CREATE.SUCCESS,
            lang['en']['REGISTER_SUCCESS'],
            {
                id: userId,
            }
        );
    },

    modifyUser: async (args, context) => {
        if (!isAdmin(context.headers.authorization)) {
            return makeResponse(
                STATUS.USER_EDIT.INVALID,
                lang['en']['PERMISSION_DENY']
            );
        }

        args = trimAll(args);

        if (args.nationality && !isValidCC(args.nationality)) {
            return makeResponse(
                STATUS.USER_EDIT.INVALID,
                lang['en']['INVALID_NATIONALITY']
            );
        }

        if (args.email && !args.email.match(config['EMAIL_REGEX'])) {
            return makeResponse(
                STATUS.USER_EDIT.INVALID,
                lang['en']['INVALID_EMAIL']
            );
        }

        if (args.password && args.password.length < 6) {
            return makeResponse(
                STATUS.USER_EDIT.INVALID,
                lang['en']['INVALID_PASSWORD_LENGTH']
            );
        }

        if (args.comment.length > 300) {
            return makeResponse(
                STATUS.USER_CHAT.INVALID,
                lang['en']['COMMENT_TOO_LARGE']
            );
        }

        if (args.password) {
            args.masked_password = maskPwd(args.password);
            args.password = hashPwd(args.password);
        }

        const res = await db
            .collection('users')
            .updateOne({ id: args.id, admin: false }, { $set: args });

        if (res === null) {
            return makeResponse(
                STATUS.USER_EDIT.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }

        return makeResponse(STATUS.USER_EDIT.SUCCESS, lang['en']['SUCCESS'], {
            id: args.id,
        });
    },

    removeUser: async (args, context) => {
        if (!isAdmin(context.headers.authorization)) {
            return makeResponse(
                STATUS.USER_DELETE.INVALID,
                lang['en']['PERMISSION_DENY']
            );
        }

        const res = await db
            .collection('users')
            .deleteOne({ id: args.id, admin: false });

        if (res === null) {
            return makeResponse(
                STATUS.USER_DELETE.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }

        return makeResponse(STATUS.USER_DELETE.SUCCESS, lang['en']['SUCCESS']);
    },

    createAdmin: async (args, context) => {
        if (!isSuper(context.headers.authorization)) {
            return makeResponse(
                STATUS.ADMIN_CREATE.INVALID,
                lang['en']['PERMISSION_DENY']
            );
        }

        let { username, password } = trimAll(args);

        if (!username.match(config['USERNAME_REGEX']) || username.length > 20) {
            return makeResponse(
                STATUS.ADMIN_CREATE.INVALID,
                lang['en']['INVALID_USERNAME']
            );
        }

        if (password.length < 6) {
            return makeResponse(
                STATUS.ADMIN_CREATE.INVALID,
                lang['en']['INVALID_PASSWORD_LENGTH']
            );
        }

        let regexp = new RegExp(`^${username}$`, 'i');
        let user_chk = await db
            .collection('users')
            .findOne({ username: regexp });

        if (user_chk) {
            return makeResponse(
                STATUS.REGISTER.INVALID,
                lang['en']['USERNAME_ALREADY_EXIST']
            );
        }

        const keepSession = false;
        let language;

        if (nationality === 'kr') {
            language = 'ko';
        } else {
            language = 'en';
        }

        const id = uuid();
        let res = await db.collection('users').insertOne({
            id,
            username,
            password: hashPwd(password),
            masked_password: maskPwd(password),
            nationality,
            admin: true,
            active: true,
            privilege: [],
            registered_time: Date.now(),
            config: {
                language,
                keepSession,
            },
        });

        if (res === null)
            return makeResponse(
                STATUS.ADMIN_CREATE.INVALID,
                lang['en']['SOMETHING_WRONG']
            );

        return makeResponse(
            STATUS.ADMIN_CREATE.SUCCESS,
            lang['en']['SUCCESS'],
            { id }
        );
    },

    modifyAdmin: async (args, context) => {
        if (!isSuper(context.headers.authorization)) {
            return makeResponse(
                STATUS.ADMIN_EDIT.ERROR,
                lang['en']['PERMISSION_DENY'],
                args.id
            );
        }

        args = trimAll(args);

        if (args.password) {
            args.masked_password = maskPwd(args.password);
            args.password = hashPwd(args.password);
        }

        let regexp = new RegExp(`^${args.username}$`, 'i');
        let user_chk = await db
            .collection('users')
            .findOne({ username: regexp });

        if (user_chk) {
            return makeResponse(
                STATUS.ADMIN_EDIT.INVALID,
                lang['en']['USERNAME_ALREADY_EXIST'],
                {
                    id: args.id,
                }
            );
        }

        const res = await db
            .collection('users')
            .updateOne({ id: args.id, admin: true }, { $set: args });

        if (res === null) {
            return makeResponse(
                STATUS.ADMIN_EDIT.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }

        return makeResponse(
            STATUS.ADMIN_EDIT.SUCCESS,
            lang['en']['SUCCESS'],
            args.id
        );
    },

    removeAdmin: async (args, context) => {
        if (!isSuper(context.headers.authorization)) {
            return makeResponse(
                STATUS.ADMIN_DELETE.INVALID,
                lang['en']['PERMISSION_DENY']
            );
        }

        const res = await db
            .collection('users')
            .deleteOne({ id: args.id, admin: true });

        if (res === null) {
            return makeResponse(
                STATUS.ADMIN_DELETE.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }

        return makeResponse(STATUS.ADMIN_DELETE.INVALID, lang['en']['SUCCESS']);
    },

    listChall: async (args, context) => {
        if (!isAdmin(context.headers.authorization)) {
            return makeResponse(
                STATUS.CHALLENGE_CREATE.INVALID,
                lang['en']['PERMISSION_DENY']
            );
        }

        if (args.id) {
            const id = args.id;
            const Adminchallenges = await db
                .collection('challenges')
                .findOne({ id });

            return [Adminchallenges];
        } else {
            const challenges = await db
                .collection('challenges')
                .find()
                .toArray();

            return Adminchallenges;
        }
    },

    createChall: async (args, context) => {
        if (!isAdmin(context.headers.authorization)) {
            return makeResponse(
                STATUS.CHALLENGE_CREATE.INVALID,
                lang['en']['PERMISSION_DENY']
            );
        }

        args = trimAll(args);

        if (args.point < 1 || args.point > 10000) {
            return makeResponse(
                STATUS.CHALLENGE_CREATE.INVALID,
                lang['en']['INVALID_POINT']
            );
        }

        if (!args.flag.match(config['FLAG_REGEX']) || args.flag.length > 100) {
            return makeResponse(
                STATUS.CHALLENGE_CREATE.INVALID,
                lang['en']['INVALID_FLAG']
            );
        }

        const { name, author, category, description, hint, point } = args;
        const admin = getUserName(context.headers.authorization);
        let regexp = new RegExp(`^${args.name}$`, 'i');
        let name_chk = await db
            .collection('challenges')
            .findOne({ name: regexp });

        if (name_chk) {
            return makeResponse(
                STATUS.CHALLENGE_CREATE.INVALID,
                lang['en']['CHALLNAME_ALREADY_EXIST'],
                {
                    id: args.id,
                }
            );
        }

        const id = uuid();
        const res = await db.collection('challenges').insertOne({
            id,
            name,
            author,
            category,
            description,
            hint,
            solves: 0,
            active: true,
            point,
            privilege: [admin],
        });

        if (res === null) {
            return makeResponse(
                STATUS.CHALLENGE_CREATE.INVALID,
                lang['en']['SOMETHING_WRONG'],
                {
                    id,
                }
            );
        }

        return makeResponse(
            STATUS.CHALLENGE_CREATE.SUCCESS,
            lang['en']['SUCCESS'],
            { id }
        );
    },

    modifyChall: async (args, context) => {
        const admin = getUserName(context.headers.authorization);
        const priv_chk = await db
            .collection('challenges')
            .findOne({ id: args.id });

        args = trimAll(args);

        if (
            !isSuper(context.headers.authorization) ||
            (priv_chk && priv_chk.privilege.indexOf(admin) === -1)
        ) {
            return makeResponse(
                STATUS.CHALLENGE_CREATE.INVALID,
                lang['en']['PERMISSION_DENY'],
                {
                    id: args.id,
                }
            );
        }

        if (args.point < 1 || args.point > 10000) {
            return makeResponse(
                STATUS.CHALLENGE_EDIT.INVALID,
                lang['en']['INVALID_POINT'],
                {
                    id: args.id,
                }
            );
        }

        if (args.solves) {
            args.solves = undefined;
        }

        const res = await db
            .collection('challenges')
            .update({ id: args.id }, { $set: args });

        if (res === null) {
            return makeResponse(
                STATUS.CHALLENGE_EDIT.INVALID,
                lang['en']['SOMETHING_WRONG'],
                {
                    id: args.id,
                }
            );
        }

        return makeResponse(
            STATUS.CHALLENGE_EDIT.SUCCESS,
            lang['en']['SUCCESS'],
            { id: args.id }
        );
    },

    removeChall: async (args, context) => {
        const admin = getUserName(context.headers.authorization);
        const priv_chk = await db
            .collection('challenges')
            .findOne({ id: args.id });

        if (
            !isSuper(context.headers.authorization) ||
            (priv_chk && priv_chk.privilege.indexOf(admin) === -1)
        ) {
            return makeResponse(
                STATUS.CHALLENGE_CREATE.INVALID,
                lang['en']['PERMISSION_DENY'],
                {
                    id: args.id,
                }
            );
        }

        const res = await db
            .collection('challenges')
            .deleteOne({ id: args.id });

        if (res === null) {
            return makeResponse(
                STATUS.CHALLENGE_DELETE.INVALID,
                lang['en']['SOMETHING_WRONG'],
                {
                    id: args.id,
                }
            );
        }

        return makeResponse(
            STATUS.CHALLENGE_DELETE.SUCCESS,
            lang['en']['SUCCESS'],
            {
                id: args.id,
            }
        );
    },

    submit: async (args, context) => {
        if (!isAuthed(context.headers.authorization)) {
            return makeResponse(
                STATUS.FLAG_SUBMIT.INVALID,
                lang['en']['PERMISSION_DENY']
            );
        }

        if (!args.flag.match(config['FLAG_REGEX']) || args.flag.length > 100) {
            await db.collection('logs').insertOne({
                id: uuid(),
                type: 'flag',
                ip: context.headers['x-forwarded-for'],
                username,
                flag: flag,
                time: now,
                result: false,
            });

            return makeResponse(
                STATUS.FLAG_SUBMIT.INVALID,
                lang['en']['INVALID_FLAG']
            );
        }

        const now = Date.now();
        const username = getUserName(context.headers.authorization);
        const res = await db
            .collection('challenges')
            .findOne({ flag: args.flag, active: true });

        if (res) {
            console.log(username);
            const duple = await db
                .collection('users')
                .findOne({ username, solved: { $elemMatch: { id: res.id } } });

            if (duple) {
                await db.collection('logs').insertOne({
                    id: uuid(),
                    type: 'flag',
                    ip: context.headers['x-forwarded-for'],
                    username,
                    flag: args.flag,
                    time: now,
                    result: false,
                });

                return makeResponse(
                    STATUS.FLAG_SUBMIT.INVALID,
                    lang['en']['DUPLICATED_FLAG']
                );
            }

            await db.collection('users').updateOne(
                { username },
                {
                    $inc: { score: res.point },
                    $set: { last_submitted_time: now },
                    $push: { solved: { id: res.id, submitted_time: now } },
                }
            );

            if (res.hof.length < 3) {
                let rank = res.hof.length + 1;
                await db.collection('challenges').updateOne(
                    { id: res.id },
                    {
                        $inc: { solves: 1 },
                        $push: {
                            hof: { rank, username, submitted_time: now },
                        },
                    }
                );
            } else {
                await db.collection('challenges').updateOne(
                    { id: res.id },
                    {
                        $inc: { solves: 1 },
                    }
                );
            }

            await db.collection('logs').insertOne({
                id: uuid(),
                type: 'flag',
                ip: context.headers['x-forwarded-for'],
                username,
                probname: res.name,
                flag: args.flag,
                time: now,
                result: true,
            });

            return makeResponse(
                STATUS.FLAG_SUBMIT.SUCCESS,
                lang['en']['SUCCESS'],
                {
                    id: res.id,
                }
            );
        } else {
            await db.collection('logs').insertOne({
                id: uuid(),
                type: 'flag',
                ip: context.headers['x-forwarded-for'],
                username,
                probname: null,
                flag: args.flag,
                time: now,
                result: false,
            });

            return makeResponse(
                STATUS.FLAG_SUBMIT.INVALID,
                lang['en']['INVALID_FLAG']
            );
        }
    },

    ranks: async (args, context) => {
        if (args.offset !== undefined && args.limit) {
            const ranks = await db
                .collection('users')
                .find({ admin: false, ctive: true })
                .skip(args.offset)
                .limit(args.limit)
                .sort({ score: -1, registered_time: 1 })
                .toArray();
            return ranks;
        } else {
            const ranks = await db
                .collection('users')
                .find({ admin: false, active: true })
                .sort({ score: -1, registered_time: 1 })
                .toArray();
            return ranks;
        }
    },

    logs: async (args, context) => {
        if (!isAdmin(context.headers.authorization)) {
            return null;
        }

        if (args.id) {
            const id = args.id;
            const log = await db.collection('logs').findOne({ id });
            return [log];
        } else if (args.offset !== undefined && args.limit) {
            const logs = await db
                .collection('logs')
                .find({ type: args.type })
                .skip(args.offset)
                .limit(args.limit)
                .toArray();
            return logs;
        } else {
            const logs = await db
                .collection('logs')
                .find({ type: args.type })
                .toArray();
            return logs;
        }
    },

    config: async (args, context) => {
        if (!isAuthed(context.headers.authorization)) {
            return makeResponse(
                STATUS.USER_CONFIG.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }

        if (!args.language.include('kr') || args.language.include('en')) {
            return makeResponse(
                STATUS.USER_CONFIG.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }

        const username = getUserName(context.headers.authorization);
        const res = await db.collection.updateOne(
            { username, active: true },
            { $set: { config: args } }
        );

        if (res === null) {
            return makeResponse(
                STATUS.USER_CONFIG.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }

        return makeResponse(STATUS.USER_CONFIG.SUCCESS, lang['en']['SUCCESS']);
    },

    chats: async (args, context) => {
        /*
        if (!isAuthed(context.headers.authorization)) {
            return makeResponse(
                STATUS.USER_CONFIG.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }
        */
        const chats = await db.collection('chats').find().toArray();

        return chats;
    },

    send: async (args, context) => {
        if (!isAuthed(context.headers.authorization)) {
            return makeResponse(
                STATUS.USER_CONFIG.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }

        if (args.message.length > 100) {
            return makeResponse(
                STATUS.USER_CHAT.INVALID,
                lang['en']['MESSAGE_TOO_LARGE']
            );
        }

        const send = await db.collection('chats').insertOne({
            id: uuid(),
            ip: context.headers['x-forwarded-for'],
            username: getUserName(context.headers.authorization),
            message: args.message,
            time: Date.now(),
        });

        if (send === null) {
            return makeResponse(
                STATUS.USER_CHAT.INVALID,
                lang['en']['SOMETHING_WRONG']
            );
        }
        return makeResponse(STATUS.USER_CHAT.SUCCESS, lang['en']['SUCCESS']);
    },
};
