export interface PerfilDireccion {
  id: string;
  etiqueta: string | null;
  calle: string;
  numero: string;
  piso: string | null;
  departamento: string | null;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  pais: string;
  observaciones: string | null;
  esPrincipal: boolean;
}

export interface PerfilResponse {
  id: string;
  name: string;
  last_name: string | null;
  email: string;
  cliente_id: string;
  direcciones: PerfilDireccion[];
  direccion_principal: PerfilDireccion | null;
}

