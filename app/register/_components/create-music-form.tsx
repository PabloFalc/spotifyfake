"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSongs } from "@/lib/api/songs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import { CardUI } from "./ui/card-ui";
import { Progress } from "./ui/progress";
import { BsSpotify } from "react-icons/bs";

export function CreateMusicForm() {
    const [form, setForm] = useState({
        imgUrl: "",
        songUrl: "",
        title: "",
        userId: "",
    });
    const [status, setStatus] = useState({
        loading: false,
        error: "",
        success: false,
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ loading: true, error: "", success: false });

        const { success, message } = await registerSongs({
            imgUrl: form.imgUrl,
            songUrl: form.songUrl,
            title: form.title,
        });

        setStatus({ loading: false, error: success ? "" : message, success });

        if (success) {
            setForm({ imgUrl: "", songUrl: "", title: "", userId: "" });
            router.push("/");
        }
    };

    if (status.success) {
        return (
            <CardUI>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Música criada com sucesso!
                </h2>
                <Progress />
            </CardUI>
        );
    }

    return (
        <Card className="bg-[#141414] rounded-md">
            <CardHeader className="text-center flex flex-col justify-center items-center gap-3">
                <BsSpotify size={36} />
                <CardTitle className="text-xl font-bold text-white">
                    Criar nova música
                </CardTitle>

                <CardDescription className="text-gray-400">
                    Preencha os dados para adicionar uma música
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {["imgUrl", "songUrl", "title"].map((field) => (
                        <div key={field} className="space-y-2">
                            <Label htmlFor={field} className="text-white">
                                {field === "imgUrl"
                                    ? "URL da imagem"
                                    : field === "songUrl"
                                    ? "URL da música"
                                    : "Título"}
                            </Label>
                            <Input
                                id={field}
                                type="text"
                                value={form[field as keyof typeof form]}
                                onChange={handleChange}
                                required
                                className="bg-[#202020] border border-[#303030] p-2 w-full hover:border-[#476cff] transition-colors duration-100 focus:border-none"
                            />
                        </div>
                    ))}

                    {status.error && (
                        <div className="text-red-400 text-sm text-center">
                            {status.error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-br to-[#1AD9FF] from-[#476cff] text-white rounded-full font-semibold hover:shadow-[#476cff] shadow-md transition-all duration-500"
                        disabled={status.loading}
                    >
                        {status.loading ? "Criando música..." : "Criar música"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
