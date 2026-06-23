import { iEquipo } from "../interfaces/Cl_iEquipo.js";

export default class Cl_vEquipoVista {
    private inIdEquipo: HTMLInputElement;
    private btMantenimiento: HTMLButtonElement;
    private btResolver: HTMLButtonElement;
    private consolaData: HTMLElement;
    private tablaCuerpoEquipo: HTMLElement;
    private btToggleFormulario: HTMLButtonElement;
    private panelFormularioAgregar: HTMLElement;
    private formularioEquipo: HTMLFormElement;
    private btCancelarRegistro: HTMLButtonElement;
    private filtroUbicacion: HTMLSelectElement;
    private filtroProcesador: HTMLSelectElement;
    private filtroMemoria: HTMLSelectElement;
    private filtroEstado: HTMLSelectElement;
    private lblPorcentajeMantenimiento: HTMLElement;
    //acá lo nuevo
    private lblLabMenos: HTMLElement;
    private lblCantMenos: HTMLElement;
    // nuevo 16/06
    private lblPorcActivos: HTMLElement;
    private lblNombPorc: HTMLElement;
    private lblPorcEstado: HTMLElement;
    private lblNombEstado: HTMLElement;
    //nuevo 23/06
    private inFechaRegistro: HTMLInputElement;

    constructor() {
        this.inIdEquipo = <HTMLInputElement>document.getElementById("inIdEquipo");
        this.btMantenimiento = <HTMLButtonElement>document.getElementById("btMantenimiento");
        this.btResolver = <HTMLButtonElement>document.getElementById("btResolver");
        this.consolaData = <HTMLElement>document.getElementById("consolaData");
        this.tablaCuerpoEquipo = <HTMLElement>document.getElementById("tablaCuerpoEquipos");
        this.btToggleFormulario = <HTMLButtonElement>document.getElementById("btToggleFormulario");
        this.panelFormularioAgregar = <HTMLElement>document.getElementById("panelFormularioAgregar");
        this.formularioEquipo = <HTMLFormElement>document.getElementById("formularioEquipo");
        this.btCancelarRegistro = <HTMLButtonElement>document.getElementById("btCancelarRegistro");
        this.filtroUbicacion = <HTMLSelectElement>document.getElementById("filtroUbicacion");
        this.filtroProcesador = <HTMLSelectElement>document.getElementById("filtroProcesador");
        this.filtroMemoria = <HTMLSelectElement>document.getElementById("filtroMemoria");
        this.filtroEstado = <HTMLSelectElement>document.getElementById("filtroEstado");
        this.lblPorcentajeMantenimiento = <HTMLElement>document.getElementById("lblPorcentajeMantenimiento");
        //lo nuevo
        this.lblLabMenos = <HTMLElement>document.getElementById("lbl-lab-menos");
        this.lblCantMenos = <HTMLElement>document.getElementById("lbl-cant-menos");
        //nuevo 16/06
        this.lblPorcActivos = <HTMLElement>document.getElementById("lblPorcActivos");
        this.lblNombPorc = <HTMLElement>document.getElementById("lblNombPorc");
        this.lblPorcEstado = <HTMLElement>document.getElementById("lblPorcEstado");
        this.lblNombEstado = <HTMLElement>document.getElementById("lblNombEstado");
        //lo nuevo 23/06
        this.inFechaRegistro = <HTMLInputElement>document.getElementById("inFechaRegistro");

        this.btToggleFormulario.onclick = () => this.conmutarFormulario();
        this.btCancelarRegistro.onclick = () => this.conmutarFormulario();
    }

    private conmutarFormulario(): void {
        const estaOculto = this.panelFormularioAgregar.style.display === "none" || this.panelFormularioAgregar.style.display === "";
        this.panelFormularioAgregar.style.display = estaOculto ? "block" : "none";
    }

    get idEquipo(): string { return this.inIdEquipo.value; }
    get consolaDatas(): HTMLElement { return this.consolaData; }
    get tablaEquipo(): HTMLElement { return this.tablaCuerpoEquipo; }

    get valoresFiltros() {
    return {
        ubicacion: this.filtroUbicacion.value,
        procesador: this.filtroProcesador.value,
        memoria: this.filtroMemoria.value,
        estado: this.filtroEstado.value
    };
}
    onCambioFiltro(callback: () => void): void {
        this.filtroUbicacion.onchange = () => callback();
        this.filtroProcesador.onchange = () => callback();
        this.filtroMemoria.onchange = () => callback();
        this.filtroEstado.onchange = () => callback();
}

get fechaRegistro(): Date {
    const valor = this.inFechaRegistro.value; // string "2024-06-23"
    return valor ? new Date(valor) : new Date(); // si no hay valor, fecha actual
}

    get datosNuevoEquipo(): any {
        return {
            marca: (<HTMLInputElement>document.getElementById("addMarca")).value,
            procesador: (<HTMLInputElement>document.getElementById("addProcesador")).value,
            memoria: Number((<HTMLInputElement>document.getElementById("addMemoria")).value),
            ubicacion: (<HTMLInputElement>document.getElementById("addUbicacion")).value,
            meson: (<HTMLInputElement>document.getElementById("addMeson")).value,
            puesto: (<HTMLInputElement>document.getElementById("addPuesto")).value,
            observacion: (<HTMLInputElement>document.getElementById("addObservacion")).value,
            estado: "activo",
            fechaRegistro: this.fechaRegistro 
        };
    }
    onAgregarEquipo(callback: (datos: any) => void): void {
        this.formularioEquipo.onsubmit = (e) => {
            e.preventDefault(); 
            
            callback(this.datosNuevoEquipo); 
            
            this.conmutarFormulario();
            setTimeout(() => this.formularioEquipo.reset(), 100); 
        };
    }

    public extraerDatos(equipoDatos: iEquipo): DocumentFragment {
        const plantilla = <HTMLTemplateElement>document.getElementById("plantillaEquipos");
        const clon = document.importNode(plantilla.content, true);
        
        (clon.querySelector(".id-equipo") as HTMLElement).textContent = equipoDatos.id || "---";
        (clon.querySelector(".marca-equipo") as HTMLElement).textContent = equipoDatos.marca;
        (clon.querySelector(".procesador-equipo") as HTMLElement).textContent = equipoDatos.procesador;
        (clon.querySelector(".ubicacion-equipo") as HTMLElement).textContent = equipoDatos.ubicacion;
        (clon.querySelector(".memoria-equipo") as HTMLElement).textContent = equipoDatos.memoria.toString() + " GB";
        (clon.querySelector(".meson-equipo") as HTMLElement).textContent = equipoDatos.meson || "---";
        (clon.querySelector(".puesto-equipo") as HTMLElement).textContent = equipoDatos.puesto || "---";
        (clon.querySelector(".observacion-equipo") as HTMLElement).textContent = (equipoDatos as any).observacion || "";
        
        const badge = clon.querySelector(".estado-equipo") as HTMLElement;
        badge.textContent = equipoDatos.estado;

        if (equipoDatos.estado === 'Reportado') badge.className = "badge bg-danger px-2 py-1 rounded-pill";
        else if (equipoDatos.estado === 'Mantenimiento') badge.className = "badge bg-warning px-2 py-1 rounded-pill";
        else badge.className = "badge bg-success px-2 py-1 rounded-pill";
        
        return clon;
    }

    onMantenimiento(callback: () => void): void { this.btMantenimiento.onclick = () => callback(); }
    onResolver(callback: () => void): void { this.btResolver.onclick = () => callback(); }

    public actualizarEstadisticas(total: number, inactivos: number, porcentaje: number): void {
    this.lblPorcentajeMantenimiento.innerHTML = `
        Total Equipos: <strong>${total}</strong> | 
        Inoperativos (Reportados/Mantenimiento): <strong>${inactivos}</strong> | 
        Porcentaje de Falla: <strong style="font-size: 1.1em; color: #dc3545;">${porcentaje}%</strong>
    `;
    }
    //lo nuevo
    public actualizarPanelMenosMaquinas(laboratorio: string, cantidad: number): void {
        if (this.lblLabMenos && this.lblCantMenos) {
            this.lblLabMenos.textContent = laboratorio;
            this.lblCantMenos.textContent = `${cantidad} máquinas`;
        }
    }
    ////////////// 16/06
    public actualizarPanelPorcentajeActivos(laboratorio: string, porcentaje: number): void {
        if (this.lblNombPorc && this.lblPorcActivos) {
            this.lblNombPorc.textContent = laboratorio === "todos" ? "General" : `Laboratorio ${laboratorio}`;
            this.lblPorcActivos.textContent = `${porcentaje}% activos`;
        }
    }
    public actualizarPanelPorcentajeEstado(estado: string, porcentaje: number): void {
        if (this.lblNombEstado && this.lblPorcEstado) {
            this.lblNombEstado.textContent = estado === "todos" ? "General" : `Estado: ${estado}`;
            this.lblPorcEstado.textContent = `${porcentaje}%`;
        }
    }

}