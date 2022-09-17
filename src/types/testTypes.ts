import { Tests } from "@prisma/client";

export type TestBodyData = {name:string, pdfUrl:string, categorieId:number, disciplineId:number, teacherId:number

}

export type TestInsertData = Omit<Tests, "id">

