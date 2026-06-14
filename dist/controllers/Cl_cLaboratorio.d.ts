import Cl_sEquipo from "../services/Cl_sEquipo.js";
import Cl_mEquipos from "../models/Cl_mEquipos.js";
export default class Cl_cLaboratorio {
    private modelo;
    private vista;
    private servicio;
    private controladorEquipo;
    constructor(equiposIniciales: Cl_mEquipos[], servicio: Cl_sEquipo);
    mostrarEquiposEnPantalla(): void;
    private refrescarDatosDesdeNube;
}
//# sourceMappingURL=Cl_cLaboratorio.d.ts.map