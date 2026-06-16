import Cl_mEquipos from "./Cl_mEquipos.js";

export default class Cl_mLaboratorio {
    private _equipos: Cl_mEquipos[];

    constructor() {
        this._equipos = [];
    }

    public set equipos(lista: Cl_mEquipos[]) {
        this._equipos = lista;
    }

    public get equipos(): Cl_mEquipos[] {
        return this._equipos;
    }
    public obtenerEquiposReportados(): Cl_mEquipos[] {
        return this._equipos.filter(equipo => equipo.Reportado());
    }
    public obtenerEquiposEnMantenimiento(): Cl_mEquipos[] {
        return this._equipos.filter(equipo => equipo.Mantenimiento());
    }

    public obtenerEquiposDisponiblesEstudiantes(): Cl_mEquipos[] {
        return this._equipos.filter(equipo => equipo.Activo());
    }

    public contarEquiposInactivos(listaEquipos: Cl_mEquipos[]): number {
    return listaEquipos.filter(eq => eq.estado === 'Reportado' || eq.estado === 'Mantenimiento').length;
    }
    public calcularPorcentajeDañados(listaEquipos: Cl_mEquipos[]): number {
    const total = listaEquipos.length;
    if (total === 0) return 0;
    
    const inactivos = this.contarEquiposInactivos(listaEquipos);
    return Math.round((inactivos / total) * 100);
    }   
    public equiposParaEstudiantes(): Cl_mEquipos[] {
        return this._equipos.filter(equipo => equipo.estado === 'Activo');
    }

    
    //////////////////////////////////

    public obtenerLaboratorioConMenosEquipos(listaAProcesar?: Cl_mEquipos[]): { laboratorio: string; cantidad: number } {
    const equiposAAnalizar = listaAProcesar ? listaAProcesar : this._equipos;
    const conteoLabs = new Map<string, number>();

    //inicializamos el conteo 
    for (let i = 1; i <= 6; i++) {
        conteoLabs.set(i.toString(), 0);
    }

    //contamos la cantidad de equipos por laboratorio
    equiposAAnalizar.forEach(equipo => {
        const lab = equipo.ubicacion ? equipo.ubicacion.toString().trim() : "";
        if (conteoLabs.has(lab)) {
            conteoLabs.set(lab, (conteoLabs.get(lab) || 0) + 1);
        }
    });

    let labMenosMaquinas = "Ninguno";
    let minMaquinas = Infinity;

    for (const [lab, cantidad] of conteoLabs.entries()) {
        if (cantidad < minMaquinas) {
            minMaquinas = cantidad;
            labMenosMaquinas = lab;
        }
    }

    return {
        laboratorio: labMenosMaquinas === "Ninguno" ? "--" : labMenosMaquinas,
        cantidad: minMaquinas === Infinity ? 0 : minMaquinas
    };
}
}