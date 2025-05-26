import { SongCard } from "./song-card";
import type { Song } from "@/types/song.types";

type SongsGridProps = {
    songs: Song[];
    isLoading: boolean;
    error?: string | null;
    onRetry: () => void;
    onDelete: (songId: string) => void;
};

export function SongsGrid({
    songs,
    isLoading,
    error,
    onRetry,
    onDelete,
}: SongsGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-gray-800 p-4 rounded-lg animate-pulse"
                    >
                        <div className="w-full aspect-square bg-gray-700 rounded-md mb-4" />
                        <div className="h-4 bg-gray-700 rounded mb-2" />
                        <div className="h-3 bg-gray-700 rounded w-2/3" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    {error}
                </h3>
                <button type="button" onClick={onRetry}>
                    Tentar novamente
                </button>
            </div>
        );
    }

    if (songs.length === 0) {
        return <div className="text-white">Nenhuma música encontrada</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {songs.map((song) => (
                <SongCard key={song.id} song={song} onDelete={onDelete} />
            ))}
        </div>
    );
}
