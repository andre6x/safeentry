import {Component, OnInit} from '@angular/core';
import {LocalidadModel} from "../../../model/data/localidad.model";
import {SelectItem} from "primeng";
import {UserModel} from "../../../model/data/user.model";
import {Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {ModalLoadingService} from "../../../component/modal-loading/modal-loading.service";
import {AccessService} from "../../../services/access.service";
import {RequestFilterResident} from "../../../model/request/request-filter-resident.model";
import {ResponseFilterResident} from "../../../model/response/response-filter-resident.model";
import {ResidenteModel} from "../../../model/data/residente.model";

@Component({
    selector: 'app-location-resident-list',
    templateUrl: './location-resident-list.component.html',
    styleUrls: ['./location-resident-list.component.css']
})
export class LocationResidentListComponent implements OnInit {

    cols: any[];
    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[] = [];

    localidadModel: LocalidadModel;
    listResidenteModel: ResidenteModel[] = [];
    requestFilterResident: RequestFilterResident;

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
            {field: 'tipo', header: 'Tipo', width: '8%'},
            {field: 'identificacion', header: 'Identificación', width: '10%'},
            {field: 'rowData.persona.apellidos', header: 'Nombres', width: '10%'},
            {field: 'rowData.persona.usuarioModel.email', header: 'Email', width: '10%'},
            {field: 'estado', header: 'Estado', width: '8%'},
            {field: 'dateCreate', header: 'Creado Por', width: '13%'},
            {field: 'dateUpdate', header: 'Modificado Por', width: '13%'},
        ];

        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.requestFilterResident = new RequestFilterResident();
        this.requestFilterResident.estado = 'Activo';
    }

    cargarStorageData() {
        this.localidadModel = new LocalidadModel();
        if (localStorage.getItem('localidadModel') && JSON.parse(localStorage.getItem('localidadModel')) != null) {
            this.localidadModel = JSON.parse(localStorage.getItem('localidadModel'));
        }
    }

    loadPhoto(residenteModel: ResidenteModel) {
        if (residenteModel.persona && residenteModel.persona.urlFoto.length > 0) {
            return this.cdn + residenteModel.persona.urlFoto;
        } else {
            return 'assets/layout/images/icons/usuario.png';
        }
    }

    callService() {
        this.cargarStorageData();

        this.listResidenteModel = [];
        this.requestFilterResident.localidadId = this.localidadModel.id;
        console.log('REQUEST::', this.requestFilterResident);
        this.accessService.getListPersonsByLocation(this.requestFilterResident)
            .subscribe((resp: ResponseFilterResident) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listResidenteModel = resp.items;
                    }
                    if (resp.summary) {
                        this.cdn = resp.summary.cdn;
                    }
                }
            });
    }

    createData() {
        localStorage.setItem('residenteModel', null);
        this.redirectResidentCreateEditPage();
    }

    editData(residenteModel: ResidenteModel) {
        localStorage.setItem('residenteModel', JSON.stringify(residenteModel));
        this.redirectResidentCreateEditPage();
    }

    deleteData(residenteModel: ResidenteModel) {

    }

    redirectResidentCreateEditPage() {
        this.router.navigate(['/location/location_resident_create']);
    }

}
