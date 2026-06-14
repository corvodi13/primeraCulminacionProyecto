import { iEquipo } from "../interfaces/Cl_iEquipo.js";
export default class Cl_vEquipoVista {
    private inIdEquipo;
    private btMantenimiento;
    private btResolver;
    private consolaData;
    private tablaCuerpoEquipo;
    private btToggleFormulario;
    private panelFormularioAgregar;
    private formularioEquipo;
    private btCancelarRegistro;
    private filtroUbicacion;
    private filtroProcesador;
    private filtroMemoria;
    private filtroEstado;
    private lblPorcentajeMantenimiento;
    private lblLabMenos;
    private lblCantMenos;
    constructor();
    private conmutarFormulario;
    get idEquipo(): string;
    get consolaDatas(): HTMLElement;
    get tablaEquipo(): HTMLElement;
    get valoresFiltros(): {
        ubicacion: string;
        procesador: string;
        memoria: string;
        estado: string;
    };
    onCambioFiltro(callback: () => void): void;
    get datosNuevoEquipo(): any;
    onAgregarEquipo(callback: (datos: any) => void): void;
    extraerDatos(equipoDatos: iEquipo): DocumentFragment;
    onMantenimiento(callback: () => void): void;
    onResolver(callback: () => void): void;
    actualizarEstadisticas(total: number, inactivos: number, porcentaje: number): void;
    actualizarPanelMenosMaquinas(laboratorio: string, cantidad: number): void;
}
//# sourceMappingURL=Cl_vEquipo.d.ts.map