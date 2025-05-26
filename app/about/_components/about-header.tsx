import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BsSpotify } from "react-icons/bs";

export function AboutHeader() {
    return (
        <header className="bg-black/50 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between gap-4">
                <Link href="/">
                    <Button
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                    >
                        ← Voltar
                    </Button>
                </Link>
                <BsSpotify size={48} />
            </div>
        </header>
    );
}
