import { prisma } from "../src/database/database";
import { createNewUser } from '../src/factories/userFactory';

async function main() {
  const newUser = createNewUser()
  const newUserInsert = {email:newUser.email, password:newUser.password}

  await prisma.users.upsert({
    where: { email: newUser.email },
    update: {},
    create: newUserInsert
  });
}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });