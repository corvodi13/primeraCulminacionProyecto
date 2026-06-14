export default class Cl_vUsuarios {
    private inIdEquipo;
    private btReportarFalla;
    private tablaCuerpoUser;
    private filtroUbicacion;
    private filtroProcesador;
    private filtroMemoria;
    private filtroMarca;
    constructor();
    get idEquipo(): string;
    get tablaEquipo(): HTMLElement;
    get valoresFiltros(): {
        ubicacion: string;
        procesador: string;
        memoria: string;
        marca: string;
    };
    onCambioFiltro(callback: () => void): void;
    onReportarFalla(callback: () => void): void;
    extraerDatos(equipoDatos: any, accionReportar: (id: string) => void): DocumentFragment;
}
//# sourceMappingURL=Cl_vUsuarios.d.ts.map