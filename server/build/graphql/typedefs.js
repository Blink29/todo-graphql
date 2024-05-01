"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
    type Todo {
        id: String!
        title: String!
        completed: Boolean!
    }

    type Query {
        todos: [Todo!]!
    }

    type Mutation {
        createTodo(title: String!): Todo!
        updateTodo(id: String!, title: String!, completed: Boolean!): Todo!
        deleteTodo(id: String!): Todo
    }
`;
exports.default = typeDefs;
