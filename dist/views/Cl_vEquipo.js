export default class Cl_vEquipoVista {
    inIdEquipo;
    btMantenimiento;
    btResolver;
    consolaData;
    tablaCuerpoEquipo;
    btToggleFormulario;
    panelFormularioAgregar;
    formularioEquipo;
    btCancelarRegistro;
    filtroUbicacion;
    filtroProcesador;
    filtroMemoria;
    filtroEstado;
    lblPorcentajeMantenimiento;
    //acá lo nuevo
    lblLabMenos;
    lblCantMenos;
    // nuevo 16/06
    lblPorcActivos;
    lblNombPorc;
    lblPorcEstado;
    lblNombEstado;
    constructor() {
        this.inIdEquipo = document.getElementById("inIdEquipo");
        this.btMantenimiento = document.getElementById("btMantenimiento");
        this.btResolver = document.getElementById("btResolver");
        this.consolaData = document.getElementById("consolaData");
        this.tablaCuerpoEquipo = document.getElementById("tablaCuerpoEquipos");
        this.btToggleFormulario = document.getElementById("btToggleFormulario");
        this.panelFormularioAgregar = document.getElementById("panelFormularioAgregar");
        this.formularioEquipo = document.getElementById("formularioEquipo");
        this.btCancelarRegistro = document.getElementById("btCancelarRegistro");
        this.filtroUbicacion = document.getElementById("filtroUbicacion");
        this.filtroProcesador = document.getElementById("filtroProcesador");
        this.filtroMemoria = document.getElementById("filtroMemoria");
        this.filtroEstado = document.getElementById("filtroEstado");
        this.lblPorcentajeMantenimiento = document.getElementById("lblPorcentajeMantenimiento");
        //lo nuevo
        this.lblLabMenos = document.getElementById("lbl-lab-menos");
        this.lblCantMenos = document.getElementById("lbl-cant-menos");
        //nuevo 16/06
        this.lblPorcActivos = document.getElementById("lblPorcActivos");
        this.lblNombPorc = document.getElementById("lblNombPorc");
        this.lblPorcEstado = document.getElementById("lblPorcEstado");
        this.lblNombEstado = document.getElementById("lblNombEstado");
        this.btToggleFormulario.onclick = () => this.conmutarFormulario();
        this.btCancelarRegistro.onclick = () => this.conmutarFormulario();
    }
    conmutarFormulario() {
        const estaOculto = this.panelFormularioAgregar.style.display === "none" || this.panelFormularioAgregar.style.display === "";
        this.panelFormularioAgregar.style.display = estaOculto ? "block" : "none";
    }
    get idEquipo() { return this.inIdEquipo.value; }
    get consolaDatas() { return this.consolaData; }
    get tablaEquipo() { return this.tablaCuerpoEquipo; }
    get valoresFiltros() {
        return {
            ubicacion: this.filtroUbicacion.value,
            procesador: this.filtroProcesador.value,
            memoria: this.filtroMemoria.value,
            estado: this.filtroEstado.value
        };
    }
    onCambioFiltro(callback) {
        this.filtroUbicacion.onchange = () => callback();
        this.filtroProcesador.onchange = () => callback();
        this.filtroMemoria.onchange = () => callback();
        this.filtroEstado.onchange = () => callback();
    }
    get datosNuevoEquipo() {
        return {
            marca: document.getElementById("addMarca").value,
            procesador: document.getElementById("addProcesador").value,
            memoria: Number(document.getElementById("addMemoria").value),
            ubicacion: document.getElementById("addUbicacion").value,
            meson: document.getElementById("addMeson").value,
            puesto: document.getElementById("addPuesto").value,
            observacion: document.getElementById("addObservacion").value,
            estado: "activo"
        };
    }
    onAgregarEquipo(callback) {
        this.formularioEquipo.onsubmit = (e) => {
            e.preventDefault();
            callback(this.datosNuevoEquipo);
            this.conmutarFormulario();
            setTimeout(() => this.formularioEquipo.reset(), 100);
        };
    }
    extraerDatos(equipoDatos) {
        const plantilla = document.getElementById("plantillaEquipos");
        const clon = document.importNode(plantilla.content, true);
        clon.querySelector(".id-equipo").textContent = equipoDatos.id || "---";
        clon.querySelector(".marca-equipo").textContent = equipoDatos.marca;
        clon.querySelector(".procesador-equipo").textContent = equipoDatos.procesador;
        clon.querySelector(".ubicacion-equipo").textContent = equipoDatos.ubicacion;
        clon.querySelector(".memoria-equipo").textContent = equipoDatos.memoria.toString() + " GB";
        clon.querySelector(".meson-equipo").textContent = equipoDatos.meson || "---";
        clon.querySelector(".puesto-equipo").textContent = equipoDatos.puesto || "---";
        clon.querySelector(".observacion-equipo").textContent = equipoDatos.observacion || "";
        const badge = clon.querySelector(".estado-equipo");
        badge.textContent = equipoDatos.estado;
        if (equipoDatos.estado === 'Reportado')
            badge.className = "badge bg-danger px-2 py-1 rounded-pill";
        else if (equipoDatos.estado === 'Mantenimiento')
            badge.className = "badge bg-warning px-2 py-1 rounded-pill";
        else
            badge.className = "badge bg-success px-2 py-1 rounded-pill";
        return clon;
    }
    onMantenimiento(callback) { this.btMantenimiento.onclick = () => callback(); }
    onResolver(callback) { this.btResolver.onclick = () => callback(); }
    actualizarEstadisticas(total, inactivos, porcentaje) {
        this.lblPorcentajeMantenimiento.innerHTML = `
        Total Equipos: <strong>${total}</strong> | 
        Inoperativos (Reportados/Mantenimiento): <strong>${inactivos}</strong> | 
        Porcentaje de Falla: <strong style="font-size: 1.1em; color: #dc3545;">${porcentaje}%</strong>
    `;
    }
    //lo nuevo
    actualizarPanelMenosMaquinas(laboratorio, cantidad) {
        if (this.lblLabMenos && this.lblCantMenos) {
            this.lblLabMenos.textContent = laboratorio;
            this.lblCantMenos.textContent = `${cantidad} máquinas`;
        }
    }
    ////////////// 16/06
    actualizarPanelPorcentajeActivos(laboratorio, porcentaje) {
        if (this.lblNombPorc && this.lblPorcActivos) {
            this.lblNombPorc.textContent = laboratorio === "todos" ? "General" : `Laboratorio ${laboratorio}`;
            this.lblPorcActivos.textContent = `${porcentaje}% activos`;
        }
    }
    actualizarPanelPorcentajeEstado(estado, porcentaje) {
        if (this.lblNombEstado && this.lblPorcEstado) {
            this.lblNombEstado.textContent = estado === "todos" ? "General" : `Estado: ${estado}`;
            this.lblPorcEstado.textContent = `${porcentaje}%`;
        }
    }
}
//# sourceMappingURL=Cl_vEquipo.js.map