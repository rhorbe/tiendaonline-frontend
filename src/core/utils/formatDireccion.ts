import type { PerfilDireccion } from "@/core/models/Perfil";

const obtenerCodigoPostal = (direccion: PerfilDireccion): string => {
    return direccion.codigoPostal || direccion.codigo_postal || "";
};

export const formatearDireccion = (direccion: PerfilDireccion): string => {
    const calleNumero = [direccion.calle, direccion.numero].filter(Boolean).join(" ").trim();
    const datosIntermedios = [
        direccion.piso ? `Piso ${direccion.piso}` : null,
        direccion.departamento ? `Dpto. ${direccion.departamento}` : null,
    ].filter((parte): parte is string => Boolean(parte));

    const ciudadProvincia = [direccion.ciudad, direccion.provincia].filter(Boolean).join(", ").trim();
    const codigoPostal = obtenerCodigoPostal(direccion);

    const partes = [
        calleNumero || null,
        ...datosIntermedios,
        [codigoPostal ? `(${codigoPostal})` : null, ciudadProvincia || null].filter((parte): parte is string => Boolean(parte)).join(" ").trim() || null,
    ].filter((parte): parte is string => Boolean(parte));

    return partes.join(", ");
};

