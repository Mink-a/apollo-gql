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
  }

  type Query {
    users: [User]
    user(id: Int): User
  }

  type Mutation {
    addUser(name: String, age: Int): User
    updateUser(id: Int!, name: String, age: Int): User
  }
  `);

// 2. Root Resolver
const rootValue = {
  users: () => usersData,
  user: ({ id }) => usersData.find((user) => user.id === id),
  addUser: ({ name, age }) => {
    const newUser = {
      id: usersData.length + 1,
      name,
      age,
      email: `${name}@gmail.com`,
    };
    usersData.push(newUser);
    return newUser;
  },
  updateUser: ({ id, name, age }) => {
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
