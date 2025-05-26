import type { BaseReply } from "@/types/basic.type";
import type { User, UserCreateInput } from "@/types/user.types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(
    bodyUser: UserCreateInput
): Promise<{ success: boolean; message: string }> {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyUser),
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: result.msg,
            };
        }
        return { success: false, message: result.msg };
    } catch (error) {
        console.error("Erro de registro: ", error);
        return {
            success: false,
            message: "Erro de conexão ou servidor indisponível.",
        };
    }
}

export async function fetchUsers(query: string): Promise<User[]> {
    try {
        if (!query.trim()) return [];
        const response = await fetch(`${BASE_URL}/users/search`);
        console.log(query);

        if (!response.ok) {
            console.error(response.status, response.statusText);
            return [];
        }

        const result = await response.json();

        if (result?.data) {
            const data = Array.isArray(result.data)
                ? result.data
                : [result.data].filter(Boolean);
            // Filtrar usuários que contenham o termo de busca
            return data.filter(
                (user: User) =>
                    user.name.toLowerCase().includes(query.toLowerCase()) ||
                    user.email.toLowerCase().includes(query.toLowerCase())
            );
        }

        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getAllUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users/search`);

        if (!response.ok) {
            console.error(response.status, response.statusText);
            return [];
        }

        const result = await response.json();

        return result.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function findUserById(id: string): Promise<User | null> {
    try {
        const response = await fetch(`${BASE_URL}/users/find/${id}`);

        if (!response.ok) {
            console.error(response.status, response.statusText);
            return null;
        }

        const result: BaseReply<User> = await response.json();
        console.log(result);

        if (!result.data) {
            return null;
        }

        return result.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
