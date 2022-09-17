import { Tests } from "@prisma/client";
import { prisma } from "../database/database";
import { TestInsertData } from "../types/testTypes";

export async function inserNewTest(data:TestInsertData) {
    await prisma.tests.create({data})
}

export async function getTestsByDisciplines(){
    return await prisma.terms.findMany({
        select: {
            number: true,
            discipline : {
              select: {
                id: true,
                name: true,
                teachersDisciplines: {
                  select: {
                    tests: {
                      distinct: ['categorieId'],
                      select: {
                        categories : {
                          select: {
                            id: true,
                            name: true,
                            test: {
                              select: {
                                id: true,
                                name: true,
                                pdfUrl: true,
                                teacherDiscipline: {
                                  select: {
                                    teacher: {
                                      select: {
                                        name: true,
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                      orderBy: [
                        {
                          categories: {
                            name: 'desc',
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          }, 
    })
}

export async function getTestsByTeachers() {
    return await prisma.teachers.findMany({
      select: {
        name: true,
        teachersDisciplines : {
          select: {
            tests: {
              distinct: ['categorieId'],
              select: {
                categories: {
                  select: {
                    id: true,
                    name: true,
                    test: {
                      select: {
                        id: true,
                        name: true,
                        pdfUrl: true,
                        teacherDiscipline: {
                          select: {
                            discipline: { select: { name: true } },
                          },
                        },
                      },
                    },
                  },
                },
              },
              orderBy: [
                {
                  categories: {
                    name: 'desc',
                  },
                },
              ],
            },
          },
        },
      },
    });
  }