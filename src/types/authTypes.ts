import  { Users } from '@prisma/client';

export type IRegisterData = Omit<Users, 'id'>;

export type ILoginData = { 
    username: string,
    password: string
}

export type IProfileData = Partial<Users>;