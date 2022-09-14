import { Users } from "@prisma/client";

export type UserInsertData = Omit<Users, 'id'>;


export type UserBodyData = {email:string, password:string, passwordConfirmation: string };

export type UserResponseData = Omit<Users, 'userId'>;
