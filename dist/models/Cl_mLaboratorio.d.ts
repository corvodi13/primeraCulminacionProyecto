import Cl_mEquipos from "./Cl_mEquipos.js";
export default class Cl_mLaboratorio {
    private _equipos;
    constructor();
    set equipos(lista: Cl_mEquipos[]);
    get equipos(): Cl_mEquipos[];
    obtenerEquiposReportados(): Cl_mEquipos[];
    obtenerEquiposEnMantenimiento(): Cl_mEquipos[];
    obtenerEquiposDisponiblesEstudiantes(): Cl_mEquipos[];
    contarEquiposInactivos(listaEquipos: Cl_mEquipos[]): number;
    calcularPorcentajeDañados(listaEquipos: Cl_mEquipos[]): number;
    equiposParaEstudiantes(): Cl_mEquipos[];
    obtenerLaboratorioConMenosEquipos(listaAProcesar?: Cl_mEquipos[]): {
        laboratorio: string;
        cantidad: number;
    };
    obtenerPorcentajeActivosPorLaboratorio(idLaboratorio: string, listaAProcesar?: Cl_mEquipos[]): {
        laboratorio: string;
        porcentaje: number;
    };
    calcularPorcentajeEstadoPorLaboratorio(idlaboratorio: string, estadoSeleccionado: string, listaAProcesar?: Cl_mEquipos[]): {
        estado: string;
        porcentaje: number;
    };
}
//# sourceMappingURL=Cl_mLaboratorio.d.ts.map