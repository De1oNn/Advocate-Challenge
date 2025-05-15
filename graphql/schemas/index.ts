// graphql/schemas/index.ts
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    isDeleted: Boolean
  }

  input TaskInput {
    title: String!
    description: String
  }

  type Query {
    getAllTasks: [Task!]!
    getFinishedTasksLists: [Task!]!
  }

  type Mutation {
    addTask(input: TaskInput!): Task!
    updateTask(id: ID!, input: TaskInput!): Task!
  }
`;

export default typeDefs;
