export default class Cl_mEquipos {
    private _marca;
    private _procesador;
    private _memoria;
    private _ubicacion;
    private _meson;
    private _puesto;
    private _estado;
    private _observacion;
    private _id?;
    constructor(marca: string, procesador: string, memoria: number, ubicacion: string, meson: string, puesto: string, estado: 'Activo' | 'Reportado' | 'Mantenimiento', observacion: string, id?: string);
    set id(id: string);
    set marca(marca: string);
    set procesador(procesador: string);
    set memoria(memoria: number);
    set ubicacion(ubicacion: string);
    set estado(estado: 'Activo' | 'Reportado' | 'Mantenimiento');
    set meson(meson: string);
    set puesto(puesto: string);
    set observacion(observacion: string);
    get id(): string | undefined;
    get marca(): string;
    get procesador(): string;
    get memoria(): number;
    get ubicacion(): string;
    get estado(): 'Activo' | 'Reportado' | 'Mantenimiento';
    get meson(): string;
    get puesto(): string;
    get observacion(): string;
    Mantenimiento(): boolean;
    Reportado(): boolean;
    Activo(): boolean;
    toJSON(): {
        id: string | undefined;
        marca: string;
        procesador: string;
        memoria: number;
        ubicacion: string;
        meson: string;
        puesto: string;
        estado: "Activo" | "Reportado" | "Mantenimiento";
        observacion: string;
    };
}
//# sourceMappingURL=Cl_mEquipos.d.ts.map