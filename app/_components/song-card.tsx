"use client";

import type { Song } from "@/types/song.types";
import { Play, Heart, Trash2 } from "lucide-react";
import Image from "next/image";

interface SongCardProps {
    song: Song;
    onDelete: (songId: string) => void;
}

export function SongCard({ song, onDelete }: SongCardProps) {
    const handlePlay = () => {
        window.open(song.songUrl, "_blank");
    };

    return (
        <div
            className="bg-[#141414] p-4 rounded-lg hover:bg-[#202020] transition-colors cursor-pointer group relative"
            onClick={handlePlay}
        >
            <div className="relative mb-4 shadow-sm">
                <Image
                    src={song.imgUrl || "/placeholder.svg"}
                    alt={song.title}
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover rounded-md"
                />

                <button
                    type="button"
                    aria-label="Play song"
                    className="absolute bottom-2 right-2 bg-[#476cff] rounded-full p-3 opacity-0 group-hover:opacity-100 transition-transform transform hover:scale-105 shadow-lg"
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePlay();
                    }}
                >
                    <Play className="w-5 h-5 text-black fill-black" />
                </button>

                <button
                    type="button"
                    aria-label="Delete song"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-gray-900/70 p-1 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(song.id);
                    }}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <h3 className="font-semibold text-white mb-1 truncate">
                {song.title}
            </h3>

            <div className="flex items-center justify-between text-gray-400 text-sm">
                <span>{new Date(song.createdAt).getFullYear()}</span>
                <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{song.likesCount}</span>
                </div>
            </div>
        </div>
    );
}
