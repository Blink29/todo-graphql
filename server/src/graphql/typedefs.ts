import { gql } from 'apollo-server';

const typeDefs = gql`
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

export default typeDefs;
