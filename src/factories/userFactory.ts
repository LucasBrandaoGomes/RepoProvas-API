import { faker } from "@faker-js/faker";

export async function createNewUser () {
  const user = {
    email: faker.internet.email(),
    password: "1234",
    passwordConfirmation: "1234"
  };

  return user;
} 