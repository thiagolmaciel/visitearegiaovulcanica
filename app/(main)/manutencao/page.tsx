import { FaTools } from "react-icons/fa";

export default function ManutencaoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--main-color)]/10 mb-6">
          <FaTools className="text-4xl text-[var(--main-color)]" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema em Manutenção
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Estamos realizando melhorias no sistema.
        </p>
        <p className="text-base text-gray-500">
          Por favor, tente novamente em alguns instantes.
        </p>
      </div>
    </div>
  );
}

