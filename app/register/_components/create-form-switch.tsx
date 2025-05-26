"use client";

import { useState } from "react";
import { CreateUserForm } from "./create-user-form";
import { CreateMusicForm } from "./create-music-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function CreateFormSwitcher() {
    const [formType, setFormType] = useState<"user" | "music">("user");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-6 p-4 bg-gradient-to-br from-[#141414] to-black">
            <Link href="/" className="absolute top-4 left-4">
                <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para home
                </Button>
            </Link>

            <div className="flex space-x-4">
                <Button
                    variant="outline"
                    disabled={formType === "user"}
                    onClick={() => setFormType("user")}
                    className={`border ${
                        formType === "user"
                            ? "border-[#476cff] shadow-md shadow-[#476cff]"
                            : "border-gray-700"
                    }`}
                >
                    Criar Usuário
                </Button>
                <Button
                    variant="outline"
                    disabled={formType === "music"}
                    onClick={() => setFormType("music")}
                    className={`border ${
                        formType === "music"
                            ? "border-[#476cff] shadow-md shadow-[#476cff]"
                            : "border-gray-700"
                    }`}
                >
                    Criar Música
                </Button>
            </div>

            {formType === "user" ? <CreateUserForm /> : <CreateMusicForm />}
        </div>
    );
}
