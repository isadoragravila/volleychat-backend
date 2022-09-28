import  { Users } from '@prisma/client';

export type IRegisterData = Omit<Users, 'id'>;

export type ILoginData = { 
    email: string,
    password: string
}
