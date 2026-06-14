import Cl_mEquipos from "../models/Cl_mEquipos.js";
export default class Cl_sEquipo {
    _urlbase = "https://6a1c78b88858a003817bea5d.mockapi.io/Labs/equipos";
    constructor() { }
    async getEquipos() {
        try {
            const response = await fetch(this._urlbase);
            if (!response.ok) {
                throw new Error(`Error obteniendo equipos de la api: ${response.statusText}`);
            }
            const datosJSON = await response.json();
            return datosJSON.map((equipo) => new Cl_mEquipos(equipo.marca, equipo.procesador, equipo.memoria, equipo.laboratorio || equipo.ubicacion, // 🔄 Soporte doble por si acaso para la ubicación
            equipo.meson, equipo.puesto, equipo.estado, 
            // 🔴 CORREGIDO: Buscamos en singular, en plural o un string vacío. ¡Así no se pierde nada!
            equipo.observacion || equipo.observaciones || "", equipo.id));
        }
        catch (error) {
            console.error("Error obteniendo equipos:", error);
            throw error;
        }
    }
    async agregarEquipo(equipo) {
        try {
            const response = await fetch(this._urlbase, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(equipo.toJSON())
            });
            if (!response.ok) {
                throw new Error(`Error agregando equipo a la api: ${response.statusText}`);
            }
            const equipoAgregado = await response.json();
            return new Cl_mEquipos(equipoAgregado.marca, equipoAgregado.procesador, equipoAgregado.memoria, equipoAgregado.laboratorio || equipoAgregado.ubicacion, equipoAgregado.meson, equipoAgregado.puesto, equipoAgregado.estado, equipoAgregado.observacion || equipoAgregado.observaciones || "", equipoAgregado.id);
        }
        catch (error) {
            console.error("Error agregando equipo:", error);
            throw error;
        }
    }
    async actualizarEstadoEquipo(equipo) {
        try {
            const urlEspecifica = `${this._urlbase}/${equipo.id}`;
            const response = await fetch(urlEspecifica, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(equipo.toJSON())
            });
            if (!response.ok) {
                throw new Error(`Error actualizando equipo en la api: ${response.statusText}`);
            }
            return response.ok;
        }
        catch (error) {
            console.error(`Error actualizando equipo con ID ${equipo.id}:`, error);
            return false;
        }
    }
}
//# sourceMappingURL=Cl_sEquipo%20-%20Copy.js.map