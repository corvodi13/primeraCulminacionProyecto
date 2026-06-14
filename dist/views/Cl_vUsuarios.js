export default class Cl_vUsuarios {
    inIdEquipo;
    btReportarFalla;
    tablaCuerpoUser;
    filtroUbicacion;
    filtroProcesador;
    filtroMemoria;
    filtroMarca;
    constructor() {
        this.inIdEquipo = document.getElementById("idEquipoUsuario");
        this.btReportarFalla = document.getElementById("btReportarFalla");
        this.tablaCuerpoUser = document.getElementById("tablaCuerpoUser");
        this.filtroUbicacion = document.getElementById("filtroUbicacionUser");
        this.filtroProcesador = document.getElementById("filtroProcesadorUser");
        this.filtroMemoria = document.getElementById("filtroMemoriaUser");
        this.filtroMarca = document.getElementById("filtroMarcaUser");
    }
    get idEquipo() {
        return this.inIdEquipo.value;
    }
    get tablaEquipo() {
        return this.tablaCuerpoUser;
    }
    get valoresFiltros() {
        return {
            ubicacion: this.filtroUbicacion.value,
            procesador: this.filtroProcesador.value,
            memoria: this.filtroMemoria.value,
            marca: this.filtroMarca.value,
        };
    }
    onCambioFiltro(callback) {
        this.filtroUbicacion.onchange = () => callback();
        this.filtroProcesador.onchange = () => callback();
        this.filtroMemoria.onchange = () => callback();
        this.filtroMarca.onchange = () => callback();
    }
    onReportarFalla(callback) {
        this.btReportarFalla.onclick = () => callback();
    }
    extraerDatos(equipoDatos, accionReportar) {
        const plantilla = document.getElementById("plantillaEquipos");
        const clon = document.importNode(plantilla.content, true);
        clon.querySelector(".marca-equipo").textContent = equipoDatos.marca || "---";
        clon.querySelector(".procesador-equipo").textContent = equipoDatos.procesador || "---";
        clon.querySelector(".memoria-equipo").textContent = (equipoDatos.memoria || "0").toString() + " GB";
        clon.querySelector(".ubicacion-equipo").textContent = equipoDatos.ubicacion || "---";
        clon.querySelector(".meson-equipo").textContent = equipoDatos.meson || "---";
        clon.querySelector(".puesto-equipo").textContent = equipoDatos.puesto || "---";
        const badge = clon.querySelector(".estado-equipo");
        const estadoRaw = equipoDatos.estado ? equipoDatos.estado.toLowerCase() : 'activo';
        if (estadoRaw === 'activo') {
            badge.textContent = "Disponible";
            badge.className = "estado-equipo badge badge-activo small rounded-pill";
        }
        else if (estadoRaw === 'mantenimiento') {
            badge.textContent = "En Mantenimiento";
            badge.className = "estado-equipo badge badge-mantenimiento small rounded-pill";
        }
        else {
            badge.textContent = "Fallando";
            badge.className = "estado-equipo badge badge-fallando small rounded-pill";
        }
        const btnReportar = clon.querySelector(".btn-abrir-reporte");
        if (btnReportar) {
            if (estadoRaw !== 'activo') {
                btnReportar.disabled = true;
                btnReportar.textContent = "Fuera de Servicio";
            }
            else {
                btnReportar.onclick = () => {
                    const modal = document.getElementById("modal-reporte");
                    const inIdModal = document.getElementById("idEquipoUsuario");
                    if (inIdModal) {
                        inIdModal.value = equipoDatos.id || "";
                    }
                    if (modal) {
                        modal.classList.remove("d-none");
                    }
                    accionReportar(equipoDatos.id || "");
                };
            }
        }
        return clon;
    }
}
//# sourceMappingURL=Cl_vUsuarios.js.map