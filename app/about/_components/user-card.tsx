import type { User } from "@/types/user.types";
import Image from "next/image";

interface Props {
    user: User;
    onClick: (userId: string) => void;
}

export function UserCard({ user, onClick }: Props) {
    return (
        <button
            type="button"
            onClick={() => onClick(user.id)}
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors text-left group border border-gray-700 hover:border-gray-600"
        >
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#476cff]">
                        <Image
                            src={user.img || "/default-avatar.png"}
                            alt={user.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate group-hover:text-blue-300 transition-colors">
                        {user.name}
                    </p>
                    <p className="text-gray-400 text-sm truncate">
                        {user.email}
                    </p>
                    <p className="text-gray-500 text-xs">
                        Membro desde {new Date(user.createdAt).getFullYear()}
                    </p>
                </div>
            </div>
        </button>
    );
}
