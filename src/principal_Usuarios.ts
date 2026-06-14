import Cl_sEquipo from './services/Cl_sEquipo.js';
import Cl_cUsuarios from './controllers/Cl_cUsuarios.js';

const servicio = new Cl_sEquipo();

async function arrancarAppUsuarios() {
    try {
        console.log("⏳ Descargando datos desde MockAPI...");
        

        const equiposDesdeNube = await servicio.getEquipos();
        
        console.log("✅ Datos recibidos con éxito. Cantidad de equipos:", equiposDesdeNube.length);
        
        new Cl_cUsuarios(equiposDesdeNube, servicio);
        
        console.log("🚀 ¡Panel de usuarios completamente operativo!");
    } catch (error) {
        console.error("❌ Error fatal al arrancar el panel de usuarios:", error);
        
        alert("No se pudo conectar con MockAPI. Revisa tu conexión a internet o el estado del servidor.");
    }
}
arrancarAppUsuarios();