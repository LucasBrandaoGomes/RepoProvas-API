import supertest from "supertest";
import app from "../src/app";
import { createNewUser } from "../src/factories/userFactory";

describe("Test route POST /sign-in", () => {
    it("Login and return status 200",async () => {
        const newUser = await createNewUser()

        const newLogin = {
            email: newUser.email,
            password: "1234",
        }

        await supertest(app).post('/sign-up').send(newUser);
        const result = await supertest(app).post('/sign-in').send(newLogin);
        
        expect(result.status).toBe(200)
    })

    it("Trying to login without email, return status 422",async () => {
        const newUser = await createNewUser()

        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        const result = await supertest(app).post('/sign-in').send({password:newLogin.password});
        
        expect(result.status).toBe(422)
    })

    it("Trying to login without password, return status 422",async () => {
        const newUser = await createNewUser()

        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        const result = await supertest(app).post('/sign-in').send({email:newLogin.email});
        
        expect(result.status).toBe(422)
    })

    it("Trying to login with wrong email, return status 404",async () => {
        const newUser = await createNewUser()

        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        await supertest(app).post('/sign-up').send(newUser);
        const result = await supertest(app).post('/sign-in').send({...newLogin, email: "braaa@gmail.com"});
        
        expect(result.status).toBe(404)
    })

    it("Trying to login with wrong password, return status 401",async () => {
        const newUser = await createNewUser()

        const newLogin = {
            email: newUser.email,
            password: "1234",
        }
        await supertest(app).post('/sign-up').send(newUser);
        const result = await supertest(app).post('/sign-in').send({...newLogin, password:"1111"});
        
        expect(result.status).toBe(401)
    })

    it("Trying to login without email and password, return status 422",async () => {
        const result = await supertest(app).post('/sign-in').send({});
        
        expect(result.status).toBe(422)
    })

})
