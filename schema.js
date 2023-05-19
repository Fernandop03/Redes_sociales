import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    friends: [User!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    post: Post!
  }

  type Query {
    user(id: ID!): User
    post(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createPost(title: String!, content: String!, authorId: ID!): Post
    createComment(content: String!, authorId: ID, postId: ID): Comment
    addFriend(userId: ID!, friendId: ID!): User
    deletePost(id: ID!): Boolean
  }
`;
