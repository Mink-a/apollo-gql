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
  Query: {
    students: () => characters.filter((character) => !character.courses),
    professors: () => characters.filter((character) => !character.parent_blood),
    characters: () => characters,
  },
};
