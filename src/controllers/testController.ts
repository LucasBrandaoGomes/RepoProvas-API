import {Request, Response} from "express"
import * as testServices from "../services/testServices"

export async function createNewTest(req:Request, res: Response) {
    const data = res.locals.body

    await testServices.newTest(data, Number(data.categorieId), Number(data.disciplineId), Number(data.teacherId))
    res.sendStatus(201)
}

export async function getTestsByDiscipline(req:Request, res: Response) {
    const result = await testServices.getAllTestsByDiscipline()
    res.status(200).send(result)
}

export async function getTestsByTeacher(req:Request, res: Response) {
    
}