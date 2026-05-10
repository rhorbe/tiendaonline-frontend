export interface Direccion {
  id: string;
  clienteId: string;
  etiqueta: string | null;
  telefono: string;
  calle: string;
  numero: string;
  piso : string;
  departamento: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  observaciones: string;
  esPrincipal: boolean;
}

