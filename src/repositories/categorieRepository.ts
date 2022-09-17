import { prisma } from "../database/database";
import { Categories } from "@prisma/client";

export async function findCategorieById(categorieId:number): Promise < Categories | null> {
    return await prisma.categories.findUnique({where: {id:categorieId}})
}