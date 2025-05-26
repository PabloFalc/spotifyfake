import { BsSpotify } from "react-icons/bs";
export function AboutHero() {
    return (
        <div className="bg-gradient-to-r from-[#071035]/50 to-[#03161a] rounded-lg p-8 mb-8 border border-gray-700">
            <div className="flex items-center gap-4 mb-6">
                <BsSpotify size={48} />

                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Spotify 100%
                    </h2>
                    <p className="text-[#476cff]">
                        Sua música, nossa falta de responsabilidade
                    </p>
                </div>
            </div>

            <div className="space-y-4 text-gray-300">
                <p>
                    O{" "}
                    <strong className="text-[#91a7ff]">
                        Spotify 100% grátis online for free
                    </strong>{" "}
                    é uma empresa comprometida com o bem-estar emocional,
                    espiritual e financeiro dos nossos usuários. Para garantir a
                    melhor experiência, coletamos apenas os dados essenciais:
                    número do cartão de crédito, nome da mãe, estado civil...
                    mas não se preocupe, você está em boas mãos!
                </p>
                <p>
                    Nossa missão é simples: tornar sua vida mais feliz enquanto
                    sabemos absolutamente tudo sobre você.
                </p>
            </div>
        </div>
    );
}
