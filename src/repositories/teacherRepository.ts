import { prisma } from "../database/database";
import { Teachers } from "@prisma/client";

export async function findTeacherById(teacherId:number): Promise < Teachers | null> {
    return await prisma.teachers.findUnique({where: {id:teacherId}})
}

