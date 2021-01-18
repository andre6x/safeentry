import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {LocalidadModel} from "../../../model/data/localidad.model";
import {Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {ModalLoadingService} from "../../../component/modal-loading/modal-loading.service";
import {AccessService} from "../../../services/access.service";
import {RequestFilterPreauthorization} from "../../../model/request/request-filter-preauthorization.model";
import {PreautorizacionModel} from "../../../model/data/preautorizacion.model";
import {ResponseFilterPreauthorization} from "../../../model/response/response-filter-preauthorization.model";

@Component({
  selector: 'app-location-preauthorization-list',
  templateUrl: './location-preauthorization-list.component.html',
  styleUrls: ['./location-preauthorization-list.component.css']
})
export class LocationPreauthorizationListComponent implements OnInit {

    cols: any[];
    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[] = [];

    localidadModel: LocalidadModel;
    requestFilterPreauthorization: RequestFilterPreauthorization;
    listPreautorizacionModel: PreautorizacionModel[] = [];

    cdn = '';

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
            {field: '', header: 'Foto', width: '8%'},
            {field: 'identificacionVisitante', header: 'Identificación', width: '10%'},
            // {field: 'placaVehiculo', header: 'Placa', width: '8%'},
            {field: 'descripcion', header: 'Nombre', width: '8%'},
            {field: 'fechaInicio', header: 'Fecha Inicio', width: '15%'},
            {field: 'fechaFin', header: 'Fecha Fin', width: '15%'},
            {field: 'estado', header: 'Estado', width: '8%'},
            {field: 'dateCreate', header: 'Creado Por', width: '13%'},
            {field: 'dateUpdate', header: 'Modificado Por', width: '13%'},
        ];

        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.requestFilterPreauthorization = new RequestFilterPreauthorization();
        this.requestFilterPreauthorization.estado = 'Activo';
    }

    cargarStorageData() {
        this.localidadModel = new LocalidadModel();
        if (localStorage.getItem('localidadModel') && JSON.parse(localStorage.getItem('localidadModel')) != null) {
            this.localidadModel = JSON.parse(localStorage.getItem('localidadModel'));
        }
    }

    loadPhoto(preautorizacionModel: PreautorizacionModel) {
        if (preautorizacionModel.urlFoto.length > 0) {
            return this.cdn + preautorizacionModel.urlFoto;
        } else {
            return 'assets/layout/images/icons/usuario.png';
        }
    }

    callService() {
        this.cargarStorageData();

        this.listPreautorizacionModel = [];
        this.requestFilterPreauthorization.localidadId = this.localidadModel.id;
        console.log('REQUEST::', this.requestFilterPreauthorization);
        this.accessService.getListPreauthorizationByLocation(this.requestFilterPreauthorization)
            .subscribe((resp: ResponseFilterPreauthorization) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listPreautorizacionModel = resp.items;
                    }
                    if (resp.summary) {
                        this.cdn = resp.summary.cdn;
                    }
                }
            });
    }

    createData() {
        localStorage.setItem('preautorizacionModel', null);
        this.redirectPreAutCreateEditPage();
    }

    editData(preautorizacionModel: PreautorizacionModel) {
        localStorage.setItem('preautorizacionModel', JSON.stringify(preautorizacionModel));
        this.redirectPreAutCreateEditPage();
    }

    deleteData(preautorizacionModel: PreautorizacionModel) {

    }

    redirectPreAutCreateEditPage() {
        this.router.navigate(['/location/location_preauthorization_create']);
    }

}
