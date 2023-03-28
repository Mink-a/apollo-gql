import { prisma } from "./db.js";

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
    length: (parent, args, context) => parent.length ?? 0,
  },
  Query: {
    students: () => prisma.student.findMany(),
    professors: () => prisma.professor.findMany(),
    characters: async () => {
      const students = await prisma.student.findMany();
      const professors = await prisma.professor.findMany();
      return students.concat(professors);
    },
  },
  Mutation: {
    addStudent: async (parent, args, context) => {
      const { data } = args;
      const student = await prisma.student.create({
        data,
      });
      return student;
    },
  },
};
