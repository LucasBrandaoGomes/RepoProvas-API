import supertest from "supertest";
import app from "../src/app";
import { prisma }  from "../src/database/database";
import { createNewTest } from '../src/factories/testFactory'
import { createNewUser } from "../src/factories/userFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests`
})
console.log(`o teste está rodando em ${process.env.DATABASE_URL}`)

describe("Test route POST /tests", () => {

    it("Create new test and return status 201",async () => {
        const newUser =  await createNewUser()
        const newTest =  await createNewTest()

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).post('/tests').send({...newTest, categorieId:1, disciplineId:6, teacherId:2}).set('Authorization', 'Bearer ' + signin.text)
        
    
        const createdTest = await prisma.tests.findFirst({where: {name :newTest.name}});
    
        expect(result.status).toBe(201)
        expect(createdTest).not.toBeNull()
    })

    it("Trying to create new test without token authozition, return status 401",async () => {
        const newUser =  await createNewUser();
        const newTest =  await createNewTest();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).post('/tests').send({...newTest, categorieId:1, disciplineId:6, teacherId:2})
        
        const createdTest = await prisma.tests.findFirst({where: {name :newTest.name}});
    
        expect(result.status).toBe(401)
        expect(createdTest).toBeNull()
    })

    it("Trying to create new test with invalid token, return status 401",async () => {
        const newUser =  await createNewUser();
        const newTest =  await createNewTest();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).post('/tests').send({...newTest, categorieId:1, disciplineId:6, teacherId:2}).set('Authorization', 'Bearer ' + "invalidtoken")
        
        const createdTest = await prisma.tests.findFirst({where: {name :newTest.name}});
    
        expect(result.status).toBe(401)
        expect(createdTest).toBeNull()
    })

    it("Trying to create new test with with empty body, return status 422",async () => {
        const newUser =  await createNewUser();
        const newTest =  await createNewTest();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).post('/tests').send({}).set('Authorization', 'Bearer ' + signin.text)
            
        expect(result.status).toBe(422)
    })

    it("Trying to create new test with not registered discipline, return status 404",async () => {
        const newUser =  await createNewUser();
        const newTest =  await createNewTest();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).post('/tests').send({...newTest, categorieId:1, disciplineId:8, teacherId:2}).set('Authorization', 'Bearer ' + signin.text)
        
        const createdTest = await prisma.tests.findFirst({where: {name :newTest.name}});
    
        expect(result.status).toBe(404)
        expect(createdTest).toBeNull()
    })

    it("Trying to create new test with not registered categorie, return status 404",async () => {
        const newUser =  await createNewUser();
        const newTest =  await createNewTest();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).post('/tests').send({...newTest, categorieId:8, disciplineId:6, teacherId:2}).set('Authorization', 'Bearer ' + signin.text)
        
        const createdTest = await prisma.tests.findFirst({where: {name :newTest.name}});
    
        expect(result.status).toBe(404)
        expect(createdTest).toBeNull()
    })

    it("Trying to create new test with not registered teacher, return status 404",async () => {
        const newUser =  await createNewUser();
        const newTest =  await createNewTest();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).post('/tests').send({...newTest, categorieId:1, disciplineId:6, teacherId:6}).set('Authorization', 'Bearer ' + signin.text)
        
        const createdTest = await prisma.tests.findFirst({where: {name :newTest.name}});
    
        expect(result.status).toBe(404)
        expect(createdTest).toBeNull()
    })

    it("Trying to create new test with unavaliable teacherDeiscipline relation, return status 404",async () => {
        const newUser =  await createNewUser();
        const newTest =  await createNewTest();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).post('/tests').send({...newTest, categorieId:1, disciplineId:6, teacherId:6}).set('Authorization', 'Bearer ' + signin.text)
        
        const createdTest = await prisma.tests.findFirst({where: {name :newTest.name}});
    
        expect(result.status).toBe(404)
        expect(createdTest).toBeNull()
    })    
})

describe('Test route GET /tests/disciplines', () => {

    it("Get all tests grouping by terms and teachers, return status 200",async () => {
        const newUser =  await createNewUser();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).get('/tests/disciplines').send().set('Authorization', 'Bearer ' + signin.text)
        
        expect(result.status).toBe(200)
        expect(result.body).toBeInstanceOf(Array);
    });

    it("Get all tests grouping by terms and teachers without autorization token return status 401",async () => {
        const newUser =  await createNewUser();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).get('/tests/disciplines').send()
        
        expect(result.status).toBe(401)
    });

    it("Get all tests grouping by terms and teachers with invalid token return status 401",async () => {
        const newUser =  await createNewUser();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).get('/tests/disciplines').send().set('Authorization', 'Bearer ' + 'Invalid token')
        
        expect(result.status).toBe(401)
    });
});

describe('Test route GET /tests/teachers', () => {

    it("Get all tests grouping by terms and teachers, return status 200",async () => {
        const newUser =  await createNewUser();

        await supertest(app).post('/sign-up').send(newUser);

        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).get('/tests/teachers').send().set('Authorization', 'Bearer ' + signin.text)
        
        expect(result.status).toBe(200)
        expect(result.body).toBeInstanceOf(Array);
    });

    it("Get all tests grouping by terms and teachers without autorization token return status 401",async () => {
        const newUser =  await createNewUser();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).get('/tests/teachers').send()
        
        expect(result.status).toBe(401)
    });

    it("Get all tests grouping by terms and teachers with invalid token return status 401",async () => {
        const newUser =  await createNewUser();

        await supertest(app).post('/sign-up').send(newUser);
        const signin = await supertest(app).post('/sign-in').send({email:newUser.email, password:"1234"});
        const result = await supertest(app).get('/tests/teachers').send().set('Authorization', 'Bearer ' + 'Invalid token')
        
        expect(result.status).toBe(401)
    });

})

afterAll( async () => {
    await prisma.$disconnect()
})