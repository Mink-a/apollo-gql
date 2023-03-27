export const typeDefs = `
  type Wand {
    wood: String
    core: String
    length: Int
  }

  interface Character {
    name: String
    house: String
    wand: Wand
  }

  type Student implements Character {
    name: String
    house: String
    occupation: String
    wand: Wand
    patronus: String
    image_url: String
    parent_blood: String
  }

  type Professor implements Character {
    name: String
    house: String
    occupation: String
    wand: Wand
    patronus: String
    courses:[String]
  }

  type Query {
    students: [Student]
    professors: [Professor]
    characters: [Character]
  }

  input StudentInput {
    name: String
    house: String
  }

  type Mutation {
    addStudent(data: StudentInput): Student
  }
`;
