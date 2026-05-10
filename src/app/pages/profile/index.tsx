import AccountDetails from "@/core/components/Account/Account";
import Address from "@/core/components/Account/Address";
import Phone from "@/core/components/Account/Phone";
import Orders from "@/core/components/Account/Orders";
import { fetchPerfil } from "@/core/api/perfilApi";
import { PerfilResponse } from "@/core/models/Perfil";
import { useAuth } from "@/store/useAuth";
import { useEffect, useState, useRef } from "react";

export default function ProfilePage() {
    const { user, updateUser } = useAuth();
    const [activeIndex, setActiveIndex] = useState(0);
    const [perfil, setPerfil] = useState<PerfilResponse | null>(null);
    const [loadingPerfil, setLoadingPerfil] = useState(true);
    const [perfilError, setPerfilError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const isPostUpdateRefresh = useRef(false);

    useEffect(() => {
        let isMounted = true;

        const loadPerfil = async () => {
            try {
                // Solo mostrar loading si no es un refresh silencioso post-actualización
                if (!isPostUpdateRefresh.current) {
                    setLoadingPerfil(true);
                }
                const data = await fetchPerfil();

                if (!isMounted) {
                    return;
                }

                setPerfil(data);
                updateUser({
                    name: data.name,
                    cliente_id: data.cliente_id,
                });
                setPerfilError(null);
                isPostUpdateRefresh.current = false;
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setPerfilError(error instanceof Error ? error.message : "No se pudo cargar el perfil.");
                isPostUpdateRefresh.current = false;
            } finally {
                if (isMounted) {
                    // Solo ocultar loading si fue mostrado
                    if (!isPostUpdateRefresh.current) {
                        setLoadingPerfil(false);
                    }
                }
            }
        };

        void loadPerfil();

        return () => {
            isMounted = false;
        };
    }, [refreshKey, updateUser]);

    const handlePerfidUpdate = () => {
        setRefreshKey(prev => prev + 1);
    };

    const handlePerfilChange = (perfilActualizado?: PerfilResponse) => {
        if (perfilActualizado) {
            // Actualizar inmediatamente la pantalla con los datos guardados
            setPerfil(perfilActualizado);
            updateUser({
                name: perfilActualizado.name,
                cliente_id: perfilActualizado.cliente_id,
            });

            // Hacer refresh silencioso en background después de 1 segundo
            isPostUpdateRefresh.current = true;
            setTimeout(() => {
                setRefreshKey(prev => prev + 1);
            }, 1000);
        } else {
            // Si no tenemos datos, hacer refresh inmediato
            setRefreshKey(prev => prev + 1);
        }
    };

    const perfilVisible: PerfilResponse | null = perfil ?? (user ? {
        id: user.id,
        name: user.name,
        last_name: null,
        email: user.email,
        telefono: null,
        cliente_id: user.cliente_id ?? "",
        direcciones: [],
        direccion_principal: null,
    } : null);

    const nombreVisible = [perfilVisible?.name, perfilVisible?.last_name].filter(Boolean).join(" ").trim() || "Mi Cuenta";
    const menuItems = [
        "Datos del usuario",
        "Contraseña",
        "Notificaciones",
        "Direcciones",
        "Teléfono",
        "Pedidos",
    ];

    return (
        <section className="px-8 lg:px-14 pb-20">
            <h1 className="py-10 md:py-20 font-poppins text-[40px]/[44px] md:text-[54px]/[58px] text-center font-medium">
                Mi Cuenta
            </h1>
            <div className="mb-6 text-center">
                <p className="text-app-black font-poppins text-2xl font-medium">{nombreVisible}</p>
                {perfilVisible?.email && (
                    <p className="text-app-gray font-inter text-sm mt-1">{perfilVisible.email}</p>
                )}
                {loadingPerfil && (
                    <p className="text-app-gray font-inter text-sm mt-2">Cargando datos del perfil...</p>
                )}
                {perfilError && (
                    <p className="text-red-500 font-inter text-sm mt-2">{perfilError}</p>
                )}
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="py-10 px-4 w-full md:w-fit bg-app-light-gray rounded-lg space-y-10 h-fit">
                    <div className="flex flex-col items-center gap-[6px]">
                        <p className="text-app-black font-inter text-xl/8 font-semibold">
                            {nombreVisible}
                        </p>
                        {perfilVisible?.email && (
                            <p className="text-app-gray font-inter text-sm">
                                {perfilVisible.email}
                            </p>
                        )}
                    </div>
                    <ul className="space-y-2 min-w-[230px] hidden md:block">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`py-2 font-inter text-base font-semibold leading-[26px] cursor-pointer ${activeIndex === index ? 'text-app-black border-b border-app-black' : 'text-app-gray'
                                    }`}>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="min-w-[230px] block md:hidden">
                        <select
                            className="w-full py-2 font-inter text-base font-semibold leading-[26px] cursor-pointer border border-app-gray rounded-md"
                            value={activeIndex}
                            onChange={(e) => setActiveIndex(parseInt(e.target.value))}
                        >
                            {menuItems.map((item, index) => (
                                <option
                                    key={index}
                                    value={index}
                                    className={`font-inter text-base font-semibold leading-[26px] ${activeIndex == index ? 'text-app-black' : 'text-app-gray'
                                        }`}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {
                    activeIndex == 0 &&
                    <AccountDetails perfil={perfilVisible} onPerfidUpdate={handlePerfidUpdate} onPerfilChange={handlePerfilChange} showDatos={true} showPassword={false} showNotificaciones={false} />
                }
                {
                    activeIndex == 1 &&
                    <AccountDetails perfil={perfilVisible} onPerfidUpdate={handlePerfidUpdate} onPerfilChange={handlePerfilChange} showDatos={false} showPassword={true} showNotificaciones={false} />
                }
                {
                    activeIndex == 2 &&
                    <AccountDetails perfil={perfilVisible} onPerfidUpdate={handlePerfidUpdate} onPerfilChange={handlePerfilChange} showDatos={false} showPassword={false} showNotificaciones={true} />
                }
                {
                    activeIndex == 3 &&
                    <Address perfil={perfilVisible} onAddressUpdate={handlePerfidUpdate} />
                }
                {
                    activeIndex == 4 &&
                    <Phone perfil={perfilVisible} onPhoneUpdate={handlePerfidUpdate} onPerfilChange={handlePerfilChange} />
                }
                {
                    activeIndex == 5 &&
                    <Orders />
                }
            </div>
        </section>
    )
}
