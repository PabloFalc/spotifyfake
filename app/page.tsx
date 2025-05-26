"use client";

import { useEffect, useState } from "react";
import { fetchSongs } from "@/lib/api/songs";
import type { Song } from "@/types/song.types";
import type { User } from "@/types/user.types";
import { Header } from "./_components/header";
import { SongsGrid } from "./_components/songs-grid";
import { UserModal } from "@/app/_components/user-modal";
import { deleteSong } from "@/lib/api/songs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [isLoadingSongs, setIsLoadingSongs] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    useEffect(() => {
        loadSongs();
    }, []);

    const handleDelete = async (songId: string) => {
        try {
            await deleteSong(songId);
            setSongs((prevSongs) => prevSongs.filter((s) => s.id !== songId));
        } catch (error) {
            console.error("Erro ao deletar música:", error);
        }
    };

    const loadSongs = async () => {
        try {
            setIsLoadingSongs(true);
            setError(null);
            const songsData = await fetchSongs();
            setSongs(songsData);
        } catch (err) {
            console.error("Error loading songs:", err);
            setError("Erro ao carregar músicas");
        } finally {
            setIsLoadingSongs(false);
        }
    };

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
        setIsUserModalOpen(true);
    };

    const closeUserModal = () => {
        setIsUserModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#00061e] to-black">
            <Header onUserSelect={handleUserSelect} />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Músicas em{" "}
                        <span className="text-[#476cff]">destaque</span>
                    </h2>
                    <p className="text-gray-400">
                        Descubra as melhores músicas
                    </p>
                </div>

                <SongsGrid
                    songs={songs}
                    isLoading={isLoadingSongs}
                    error={error}
                    onRetry={loadSongs}
                    onDelete={handleDelete}
                />
            </main>

            <UserModal
                user={selectedUser}
                isOpen={isUserModalOpen}
                onClose={closeUserModal}
            />
        </div>
    );
}
