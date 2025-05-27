"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserSearch } from "./user-search";
import type { User } from "@/types/user.types";
import { BsSpotify } from "react-icons/bs";

type HeaderProps = {
    onUserSelect: (user: User) => void;
};

export function Header({ onUserSelect }: HeaderProps) {
    return (
        <header className="bg-black/50 backdrop-blur-sm border-b border-[#00061e] sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-4 flex-wrap flex-grow-1 gap-4">
                    <div className="flex items-center gap-2">
                        <BsSpotify size={48} />
                        <h1 className="text-2xl font-bold text-white">
                            Spotify 100% gratuito
                        </h1>
                    </div>

                    <UserSearch onUserSelect={onUserSelect} />

                    <div className="flex gap-4">
                        <Link href="/register">
                            <Button
                                variant="outline"
                                className="bg-black border-[#1AD9FF] text-[#1AD9FF] hover:bg-[#1AD9FF] hover:text-white transition-colors"
                            >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Registrar usuário ou Música
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                variant="outline"
                                className="bg-black border-[#476cff] text-[#476cff] hover:bg-[#476cff] hover:text-white transition-colors"
                            >
                                Sobre nós
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
