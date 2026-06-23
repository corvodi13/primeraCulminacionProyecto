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
public obtenerEquiposMasDeUnaSemana(listaAProcesar?: Cl_mEquipos[]): Cl_mEquipos[] {
       
        const equiposAAnalizar = listaAProcesar ? listaAProcesar : this._equipos;
        
        const fechaLimite = new Date();
       
        fechaLimite.setDate(fechaLimite.getDate() - 7);

        return equiposAAnalizar.filter(equipo => equipo.fechaRegistro < fechaLimite);
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
  //////////////////////////////////////////////////////

    public obtenerPorcentajeActivosPorLaboratorio(idLaboratorio: string, listaAProcesar?: Cl_mEquipos[]): { laboratorio: string, porcentaje: number } {
    const equiposAAnalizar = listaAProcesar ? listaAProcesar : this._equipos;

    // Filtramos para quedarnos únicamente con los equipos del laboratorio seleccionado
    const equiposDelLab = equiposAAnalizar.filter(equipo => {
        const lab = equipo.ubicacion ? equipo.ubicacion.toString().trim() : "";
        return lab === idLaboratorio.toString().trim();
    });

    const totalEquiposLab = equiposDelLab.length;

    
    if (totalEquiposLab === 0) return { laboratorio: idLaboratorio.trim() === "" ? "--" : idLaboratorio.trim(), porcentaje: 0 };
    const equiposActivos = equiposDelLab.filter(equipo => equipo.estado === 'Activo').length;

     let porcentajeActivos = Math.round((equiposActivos / totalEquiposLab) * 100);
     let nombreLab = idLaboratorio.trim() === "" ? "--" : idLaboratorio.trim();

   
    return { laboratorio: nombreLab, porcentaje: porcentajeActivos }; 
    }

    public calcularPorcentajeEstadoPorLaboratorio(idlaboratorio: string, estadoSeleccionado: string, listaAProcesar?: Cl_mEquipos[]): {estado: string, porcentaje: number } {
        const equiposAAnalizar = listaAProcesar ? listaAProcesar : this._equipos;
        const equiposDelLab = equiposAAnalizar.filter(equipo => {
            const lab = equipo.ubicacion ? equipo.ubicacion.toString().trim() : "";
            return lab === idlaboratorio.toString().trim();
        });
        const totalEquiposLab = equiposDelLab.length;
        if (totalEquiposLab === 0) return { estado: estadoSeleccionado.trim() === "" ? "--" : estadoSeleccionado.trim(), porcentaje: 0 };

        const equiposConEstado = equiposDelLab.filter(equipo => equipo.estado === estadoSeleccionado).length;
        const porcentaje = Math.round((equiposConEstado / totalEquiposLab) * 100);
        return { estado: estadoSeleccionado, porcentaje };
    }}