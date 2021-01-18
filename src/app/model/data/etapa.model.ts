export class EtapaModel {
    constructor(public id: number = 0,
                public nombre: string = '',
                public descripcion: string = '',
                public estado: string = '',
                public dateCreate: Date = null,
                public userCreate: string = '',
                public dateUpdate: Date = null,
                public userUpdate: string = '') {
    }
}
