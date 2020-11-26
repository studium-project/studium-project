const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const resolver = require('./resolver');

module.exports = function (app) {
    const schema = buildSchema(`
    type Query {
        login(username: String!, password: String!): Token
        challenges(id: String): [Challenges]
        users(id: String, offset: Int, limit: Int): [Users]
        admins(id: String, offset: Int, limit: Int): [Admins]
        logs(type: String!, offset: Int, limit: Int): [Logs]
        ranks(offset: Int, limit: Int): [Users]
        total(type: String!): Total
        chats: [Chats]
    }

    type Mutation {
        register(username: String!, password: String!, email: String!, nationality: String!): Token
        createUser(username: String!, password: String!, email: String!, nationality: String!, homepage: String!, comment: String!): Result
        modifyUser(id: String!, password: String, active: Boolean, nationality: String, homepage: String, comment: String): Result
        removeUser(id: String!): Result
        createAdmin(username: String!, password: String!, role: String!, privilege: [String]!, active: Boolean!): Result
        modifyAdmin(id: String!, password: String, privilege: String, active: Boolean): Result
        removeAdmin(id: String!): Result
        listChall(id: String): [Challenges]
        createChall(name: String!, author: String!, category: [String]!, flag: String!, description: String!, point: Int!, hint: String!): Result
        modifyChall(id: String!, name: String, author: String, category: [String], description: String, point: Int, hint: String): Result
        removeChall(id: String!): Result
        submit(flag: String!): Result
        config(language: String!, keepSession: Boolean!): Result
        send(message: String!): Result
    }

    type Token {
        code: Int
        message: String
        token: String
        score: Int
    }

    type Users {
        id: String
        username: String
        homepage: String
        comment: String
        email: String
        nationality: String
        masked_password: String
        registered_time: Float
        last_submitted_time: Float
        score: Int
        solved: [Solved]
        active: Boolean
    }

    type Admins {
        id: String
        role: String
        privilege: [String]
        username: String
        masked_password: String
        registered_time: Float
    }

    type Total {
        count: Int
    }
    
    type Challenges {
        id: String
        name: String
        author: String
        category: [String]
        description : String
        hint: String
        solves: Int
        point: Int
        hof: [Hof]
    }

    type Adminchallenges {
        id: String
        name: String
        author: String
        category: [String]
        description : String
        flag: String
        hint: String
        solves: Int
        point: Int
        hof: [Hof]
    }

    type Servers {
        name: String
        link: String
    }

    type Files {
        name: String
        link: String
    }
    
    type Result {
        code: Int
        message: String
        id: String
    }

    type Solved {
        id: String
        submitted_time: Float
    }

    type Hof {
        rank: Int
        username: String
        submitted_time: Float
    }
    
    type Logs {
        type: String
        ip: String
        username: String
        password: String
        flag: String
        email: String
        time: String
        result: Boolean
    }
    
    type Chats {
        id: String
        ip: String
        username: String
        message: String
        time: Float
    }`);

    app.use(
        '/',
        graphqlHTTP({
            schema: schema,
            rootValue: resolver,
            graphiql: true,
        })
    );
};
