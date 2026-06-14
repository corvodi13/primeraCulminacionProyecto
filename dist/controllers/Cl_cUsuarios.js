import Cl_mLaboratorio from "../models/Cl_mLaboratorio.js";
import Cl_vUsuarios from "../views/Cl_vUsuarios.js";
export default class Cl_cUsuarios {
    modelo;
    vista;
    servicio;
    constructor(equiposIniciales, servicio) {
        this.modelo = new Cl_mLaboratorio();
        this.vista = new Cl_vUsuarios();
        this.servicio = servicio;
        this.modelo.equipos = equiposIniciales;
        this.vista.onCambioFiltro(() => {
            this.mostrarEquiposEnPantalla();
        });
        this.vista.onReportarFalla(async () => {
            const id = this.vista.idEquipo;
            if (!id) {
                alert("Por favor, ingrese el ID del equipo.");
                return;
            }
            const equipo = this.modelo.equipos.find(eq => eq.id === id);
            if (equipo) {
                equipo.estado = 'Reportado';
                const txtObservacion = document.getElementById("inp-descripcion-reporte").value;
                equipo.observacion = txtObservacion.trim() !== ""
                    ? txtObservacion
                    : "Falla reportada por el usuario desde el panel público.";
                console.log(`⚠️ Registrando reporte en MockAPI para el equipo ID: ${id}...`);
                const exito = await this.servicio.actualizarEstadoEquipo(equipo);
                if (exito) {
                    const modal = document.getElementById("modal-reporte");
                    if (modal)
                        modal.classList.add("d-none");
                    document.getElementById("inp-descripcion-reporte").value = "";
                    await this.refrescarDatosDesdeNube();
                }
                else {
                    alert("Error de conexión al guardar en MockAPI.");
                }
            }
            else {
                alert(`El equipo con ID ${id} no existe en el sistema.`);
            }
        });
        setTimeout(() => {
            this.mostrarEquiposEnPantalla();
        }, 50);
    }
    mostrarEquiposEnPantalla() {
        const contenedorHTML = this.vista.tablaEquipo;
        if (!contenedorHTML)
            return;
        contenedorHTML.innerHTML = "";
        const filtros = this.vista.valoresFiltros;
        const equiposDisponibles = this.modelo.equiposParaEstudiantes();
        console.log("🔍 Filtros detectados en el DOM al renderizar:", filtros);
        let listaFiltrada = equiposDisponibles.filter(equipo => {
            const cumpleLab = !filtros.ubicacion || filtros.ubicacion === "todos" || equipo.ubicacion === filtros.ubicacion;
            const cumpleProc = !filtros.procesador || filtros.procesador === "todos" || equipo.procesador === filtros.procesador;
            const cumpleMem = !filtros.memoria || filtros.memoria === "todos" || equipo.memoria.toString() === filtros.memoria;
            const cumpleMar = !filtros.marca || filtros.marca === "todos" || equipo.marca === filtros.marca;
            return cumpleLab && cumpleProc && cumpleMem && cumpleMar;
        });
        console.log(`📊 Cantidad de equipos que superaron los filtros: ${listaFiltrada.length}`);
        try {
            listaFiltrada.forEach(equipo => {
                // Intentamos extraer datos de forma segura. Si da error .toJSON(), pasamos el objeto directo
                const datosAProcesar = typeof equipo.toJSON === 'function' ? equipo.toJSON() : equipo;
                const tarjetaVisual = this.vista.extraerDatos(datosAProcesar, (idSeleccionado) => {
                    console.log(`Abriendo modal de reportes para el equipo: ${idSeleccionado}`);
                });
                contenedorHTML.appendChild(tarjetaVisual);
            });
        }
        catch (e) {
            console.warn("⚠️ Hubo un detalle al renderizar una tarjeta individual, pero continuamos con las estadísticas:", e);
        }
    }
    async refrescarDatosDesdeNube() {
        console.log("🔄 Sincronizando catálogo con los cambios de MockAPI...");
        try {
            const equiposActualizados = await this.servicio.getEquipos();
            this.modelo.equipos = equiposActualizados;
            this.mostrarEquiposEnPantalla();
        }
        catch (error) {
            console.error("❌ Error de sincronización asíncrona:", error);
        }
    }
}
//# sourceMappingURL=Cl_cUsuarios.js.map