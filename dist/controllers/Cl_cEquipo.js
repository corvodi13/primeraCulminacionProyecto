import Cl_mEquipos from "../models/Cl_mEquipos.js";
export default class Cl_cEquipo {
    modeloLaboratorio;
    vistaEquipo;
    servicio;
    constructor(modelo, vista, servicio) {
        this.modeloLaboratorio = modelo;
        this.vistaEquipo = vista;
        this.servicio = servicio;
        this.vistaEquipo.onMantenimiento(() => {
            this.procesarAccion('Mantenimiento');
        });
        this.vistaEquipo.onResolver(() => {
            this.procesarAccion('Activo');
        });
        this.vistaEquipo.onAgregarEquipo(async (datosNuevos) => {
            try {
                console.log("🚀 Subiendo nuevo equipo a MockAPI...", datosNuevos);
                const nuevoObjetoEquipo = new Cl_mEquipos(datosNuevos.marca, datosNuevos.procesador, datosNuevos.memoria, datosNuevos.ubicacion, datosNuevos.meson, datosNuevos.puesto, datosNuevos.estado, datosNuevos.observacion);
                await this.servicio.agregarEquipo(nuevoObjetoEquipo);
                this.vistaEquipo.tablaEquipo.dispatchEvent(new CustomEvent('actualizar'));
            }
            catch (error) {
                console.error(error);
                alert("No se pudo guardar el equipo en el servidor remoto.");
            }
        });
    }
    async procesarAccion(nuevoEstado) {
        const id = this.vistaEquipo.idEquipo;
        if (!id) {
            alert("Por favor, ingrese el ID del equipo.");
            return;
        }
        const equipo = this.modeloLaboratorio.equipos.find(eq => eq.id === id);
        if (equipo) {
            equipo.estado = nuevoEstado;
            console.log(`⏳ Sincronizando con MockAPI: Equipo ${id} cambiado a [${nuevoEstado}]...`);
            const exito = await this.servicio.actualizarEstadoEquipo(equipo);
            if (exito) {
                console.log("✅ Estado actualizado en MockAPI con éxito.");
                this.vistaEquipo.tablaEquipo.dispatchEvent(new CustomEvent('actualizar'));
            }
            else {
                alert("Error de conexión al guardar los cambios en MockAPI.");
            }
        }
        else {
            alert(`El equipo con ID ${id} no existe en el sistema.`);
        }
    }
}
//# sourceMappingURL=Cl_cEquipo.js.map