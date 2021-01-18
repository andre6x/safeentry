export class RequestFilterLocation {
    constructor(public puntoId: number = 0,
                public etapaId: number = 0,
                public manzana: string = '',
                public villa: string = '',
                public descripcion: string = '', // edificio
                public piso: string = '',
                public departamento: string = '',
                public estado: string = '') {
    }
}
