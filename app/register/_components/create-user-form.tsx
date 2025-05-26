"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/users";
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

export function CreateUserForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        foto: "",
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

        const { success, message } = await registerUser({
            name: form.name,
            email: form.email,
            password: form.password,
            img: form.foto,
        });

        setStatus({ loading: false, error: success ? "" : message, success });

        if (success) {
            setForm({ name: "", email: "", password: "", foto: "" });
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
                    Conta criada com sucesso!
                </h2>
                <Progress />
            </CardUI>
        );
    }

    return (
        <Card className="bg-[#141414] p-4">
            <CardHeader className="text-center flex flex-col justify-center items-center gap-3">
                <BsSpotify size={36} />

                <CardTitle className="text-xl font-bold text-white">
                    Criar nova conta
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Preencha com os dados mais sensíveis para se cadastrar
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {["name", "email", "password", "foto"].map((field) => (
                        <div key={field} className="space-y-2">
                            <Label htmlFor={field} className="text-white">
                                {field === "name"
                                    ? "Nome completo"
                                    : field === "email"
                                    ? "Email"
                                    : field === "password"
                                    ? "Senha"
                                    : "Foto"}
                            </Label>
                            <Input
                                id={field}
                                type={
                                    field === "password"
                                        ? "password"
                                        : field === "email"
                                        ? "email"
                                        : "text"
                                }
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
                        {status.loading ? "Criando conta..." : "Criar conta"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
