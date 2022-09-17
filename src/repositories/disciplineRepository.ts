import { prisma } from "../database/database";
import { Disciplines } from "@prisma/client";

export async function findDisciplineById(disciplineId:number): Promise < Disciplines | null> {
    return await prisma.disciplines.findUnique({where: {id:disciplineId}})
}