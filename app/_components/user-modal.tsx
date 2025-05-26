"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/types/user.types";

interface UserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

export function UserModal({ user, isOpen, onClose }: UserModalProps) {
    if (!isOpen || !user) return null;

    const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <div className="fixed inset-0 bg-black/50 modal-backdrop flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm bg-[#141414] border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">
                        Perfil do Usuário
                    </CardTitle>
                    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Avatar e Info */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#476cff]">
                            <Image
                                src={user.img || "/default-avatar.png"}
                                alt={user.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <h3 className="text-white font-semibold text-lg">
                                {user.name}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {user.email}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                Membro desde{" "}
                                {new Date(user.createdAt).getFullYear()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
