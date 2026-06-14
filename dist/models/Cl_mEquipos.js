export default class Cl_mEquipos {
    _marca;
    _procesador;
    _memoria;
    _ubicacion;
    _meson;
    _puesto;
    _estado;
    _observacion;
    _id;
    constructor(marca, procesador, memoria, ubicacion, meson, puesto, estado, observacion, id) {
        this._marca = marca;
        this._procesador = procesador;
        this._memoria = memoria;
        this._ubicacion = ubicacion;
        this._meson = meson;
        this._puesto = puesto;
        this._estado = estado;
        this._observacion = observacion;
        this._id = id || undefined;
    }
    set id(id) {
        this._id = id;
    }
    set marca(marca) {
        this._marca = marca;
    }
    set procesador(procesador) {
        this._procesador = procesador;
    }
    set memoria(memoria) {
        this._memoria = memoria;
    }
    set ubicacion(ubicacion) {
        this._ubicacion = ubicacion;
    }
    set estado(estado) {
        if (estado === 'Activo')
            this._observacion = "";
        this._estado = estado;
    }
    set meson(meson) {
        this._meson = meson;
    }
    set puesto(puesto) {
        this._puesto = puesto;
    }
    set observacion(observacion) {
        this._observacion = observacion;
    }
    get id() {
        return this._id;
    }
    get marca() {
        return this._marca;
    }
    get procesador() {
        return this._procesador;
    }
    get memoria() {
        return this._memoria;
    }
    get ubicacion() {
        return this._ubicacion;
    }
    get estado() {
        return this._estado;
    }
    get meson() {
        return this._meson;
    }
    get puesto() {
        return this._puesto;
    }
    get observacion() {
        return this._observacion;
    }
    Mantenimiento() {
        if (this._estado === 'Mantenimiento') {
            return true;
        }
        return false;
    }
    Reportado() {
        if (this._estado === 'Reportado') {
            return true;
        }
        return false;
    }
    Activo() {
        if (this._estado === 'Activo') {
            return true;
        }
        return false;
    }
    toJSON() {
        return {
            id: this.id,
            marca: this._marca,
            procesador: this._procesador,
            memoria: this._memoria,
            ubicacion: this._ubicacion,
            meson: this._meson,
            puesto: this._puesto,
            estado: this._estado,
            observacion: this._observacion
        };
    }
}
//# sourceMappingURL=Cl_mEquipos.js.map