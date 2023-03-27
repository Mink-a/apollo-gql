import { characters } from "./characters.js";

export const resolvers = {
  Character: {
    __resolveType(character, context, info) {
      if (character.courses) {
        return "Professor";
      }
      if (character.parent_blood) {
        return "Student";
      }
      return null;
    },
  },
  Wand: {
    length: (parent, args, context)=> parent.length ?? 0
  },
  Query: {
    students: () => characters.filter((character) => !character.courses),
    professors: () => characters.filter((character) => !character.parent_blood),
    characters: () => characters,
  },
  Mutation: {
    addStudent: (parent, args, context) => {
      const data = {...args.data}
      characters.push(data);
      return data;
    }
  }
};
