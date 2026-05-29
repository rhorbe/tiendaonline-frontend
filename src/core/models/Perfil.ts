export interface PerfilDireccion {
  id: string;
  etiqueta: string | null;
  calle: string;
  numero: string;
  piso: string | null;
  departamento: string | null;
  ciudad: string;
  provincia: string;
  codigo_postal: string;
  codigoPostal?: string;
  pais: string;
  observaciones: string | null;
  es_principal: boolean;
  esPrincipal?: boolean;
}

export interface PerfilResponse {
  id: string;
  name: string;
  last_name: string | null;
  email: string;
  dni?: string | null;
  telefono?: string | null;
  cliente_id: string;
  direcciones: PerfilDireccion[];
  direccion_principal: PerfilDireccion | null;
}

