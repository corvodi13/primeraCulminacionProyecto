import { iEquipo } from "../interfaces/Cl_iEquipo.js";

export default class Cl_vUsuarios {
    private inIdEquipo: HTMLInputElement;
    private btReportarFalla: HTMLButtonElement;
    private tablaCuerpoUser: HTMLElement;
    private filtroUbicacion: HTMLSelectElement;
    private filtroProcesador: HTMLSelectElement;
    private filtroMemoria: HTMLSelectElement;
    private filtroMarca: HTMLSelectElement;
    
    constructor() {
      
        this.inIdEquipo = <HTMLInputElement>document.getElementById("idEquipoUsuario");
        this.btReportarFalla = <HTMLButtonElement>document.getElementById("btReportarFalla");
        this.tablaCuerpoUser = <HTMLElement>document.getElementById("tablaCuerpoUser");
        this.filtroUbicacion = <HTMLSelectElement>document.getElementById("filtroUbicacionUser");
        this.filtroProcesador = <HTMLSelectElement>document.getElementById("filtroProcesadorUser");
        this.filtroMemoria = <HTMLSelectElement>document.getElementById("filtroMemoriaUser");
        this.filtroMarca = <HTMLSelectElement>document.getElementById("filtroMarcaUser");
    }
    get idEquipo(): string { 
        return this.inIdEquipo.value; 
    }
    
    get tablaEquipo(): HTMLElement { 
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

    public onCambioFiltro(callback: () => void): void {
        this.filtroUbicacion.onchange = () => callback();
        this.filtroProcesador.onchange = () => callback();
        this.filtroMemoria.onchange = () => callback();
         this.filtroMarca.onchange = () => callback();

    }

    public onReportarFalla(callback: () => void): void {
        this.btReportarFalla.onclick = () => callback();
    }

    public extraerDatos(equipoDatos: any, accionReportar: (id: string) => void): DocumentFragment {
        const plantilla = <HTMLTemplateElement>document.getElementById("plantillaEquipos");
        const clon = document.importNode(plantilla.content, true);
        (clon.querySelector(".marca-equipo") as HTMLElement).textContent = equipoDatos.marca || "---";
        (clon.querySelector(".procesador-equipo") as HTMLElement).textContent = equipoDatos.procesador || "---";
        (clon.querySelector(".memoria-equipo") as HTMLElement).textContent = (equipoDatos.memoria || "0").toString() + " GB";
        (clon.querySelector(".ubicacion-equipo") as HTMLElement).textContent = equipoDatos.ubicacion || "---";
        (clon.querySelector(".meson-equipo") as HTMLElement).textContent = equipoDatos.meson || "---";
        (clon.querySelector(".puesto-equipo") as HTMLElement).textContent = equipoDatos.puesto || "---";

        const badge = clon.querySelector(".estado-equipo") as HTMLElement;
        const estadoRaw = equipoDatos.estado ? equipoDatos.estado.toLowerCase() : 'activo';
        
        if (estadoRaw === 'activo') {
            badge.textContent = "Disponible";
            badge.className = "estado-equipo badge badge-activo small rounded-pill";
        } else if (estadoRaw === 'mantenimiento') {
            badge.textContent = "En Mantenimiento";
            badge.className = "estado-equipo badge badge-mantenimiento small rounded-pill";
        } else {
            badge.textContent = "Fallando";
            badge.className = "estado-equipo badge badge-fallando small rounded-pill";
        }
        const btnReportar = clon.querySelector(".btn-abrir-reporte") as HTMLButtonElement;
        
        if (btnReportar) {
            if (estadoRaw !== 'activo') {
                btnReportar.disabled = true;
                btnReportar.textContent = "Fuera de Servicio";
            } else {
                btnReportar.onclick = () => {
                    const modal = document.getElementById("modal-reporte") as HTMLElement;
                    const inIdModal = document.getElementById("idEquipoUsuario") as HTMLInputElement;
                    
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

        return clon;}
    
    }