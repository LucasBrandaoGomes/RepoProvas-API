import { faker } from "@faker-js/faker";

export function createNewTest () {
  const test = {
    name: faker.random.alphaNumeric(),
    pdfUrl: faker.internet.url(),
    categorieId: faker.random.numeric(2),
    disciplineId: faker.random.numeric(2),
    teacherId: faker.random.numeric(2)
  };

  return test;
} 