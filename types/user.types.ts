export interface User {
    id: string;
    name: string;
    email: string;
    img: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserCreateInput {
    name: string;
    email: string;
    password: string;
    img: string;
}
