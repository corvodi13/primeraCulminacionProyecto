import Cl_mEquipos from './models/Cl_mEquipos.js';
import Cl_sEquipo from './services/Cl_sEquipo.js';
import Cl_cLaboratorio from './controllers/Cl_cLaboratorio.js';
const servicio = new Cl_sEquipo();
const equiposIniciales = [
    new Cl_mEquipos("Dell", "i5", 8, "1", "1", "1", "Activo", ""),
    new Cl_mEquipos("HP", "i7", 16, "1", "1", "2", "Activo", ""),
    new Cl_mEquipos("Lenovo", "i3", 4, "2", "3", "4", "Mantenimiento", "En revisión por servicio técnico"),
    new Cl_mEquipos("Asus", "i5", 8, "3", "5", "2", "Reportado", "Falla reportada por el estudiante"),
    new Cl_mEquipos("Dell", "i3", 1, "4", "10", "1", "Activo", ""),
    new Cl_mEquipos("HP", "i3", 2, "5", "8", "3", "Activo", ""),
    new Cl_mEquipos("Lenovo", "i7", 16, "6", "2", "1", "Mantenimiento", "En revisión por servicio técnico"),
    new Cl_mEquipos("Acer", "i5", 4, "1", "4", "4", "Activo", ""),
    new Cl_mEquipos("Dell", "i5", 8, "2", "7", "2", "Activo", ""),
    new Cl_mEquipos("HP", "i7", 8, "3", "6", "3", "Reportado", "Falla reportada por el estudiante"),
    new Cl_mEquipos("Asus", "i7", 16, "4", "9", "1", "Activo", ""),
    new Cl_mEquipos("Lenovo", "i3", 2, "5", "1", "2", "Mantenimiento", "En revisión por servicio técnico"),
    new Cl_mEquipos("Acer", "i5", 4, "6", "3", "4", "Activo", ""),
    new Cl_mEquipos("Dell", "i5", 8, "1", "2", "3", "Activo", ""),
    new Cl_mEquipos("HP", "i3", 1, "2", "10", "4", "Reportado", "Falla reportada por el estudiante"),
    new Cl_mEquipos("Lenovo", "i7", 16, "3", "5", "2", "Activo", ""),
    new Cl_mEquipos("Asus", "i3", 4, "4", "4", "1", "Activo", ""),
    new Cl_mEquipos("Acer", "i5", 8, "5", "7", "3", "Mantenimiento", "En revisión por servicio técnico"),
    new Cl_mEquipos("Dell", "i7", 16, "6", "8", "2", "Activo", ""),
    new Cl_mEquipos("HP", "i5", 2, "1", "9", "1", "Reportado", "Falla reportada por el estudiante"),
    new Cl_mEquipos("Lenovo", "i5", 8, "2", "6", "4", "Activo", ""),
    new Cl_mEquipos("Asus", "i3", 4, "3", "1", "3", "Activo", ""),
    new Cl_mEquipos("Acer", "i3", 1, "4", "2", "2", "Mantenimiento", "En revisión por servicio técnico"),
    new Cl_mEquipos("Dell", "i7", 8, "5", "10", "4", "Activo", "")
];
async function arrancarAplicacion() {
    try {
        console.log("⏳ Descargando inventario de MockAPI...");
        let equiposDesdeNube = await servicio.getEquipos();
        if (equiposDesdeNube.length === 0) {
            console.log("⚠️ La API está vacía. Subiendo los 6 equipos con formato numérico...");
            for (const equipo of equiposIniciales) {
                await servicio.agregarEquipo(equipo);
            }
            console.log("✅ ¡Precarga exitosa!");
            equiposDesdeNube = await servicio.getEquipos();
        }
        console.log(`ℹ️ Inicializando controladores con ${equiposDesdeNube.length} equipos.`);
        const app = new Cl_cLaboratorio(equiposDesdeNube, servicio);
    }
    catch (error) {
        console.error("❌ Error crítico en el arranque:", error);
    }
}
document.addEventListener("DOMContentLoaded", arrancarAplicacion);
//# sourceMappingURL=principal.js.map