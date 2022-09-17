import { prisma } from "../database/database";
import { TeachersDisciplines } from "@prisma/client";

export async function findTeacherDisciplineByIds(teacherId:number, disciplineId:number): Promise < TeachersDisciplines | null> {
    return await prisma.teachersDisciplines.findFirst(({where: { teacherId:teacherId,  AND:  { disciplineId: disciplineId }}}));
}
