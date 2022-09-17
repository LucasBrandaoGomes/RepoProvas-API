import { Tests } from "@prisma/client";
import { prisma } from "../database/database";
import { TestInsertData } from "../types/testTypes";

export async function inserNewTest(data:TestInsertData) {
    await prisma.tests.create({data})
}

