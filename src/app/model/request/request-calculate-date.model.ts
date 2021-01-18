
export class RequestCalculateDate  {
    constructor(
        public puntoId: number = 0,
        public fechaInicio: string = '',
        public tipo: string = '',
        public medio: string = ''
    ) {}
}
