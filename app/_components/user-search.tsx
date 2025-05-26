"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchUsers, findUserById } from "@/lib/api/users";
import type { User } from "@/types/user.types";
import Image from "next/image";

interface UserSearchProps {
    onUserSelect: (user: User) => void;
}

export function UserSearch({ onUserSelect }: UserSearchProps) {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const searchUsersDebounced = async () => {
            if (query.trim().length < 2) {
                setUsers([]);
                setShowResults(false);
                return;
            }

            setIsLoading(true);
            try {
                const results = await fetchUsers(query);
                setUsers(results);
                setShowResults(true);
            } catch (error) {
                console.error("Error searching users:", error);
                setUsers([]);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(searchUsersDebounced, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleUserClick = async (userId: string) => {
        try {
            const user = await findUserById(userId);
            if (user) {
                onUserSelect(user);
                setQuery("");
                setShowResults(false);
            }
        } catch (error) {
            console.error("Error finding user:", error);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setUsers([]);
        setShowResults(false);
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    type="text"
                    placeholder="Buscar usuários..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-10 bg-[#141414] border-[#252525] text-white"
                />
                {query && (
                    // biome-ignore lint/a11y/useButtonType: <explanation>
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {showResults && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#151515] border border-[#303030] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-4 text-center text-gray-400">
                            Buscando...
                        </div>
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            // biome-ignore lint/a11y/useButtonType: <explanation>
                            <button
                                key={user.id}
                                onClick={() => handleUserClick(user.id)}
                                className="w-full p-3 text-left hover:bg-[#252525] transition-colors flex items-center gap-3"
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#476cff]">
                                    <Image
                                        src={user.img || "/default-avatar.png"}
                                        alt={user.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-medium">
                                        {user.name}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {user.email}
                                    </p>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-400">
                            Nenhum usuário encontrado
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
