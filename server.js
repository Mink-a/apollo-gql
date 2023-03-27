import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema, graphql } from "graphql";

import { usersData } from "./usersData.js";
const app = express();

// 1. Schema Definition
const schema = buildSchema(`
  type User {
    id: Int
    name: String
    age: Int
    email: String
    role: ROLE
  }

  input userInput {
    name: String
    age: Int
  }

  enum ROLE {
    admin
    basic
  }

  type Query {
    users: [User]
    user(id: Int): User
    findByRole(role: ROLE): [User]
  }

  type Mutation {
    addUser(input: userInput): User
    updateUser(id: Int!, input: userInput): User
  }
  `);

// 2. Root Resolver
const rootValue = {
  users: () => usersData,
  user: ({ id }) => usersData.find((user) => user.id === id),
  findByRole: ({ role }) => usersData.filter((user) => user.role === role),
  addUser: ({ input: { name, age } }) => {
    const newUser = {
      id: usersData.length + 1,
      name: name,
      age: age,
      email: `${name}@gmail.com`,
    };
    usersData.push(newUser);
    return newUser;
  },
  updateUser: ({ id, input: { name, age } }) => {
    const user = usersData.find((user) => user.id === id);
    user.name = name;
    user.age = age;
    return user;
  },
};

// // 3. Execute GraphQL
// graphql({ schema, source: "{ email,name,age }", rootValue }).then((res) =>
//   console.log(res)
// );

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("server listening on port 5000"));
