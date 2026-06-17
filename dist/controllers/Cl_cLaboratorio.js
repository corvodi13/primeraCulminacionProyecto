import Cl_mLaboratorio from "../models/Cl_mLaboratorio.js";
import Cl_vEquipo from "../views/Cl_vEquipo.js";
import Cl_cEquipo from "./Cl_cEquipo.js";
export default class Cl_cLaboratorio {
    modelo;
    vista;
    servicio;
    controladorEquipo;
    constructor(equiposIniciales, servicio) {
        this.modelo = new Cl_mLaboratorio();
        this.vista = new Cl_vEquipo();
        this.servicio = servicio;
        this.vista.onCambioFiltro(() => {
            this.mostrarEquiposEnPantalla();
        });
        this.modelo.equipos = equiposIniciales;
        this.controladorEquipo = new Cl_cEquipo(this.modelo, this.vista, this.servicio);
        this.vista.tablaEquipo.addEventListener('actualizar', async () => {
            await this.refrescarDatosDesdeNube();
        });
        this.mostrarEquiposEnPantalla();
    }
    mostrarEquiposEnPantalla() {
        const contenedorHTML = this.vista.tablaEquipo;
        contenedorHTML.innerHTML = "";
        const filtros = this.vista.valoresFiltros;
        let listaFiltrada = this.modelo.equipos.filter(equipo => {
            const cumpleLab = filtros.ubicacion === "todos" || equipo.ubicacion === filtros.ubicacion;
            const cumpleProc = filtros.procesador === "todos" || equipo.procesador === filtros.procesador;
            const cumpleMem = filtros.memoria === "todos" || equipo.memoria.toString() === filtros.memoria;
            const cumpleEst = filtros.estado === "todos" || equipo.estado === filtros.estado;
            return cumpleLab && cumpleProc && cumpleMem && cumpleEst;
        });
        const total = listaFiltrada.length;
        const inactivos = this.modelo.contarEquiposInactivos(listaFiltrada);
        const porcentaje = this.modelo.calcularPorcentajeDañados(listaFiltrada);
        this.vista.actualizarEstadisticas(total, inactivos, porcentaje);
        // lab con menos máquinas
        const estadisticaLab = this.modelo.obtenerLaboratorioConMenosEquipos(this.modelo.equipos);
        this.vista.actualizarPanelMenosMaquinas(estadisticaLab.laboratorio, estadisticaLab.cantidad);
        // señor dame paciencia
        //////////////// 16/06
        const porcentajeActivos = this.modelo.obtenerPorcentajeActivosPorLaboratorio(filtros.ubicacion, this.modelo.equipos);
        this.vista.actualizarPanelPorcentajeActivos(porcentajeActivos.laboratorio, porcentajeActivos.porcentaje);
        const porcentajeEstado = this.modelo.calcularPorcentajeEstadoPorLaboratorio(filtros.ubicacion, filtros.estado, this.modelo.equipos);
        this.vista.actualizarPanelPorcentajeEstado(porcentajeEstado.estado, porcentajeEstado.porcentaje);
        listaFiltrada.forEach(equipo => {
            const datosLimpios = equipo.toJSON();
            const filaVisual = this.vista.extraerDatos(datosLimpios);
            contenedorHTML.appendChild(filaVisual);
        });
    }
    async refrescarDatosDesdeNube() {
        console.log("🔄 Sincronizando cambios con MockAPI...");
        const equiposActualizados = await this.servicio.getEquipos();
        this.modelo.equipos = equiposActualizados;
        this.mostrarEquiposEnPantalla();
    }
}
//# sourceMappingURL=Cl_cLaboratorio.js.map