import { iEquipo } from "../interfaces/Cl_iEquipo.js";
import Cl_mEquipos from "../models/Cl_mEquipos.js";

export default class Cl_sEquipo {
    private _urlbase: string = "https://6a1c78b88858a003817bea5d.mockapi.io/Labs/equipos";

    constructor() { }

    public async getEquipos(): Promise<Cl_mEquipos[]> {
        try {
            const response = await fetch(this._urlbase);
            if (!response.ok) {
                throw new Error(`Error obteniendo equipos de la api: ${response.statusText}`);
            }
            const datosJSON = await response.json();
            
            return datosJSON.map((equipo: any) => new Cl_mEquipos(
                equipo.marca,
                equipo.procesador,
                equipo.memoria,
                equipo.laboratorio || equipo.ubicacion,
                equipo.meson,
                equipo.puesto,
                equipo.estado,
                equipo.observacion || equipo.observaciones || "", 
                equipo.id
            ));
        } catch (error) {
            console.error("Error obteniendo equipos:", error);
            throw error;
        }
    }

    public async agregarEquipo(equipo: Cl_mEquipos): Promise<Cl_mEquipos> {
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
            return new Cl_mEquipos(
                equipoAgregado.marca,
                equipoAgregado.procesador,
                equipoAgregado.memoria,
                equipoAgregado.laboratorio || equipoAgregado.ubicacion,
                equipoAgregado.meson,
                equipoAgregado.puesto,
                equipoAgregado.estado,
                equipoAgregado.observacion || equipoAgregado.observaciones || "",
                equipoAgregado.id
            );
        } catch (error) {
            console.error("Error agregando equipo:", error);
            throw error;
        }
    }

    public async actualizarEstadoEquipo(equipo: Cl_mEquipos): Promise<boolean> {
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
        } catch (error) {
            console.error(`Error actualizando equipo con ID ${equipo.id}:`, error);
            return false;
        }
    }
}