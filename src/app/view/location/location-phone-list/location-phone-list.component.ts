import {Component, OnInit} from '@angular/core';
import {SelectItem} from "primeng";
import {UserModel} from "../../../model/data/user.model";
import {ModalLoadingService} from "../../../component/modal-loading/modal-loading.service";
import {AccessService} from "../../../services/access.service";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {Router} from "@angular/router";
import {LocalidadModel} from "../../../model/data/localidad.model";
import {ResidenteModel} from "../../../model/data/residente.model";
import {RequestFilterResident} from "../../../model/request/request-filter-resident.model";
import {ResponseFilterResident} from "../../../model/response/response-filter-resident.model";
import {TelefonoContactoModel} from "../../../model/data/telefono-contacto.model";
import {RequestFilterPhoneContact} from "../../../model/request/request-filter-phone-contact.model";
import {ResponseFilterPhoneContact} from "../../../model/response/response-filter-phone-contact.model";

@Component({
    selector: 'app-location-phone-list',
    templateUrl: './location-phone-list.component.html',
    styleUrls: ['./location-phone-list.component.css']
})
export class LocationPhoneListComponent implements OnInit {

    cols: any[];

    userModel: UserModel;
    usuario = '';

    listStatusItem: SelectItem[] = [];

    localidadModel: LocalidadModel;
    listTelefonoContactoModel: TelefonoContactoModel[] = [];
    requestFilterPhoneContact: RequestFilterPhoneContact;

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
            {field: '', header: 'Foto', width: '10%'},
            {field: 'prioridad', header: 'Prioridad', width: '10%'},
            {field: 'valor', header: 'Número', width: '8%'},
            {field: 'descripcion', header: 'Nombre', width: '8%'},
            {field: 'estado', header: 'Estado', width: '8%'},
            {field: 'dateCreate', header: 'Creado Por', width: '13%'},
            {field: 'dateUpdate', header: 'Modificado Por', width: '13%'},
        ];

        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.requestFilterPhoneContact = new RequestFilterPhoneContact();
        this.requestFilterPhoneContact.estado = 'Activo';
    }

    cargarStorageData() {
        this.localidadModel = new LocalidadModel();
        if (localStorage.getItem('localidadModel') && JSON.parse(localStorage.getItem('localidadModel')) != null) {
            this.localidadModel = JSON.parse(localStorage.getItem('localidadModel'));
        }
    }

    loadPhoto(telefonoContactoModel: TelefonoContactoModel) {
        if (telefonoContactoModel.urlFoto.length > 0) {
            return this.cdn + telefonoContactoModel.urlFoto;
        } else {
            return 'assets/layout/images/icons/usuario.png';
        }
    }

    callService() {
        this.cargarStorageData();

        this.listTelefonoContactoModel = [];
        this.requestFilterPhoneContact.localidadId = this.localidadModel.id;
        console.log('REQUEST::', this.requestFilterPhoneContact);
        this.accessService.getListPhonesByLocation(this.requestFilterPhoneContact)
            .subscribe((resp: ResponseFilterPhoneContact) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listTelefonoContactoModel = resp.items;
                    }
                    if (resp.summary) {
                        this.cdn = resp.summary.cdn;
                    }
                }
            });
    }

    createData() {
        localStorage.setItem('telefonoContactoModel', null);
        this.redirectPhoneCreateEditPage();
    }

    editData(telefonoContactoModel: TelefonoContactoModel) {
        localStorage.setItem('telefonoContactoModel', JSON.stringify(telefonoContactoModel));
        this.redirectPhoneCreateEditPage();
    }

    deleteData(telefonoContactoModel: TelefonoContactoModel) {

    }

    redirectPhoneCreateEditPage() {
        this.router.navigate(['/location/location_phone_create']);
    }

}
