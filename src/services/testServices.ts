import * as testRepository from '../repositories/testRepository';
import * as teacherRepository from '../repositories/teacherRepository';
import * as disciplineRepository from '../repositories/disciplineRepository';
import * as teachersDisciplinesRepository from '../repositories/teachersDisciplinesRepository';
import * as categorieRepository from '../repositories/categorieRepository'

import { TestInsertData } from '../types/testTypes';

async function checkIfCategorieExist(categorieId:number) {
    const result = await categorieRepository.findCategorieById(categorieId);
    if(result === null){
        throw { code: "NotFound", message: "Categorie not found"}
    }
}

async function checkIfDisciplineExist(disciplineId:number) {
    const result = await disciplineRepository.findDisciplineById(disciplineId);
    if(result === null){
        throw { code: "NotFound", message: "Discipline not found"}
    }
}

async function checkIfTeacherExist(teacherId:number) {
    const result = await teacherRepository.findTeacherById(teacherId);
    if(result === null){
        throw { code: "NotFound", message: "Teacher no registered"}
    }
}

async function checkIfTeacherDiciplineExist(teacherId:number, disciplineId:number) {
    const result = await teachersDisciplinesRepository.findTeacherDisciplineByIds(teacherId, disciplineId);
    if(result === null){
        throw { code: "NotFound", message: "There is no relation between this teacher and discipline"}
    }
    return result.id
}

export async function newTest(data:TestInsertData, categorieId:number, disciplineId:number, teacherId:number) {
    await checkIfCategorieExist(categorieId);
    await checkIfDisciplineExist(disciplineId);
    await checkIfTeacherExist(teacherId);
    const teacherDisciplineId = await checkIfTeacherDiciplineExist(teacherId,disciplineId);
    const dataSend:TestInsertData ={name:data.name, pdfUrl:data.pdfUrl, categorieId:Number(data.categorieId),teacherDisciplineId}

    await testRepository.inserNewTest(dataSend)
}

export async function getAllTestsByDiscipline() {
    return await testRepository.getTestsByDisciplines()
}

export async function getAllTestsByTeachers() {
    return await testRepository.getTestsByDisciplines()
}