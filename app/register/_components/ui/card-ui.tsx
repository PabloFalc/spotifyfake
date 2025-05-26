import { Card, CardContent } from "@/components/ui/card";

export function CardUI({ children }: { children: React.ReactNode }) {
    return (
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">{children}</CardContent>
        </Card>
    );
}
