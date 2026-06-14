import Cl_mEquipos from "../models/Cl_mEquipos.js";
export default class Cl_sEquipo {
    private _urlbase;
    constructor();
    getEquipos(): Promise<Cl_mEquipos[]>;
    agregarEquipo(equipo: Cl_mEquipos): Promise<Cl_mEquipos>;
    actualizarEstadoEquipo(equipo: Cl_mEquipos): Promise<boolean>;
}
//# sourceMappingURL=Cl_sEquipo%20-%20Copy.d.ts.map