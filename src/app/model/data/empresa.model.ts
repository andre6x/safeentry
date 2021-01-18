export class EmpresaModel {
    constructor(public id: number = 0,
                public nombre: string = '',
                public ruc: string = '',
                public direccion: string = '',
                public nemonicoSgi: string = '',
                public estado: string = '',
                public dateCreate: Date = null,
                public userCreate: string = '',
                public dateUpdate: Date = null,
                public userUpdate: string = '') {
    }
}
