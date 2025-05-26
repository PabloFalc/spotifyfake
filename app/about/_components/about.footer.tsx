export function AboutFooter() {
    return (
        <footer className="mt-12 py-8 border-t bg-black/20 border-gray-800/50 w-full">
            <div className="text-center space-y-2">
                <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} Spotify 100% for free — Sua
                    música, nossa falta de responsabilidade.
                </p>
                <p className="text-gray-600 text-xs">
                    Nós coletamos dados, mas só para te fazer mais feliz!
                </p>
            </div>
        </footer>
    );
}
