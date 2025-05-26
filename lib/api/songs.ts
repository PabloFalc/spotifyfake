import type { Song, SongCreateInput } from "@/types/song.types";
import type { BaseReply } from "@/types/basic.type";

const BASE_URL = "http://localhost:3100";

export async function fetchSongs(): Promise<Song[]> {
    try {
        const response = await fetch(`${BASE_URL}/songs/search`);

        if (!response.ok) {
            console.error(
                "API response not ok:",
                response.status,
                response.statusText
            );
            return [];
        }

        const result = await response.json();
        console.log("API response:", result);

        // Garantir que data seja sempre um array
        if (result?.data) {
            const data = Array.isArray(result.data)
                ? result.data
                : [result.data].filter(Boolean);
            return data;
        }

        console.error(result);
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function registerSongs(body: SongCreateInput) {
    try {
        const res = await fetch(`${BASE_URL}/songs/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return {
                success: false,
                message: errorData.msg || "Erro ao criar música.",
            };
        }

        return { success: true, message: "Música criada com sucesso!" };
    } catch (error) {
        return { success: false, message: "Erro de rede ao criar música." };
    }
}

export async function findSongById(id: string): Promise<BaseReply<Song>> {
    try {
        const res = await fetch(`${BASE_URL}/songs/find/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errorData: BaseReply<Song> = await res.json();
            return {
                success: false,
                msg: errorData.msg,
            };
        }

        const data: BaseReply<Song> = await res.json();
        return {
            success: true,
            msg: data.msg,
            data: data.data,
        };
    } catch (error) {
        return {
            success: false,
            msg: "Erro na requisição:",
        };
    }
}

export async function updateSong(
    id: string,
    updatedData: Partial<Song>
): Promise<BaseReply<Song>> {
    try {
        const res = await fetch(`${BASE_URL}/songs/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!res.ok) {
            const errorData: BaseReply<Song> = await res.json();
            return {
                success: false,
                msg: errorData.msg,
            };
        }

        const data: BaseReply<Song> = await res.json();
        return {
            success: true,
            msg: data.msg,
            data: data.data,
        };
    } catch (error) {
        return {
            success: false,
            msg: "Erro na requisição:",
        };
    }
}

export async function deleteSong(id: string): Promise<BaseReply<null>> {
    try {
        const res = await fetch(`${BASE_URL}/songs/delete/${id}`, {
            method: "DELETE",
        });

        const data: BaseReply<null> = await res.json();

        if (!res.ok) {
            console.log(data.msg);
            return {
                success: false,
                msg: data.msg,
            };
        }

        return {
            success: true,
            msg: data.msg,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            msg: "Erro na requisição",
        };
    }
}
