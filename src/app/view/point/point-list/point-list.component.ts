import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {PuntoModel} from "../../../model/data/punto.model";
import {RequestFilterPoint} from "../../../model/request/request-filter-point.model";
import {Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {AccessService} from "../../../services/access.service";
import {ModalLoadingService} from "../../../component/modal-loading/modal-loading.service";
import {ResponseFilterPoint} from "../../../model/response/response-filter-point.model";

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.css']
})
export class PointListComponent implements OnInit {

    cols: any[];

    userModel: UserModel;
    usuario = '';

    listStatusItem: SelectItem[];

    listPuntoModel: PuntoModel[];

    requestFilterPoint: RequestFilterPoint;

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
            {field: 'nombre', header: 'Nombre'},
            {field: 'cliente', header: 'Cliente'},
            {field: 'tipo', header: 'Tipo'},
            {field: 'direccion', header: 'Dirección'},
            {field: 'longitud', header: 'Long/Lat'},
            {field: 'nemonicoSgi', header: 'SGI'},
            {field: 'estado', header: 'Estado'},
            {field: 'dateCreate', header: 'Creado Por'},
            {field: 'dateUpdate', header: 'Modificado Por'},
        ];

        this.listPuntoModel = [];

        this.requestFilterPoint = new RequestFilterPoint();
        this.requestFilterPoint.estado = 'ACTIVO';

        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.callService();
    }

    callService() {
        this.listPuntoModel = [];
        console.log('REQUEST::', this.requestFilterPoint);
        this.accessService.getListPoints(this.requestFilterPoint)
            .subscribe((resp: ResponseFilterPoint) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listPuntoModel = resp.items;
                    }
                }
            });
    }

    createData() {
        localStorage.setItem('puntoModel', null);
        this.redirectClientCreateEditPage();
    }

    editData(puntoModel: PuntoModel) {
        localStorage.setItem('puntoModel', JSON.stringify(puntoModel));
        this.redirectClientCreateEditPage();
    }

    deleteData(puntoModel: PuntoModel) {

    }

    redirectLocation(puntoModel: PuntoModel) {
        localStorage.setItem('puntoModel', JSON.stringify(puntoModel));
        this.redirectLocationListPage();
    }

    redirectClientCreateEditPage() {
        this.router.navigate(['/point/point_create']);
    }

    redirectLocationListPage() {
        this.router.navigate(['/location/location_list']);
    }

}
