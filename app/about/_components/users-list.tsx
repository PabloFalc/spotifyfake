import { Users } from "lucide-react";
import { UserCard } from "./user-card";
import type { User } from "@/types/user.types";

interface Props {
    users: User[];
    isLoading: boolean;
    onUserClick: (userId: string) => void;
}

export function UsersList({ users, isLoading, onUserClick }: Props) {
    return (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-[#1ad9ff]" />
                <h2 className="text-2xl font-semibold text-white">
                    Usuários Registrados
                </h2>
                <span className="bg-[#476cff] text-white text-xs px-2 py-1 rounded-full">
                    {users.length} usuários
                </span>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-gray-800 p-4 rounded-lg animate-pulse"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-700 rounded-full" />
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-700 rounded mb-2" />
                                    <div className="h-3 bg-gray-700 rounded w-2/3" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">
                        Nenhum usuário encontrado.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Seja o primeiro a se registrar!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onClick={onUserClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
