export default class Cl_mEquipos {
    private _marca: string;
    private _procesador: string;
    private _memoria: number;
    private _ubicacion: string;
    private _meson: string;
    private _puesto: string;
    private _estado: 'Activo' | 'Reportado' | 'Mantenimiento';
    private _observacion: string;
    private _fechaRegistro: Date = new Date();
    private _id?: string | undefined;


    constructor(
        marca: string, 
        procesador: string, 
        memoria: number, 
        ubicacion: string, 
        meson: string,
        puesto: string, 
        estado: 'Activo' | 'Reportado' | 'Mantenimiento', 
        observacion: string, 
        fechaRegistro: Date = new Date(), 
        id?: string,
        
        ) {
        this._marca = marca;
        this._procesador = procesador;
        this._memoria = memoria;
        this._ubicacion = ubicacion;
        this._meson = meson;
        this._puesto = puesto;
        this._estado = estado;
        this._observacion = observacion;
        this._fechaRegistro = fechaRegistro;
        this._id = id || undefined; 
    }

    public set id(id: string) {
        this._id = id;
    }

    public set marca(marca: string) {
        this._marca = marca;
    }

    public set procesador(procesador: string) {
        this._procesador = procesador;
    }

    public set memoria(memoria: number) {
        this._memoria = memoria;
    }

    public set ubicacion(ubicacion: string) {
        this._ubicacion = ubicacion;
    }

    public set estado(estado: 'Activo' | 'Reportado' | 'Mantenimiento') {
        if (estado === 'Activo')
            this._observacion = "";
        this._estado = estado;
    }

    public set meson(meson: string){
        this._meson = meson;
    }

    public set puesto(puesto: string){
        this._puesto = puesto;
    }

    public set observacion(observacion: string){
        this._observacion = observacion;
    }
    
    public set fechaRegistro(fechaRegistro: Date){
        this._fechaRegistro = fechaRegistro;
    }

    public get id(): string | undefined {
        return this._id;
    }

    public get marca(): string {
        return this._marca;
    }
    public get procesador(): string {
        return this._procesador;
    }
    public get memoria(): number {
        return this._memoria;
    }
    public get ubicacion(): string {
        return this._ubicacion;
    }
    public get estado(): 'Activo' | 'Reportado' | 'Mantenimiento' {
        return this._estado;
    }

    public get meson(): string {
        return this._meson;
    }
    public get puesto(): string {
        return this._puesto;
    }
    public get observacion(): string {
        return this._observacion;
    }
    public get fechaRegistro(): Date {
        return this._fechaRegistro; 
    }

    public Mantenimiento() {
        if (this._estado === 'Mantenimiento') {
            return true;
        }
        return false;
    }

    public Reportado() {
        if (this._estado === 'Reportado') {
            return true;
        }
        return false;
    }

    public Activo() {
        if (this._estado === 'Activo') {
            return true;
        }
        return false;
    }

    public toJSON() {
        return {
            id: this.id,
            marca: this._marca,
            procesador: this._procesador,
            memoria: this._memoria,
            ubicacion: this._ubicacion,
            meson: this._meson,
            puesto: this._puesto,
            estado: this._estado,
            observacion: this._observacion,
            fechaRegistro: this._fechaRegistro
        };
        }

}