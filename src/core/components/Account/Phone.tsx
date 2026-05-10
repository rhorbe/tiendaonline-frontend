import type { PerfilResponse } from '@/core/models/Perfil';

type PhoneProps = {
    perfil: PerfilResponse | null;
};

export default function Phone({ perfil }: PhoneProps) {
    return (
        <div className="w-full space-y-10 py-10 md:py-0 md:px-[72px]">
            <div className="space-y-5">
                <p className="text-app-black font-poppins text-xl/7 font-semibold">
                    Teléfono
                </p>
            </div>
            <div className="space-y-3 w-full max-w-md">
                <label htmlFor="phone" className="text-app-gray font-inter text-sm/3 font-bold uppercase">
                    Número de teléfono
                </label>
                <input
                    placeholder="Número de teléfono"
                    type="tel"
                    name="phone"
                    id="phone"
                    value={perfil?.telefono ?? ''}
                    className="border border-muted-gray outline-none ring-0 focus:ring-0 w-full rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                />
            </div>
        </div>
    )
}

