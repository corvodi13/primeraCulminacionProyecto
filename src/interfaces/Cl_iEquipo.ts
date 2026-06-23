export interface iEquipo{
    id?: string | undefined;
    marca: string;
    procesador: string;
    memoria: number;
    ubicacion: string;
    meson: string;
    puesto: string;
    estado: 'Activo' | 'Reportado' | 'Mantenimiento';
    observacion: string;
    fechaRegistro: Date;
}