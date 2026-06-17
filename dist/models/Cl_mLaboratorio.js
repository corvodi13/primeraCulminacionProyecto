export default class Cl_mLaboratorio {
    _equipos;
    constructor() {
        this._equipos = [];
    }
    set equipos(lista) {
        this._equipos = lista;
    }
    get equipos() {
        return this._equipos;
    }
    obtenerEquiposReportados() {
        return this._equipos.filter(equipo => equipo.Reportado());
    }
    obtenerEquiposEnMantenimiento() {
        return this._equipos.filter(equipo => equipo.Mantenimiento());
    }
    obtenerEquiposDisponiblesEstudiantes() {
        return this._equipos.filter(equipo => equipo.Activo());
    }
    contarEquiposInactivos(listaEquipos) {
        return listaEquipos.filter(eq => eq.estado === 'Reportado' || eq.estado === 'Mantenimiento').length;
    }
    calcularPorcentajeDañados(listaEquipos) {
        const total = listaEquipos.length;
        if (total === 0)
            return 0;
        const inactivos = this.contarEquiposInactivos(listaEquipos);
        return Math.round((inactivos / total) * 100);
    }
    equiposParaEstudiantes() {
        return this._equipos.filter(equipo => equipo.estado === 'Activo');
    }
    //////////////////////////////////
    obtenerLaboratorioConMenosEquipos(listaAProcesar) {
        const equiposAAnalizar = listaAProcesar ? listaAProcesar : this._equipos;
        const conteoLabs = new Map();
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
    obtenerPorcentajeActivosPorLaboratorio(idLaboratorio, listaAProcesar) {
        const equiposAAnalizar = listaAProcesar ? listaAProcesar : this._equipos;
        // Filtramos para quedarnos únicamente con los equipos del laboratorio seleccionado
        const equiposDelLab = equiposAAnalizar.filter(equipo => {
            const lab = equipo.ubicacion ? equipo.ubicacion.toString().trim() : "";
            return lab === idLaboratorio.toString().trim();
        });
        const totalEquiposLab = equiposDelLab.length;
        if (totalEquiposLab === 0)
            return { laboratorio: idLaboratorio.trim() === "" ? "--" : idLaboratorio.trim(), porcentaje: 0 };
        const equiposActivos = equiposDelLab.filter(equipo => equipo.estado === 'Activo').length;
        let porcentajeActivos = Math.round((equiposActivos / totalEquiposLab) * 100);
        let nombreLab = idLaboratorio.trim() === "" ? "--" : idLaboratorio.trim();
        return { laboratorio: nombreLab, porcentaje: porcentajeActivos };
    }
    calcularPorcentajeEstadoPorLaboratorio(idlaboratorio, estadoSeleccionado, listaAProcesar) {
        const equiposAAnalizar = listaAProcesar ? listaAProcesar : this._equipos;
        const equiposDelLab = equiposAAnalizar.filter(equipo => {
            const lab = equipo.ubicacion ? equipo.ubicacion.toString().trim() : "";
            return lab === idlaboratorio.toString().trim();
        });
        const totalEquiposLab = equiposDelLab.length;
        if (totalEquiposLab === 0)
            return { estado: estadoSeleccionado.trim() === "" ? "--" : estadoSeleccionado.trim(), porcentaje: 0 };
        const equiposConEstado = equiposDelLab.filter(equipo => equipo.estado === estadoSeleccionado).length;
        const porcentaje = Math.round((equiposConEstado / totalEquiposLab) * 100);
        return { estado: estadoSeleccionado, porcentaje };
    }
}
//# sourceMappingURL=Cl_mLaboratorio.js.map