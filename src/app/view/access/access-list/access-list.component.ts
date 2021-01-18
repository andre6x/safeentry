import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AccessService} from '../../../services/access.service';
import {UsuarioService} from '../../../services/usuario/usuario.service';
import {UserModel} from '../../../model/data/user.model';
import Utils from '../../../config/utils';
import {RequestFilterPoint} from '../../../model/request/request-filter-point.model';
import {PuntoModel} from '../../../model/data/punto.model';
import {SelectItem} from 'primeng';
import {ResponseFilterPoint} from '../../../model/response/response-filter-point.model';
import {VisitaModel} from '../../../model/data/visita.model';
import {RequestFilterVisit} from '../../../model/request/request-filter-visit.model';
import {ResponseFilterVisit} from '../../../model/response/response-filter-visit.model';
import {ModalLoadingService} from '../../../component/modal-loading/modal-loading.service';
import {LocalidadModel} from '../../../model/data/localidad.model';

@Component({
    selector: 'app-access-list',
    templateUrl: './access-list.component.html',
    styleUrls: ['./access-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AccessListComponent implements OnInit {

    cols: any[];
    userModel: UserModel;
    usuario = '';
    // punto
    selectPuntoModel: PuntoModel;
    listPuntoModel: PuntoModel[];
    listPuntoItem: SelectItem[];
    // vista
    listVisitaModel: VisitaModel[];

    // filter
    placa = '';
    manzana = '';
    villa = '';
    fechaInicio: Date;
    fechaFin: Date;

    constructor(public router: Router,
                public usuarioService: UsuarioService,
                private accessService: AccessService,
                public modalLoadingService: ModalLoadingService) {
        this.userModel = this.usuarioService.userModel;
        if (this.userModel.username) {
            this.usuario = this.userModel.username;
        }
    }

    ngOnInit(): void {
        this.cols = [
            {field: 'persona.nombres', header: 'Visitante'},
            {field: 'localidad.manzana', header: 'Residencia'},
            {field: 'vehiculo.placa', header: 'Vehiculo'},
            {field: 'fecha', header: 'Fecha'},
            {field: 'metodoNotificacion', header: 'Respuestas'},
            {field: 'accesoConcedido', header: 'Acceso'},
        ];
        this.listVisitaModel = [];

        this.fechaInicio = new Date();
        this.fechaInicio.setDate(this.fechaInicio.getDate() - 1);

        this.fechaFin = new Date();
        this.callServicePuntos();
    }

    metodoNotificacion(metodo: number) {
        let estado = '';
        if (metodo === 1) {
            estado = 'Autorizado';
        } else if (metodo === 2) {
            estado = 'Revision de agente';
        } else if (metodo === 3) {
            estado = 'Negado';
        } else {
            estado = 'Sin Respuesta';
        }
        return estado;
    }

    estadoClass(estadoId: number) {
        let etiqueta: string;
        if (estadoId === 1) {
            // autorizado
            etiqueta = 'label-success-2';
        } else if (estadoId === 2) {
            // autorizado con revision
            etiqueta = 'label-info';
        } else if (estadoId === 3) {
            // negado
            etiqueta = 'label-danger';
        } else if (estadoId === 5) {
            // llamada colgada
            etiqueta = 'label-danger';
        } else {
            // sin respuesta
            etiqueta = 'label-warning';
        }
        return etiqueta;
    }

    localidadInfo(localidad: LocalidadModel ) {
        return Utils.localidadInfo(localidad);
    }

    selectFoto(visitaModel: VisitaModel) {

    }

    buscarVisitas() {
        if (this.selectPuntoModel && this.selectPuntoModel.id > 0) {
            this.callServiceVisit();
        } else {
            Utils.swalAlertWarning(Utils.ATENCION, 'Seleccione el punto');
        }
    }

    callServicePuntos() {
        this.listPuntoModel = [];
        this.selectPuntoModel = new PuntoModel();
        this.listPuntoItem = [];
        this.listPuntoItem.push({label: 'Seleccione', value: null});

        const request = new RequestFilterPoint();
        this.accessService.getListPoints(request)
            .subscribe((resp: ResponseFilterPoint) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items && resp.items.length > 0) {
                        this.listPuntoModel = resp.items;
                        for (let item of this.listPuntoModel) {
                            // llenar lista para el spiner
                            this.listPuntoItem.push({label: item.nombre, value: item});
                        }
                    }
                    // this.buscarVisitas();
                }
            });
    }


    callServiceVisit() {

        const request = new RequestFilterVisit(
            this.selectPuntoModel.id,
            this.manzana,
            this.villa,
            this.placa,
            this.fechaInicio.toISOString(),
            this.fechaFin.toISOString()
        );
        this.listVisitaModel = [];
        console.log('REQUEST::', request);
        this.accessService.getListVisit(request)
            .subscribe((resp: ResponseFilterVisit) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listVisitaModel = resp.items;
                    }
                }
            });
    }

}
