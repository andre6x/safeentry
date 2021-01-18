
export class BlackListModel {
    constructor(public id: number = 0,
                public tipo: string = '',
                public valor: string = '',
                public descripcion: string = '',
                public urlFoto: string = '',
                public estado: string = '',
                public dateCreate: Date = null,
                public userCreate: string = '',
                public dateUpdate: Date = null,
                public userUpdate: string = '',
                public puntoId: number = 0,
                public localidadId: number = 0) {
    }
}
