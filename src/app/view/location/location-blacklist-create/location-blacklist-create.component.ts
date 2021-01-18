import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../model/data/user.model";
import {MessageService, SelectItem} from "primeng";
import {LocalidadModel} from "../../../model/data/localidad.model";
import {PuntoModel} from "../../../model/data/punto.model";
import {Router} from "@angular/router";
import {AccessService} from "../../../services/access.service";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {BlackListModel} from "../../../model/data/black-list.model";
import {ResponseStatus} from "../../../model/response/response-status.model";
import Utils from "../../../config/utils";

@Component({
  selector: 'app-location-blacklist-create',
  templateUrl: './location-blacklist-create.component.html',
  styleUrls: ['./location-blacklist-create.component.css']
})
export class LocationBlacklistCreateComponent implements OnInit {

    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[];
    listTypeItem: SelectItem[];

    localidadModel: LocalidadModel;
    puntoModel: PuntoModel;
    blackListModel: BlackListModel;

    listClientItem: SelectItem[];

    fileFoto: File;
    formData: FormData;

    constructor(public router: Router,
                private accessService: AccessService,
                private messageService: MessageService,
                public usuarioService: UsuarioService) {
        this.userModel = this.usuarioService.userModel;
        if (this.userModel.username) {
            this.usuario = this.userModel.username;
        }
    }

    ngOnInit(): void {
        this.puntoModel = new PuntoModel();
        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Seleccione', value: ''});
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.listTypeItem = [];
        this.listTypeItem.push({label: 'Seleccione', value: ''});
        this.listTypeItem.push({label: 'IDENTIFICACION', value: 'IDENTIFICACION'});
        this.listTypeItem.push({label: 'PLACA', value: 'PLACA'});

        this.cargarStorageData();
    }

    cargarStorageData() {
        this.puntoModel = new PuntoModel();
        if (localStorage.getItem('puntoModel') && JSON.parse(localStorage.getItem('puntoModel')) != null) {
            this.puntoModel = JSON.parse(localStorage.getItem('puntoModel'));
        }
        this.localidadModel = new LocalidadModel();
        if (localStorage.getItem('localidadModel') && JSON.parse(localStorage.getItem('localidadModel')) != null) {
            this.localidadModel = JSON.parse(localStorage.getItem('localidadModel'));
        }

        this.blackListModel = new BlackListModel();
        if (localStorage.getItem('blackListModel') && JSON.parse(localStorage.getItem('blackListModel')) != null) {
            this.blackListModel = JSON.parse(localStorage.getItem('blackListModel'));
        } else {
            this.blackListModel.estado = 'ACTIVO';
            this.blackListModel.tipo = 'IDENTIFICACION';
        }
    }

    myUploaderFile(event) {
        for (const file of event.files) {
            this.fileFoto = file;
            // this.uploadedFiles.push(file);
        }
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    saveData() {
        if (this.validarDatos()) {
            this.blackListModel.userCreate = this.usuario;
            this.blackListModel.puntoId = this.puntoModel.id;
            this.blackListModel.localidadId = this.localidadModel.id;
            console.log('REQUEST::', this.blackListModel);

            this.formData = new FormData();
            this.formData.append('data', JSON.stringify(this.blackListModel));
            if (this.fileFoto) {
                this.formData.append('file', this.fileFoto);
            }
            this.accessService.createOrUpdateBlacklist(this.formData)
                .subscribe((resp: ResponseStatus) => {
                        console.log('RESPONSE::', resp);
                        if (resp.code === 200) {
                            this.blackListModel.id = resp.idEntity;
                            this.redirectBackPage();
                            Utils.swalAlertSuccess('Atención', resp.message);
                        } else {
                            Utils.swalAlertWarning('Atención', resp.message);
                        }
                    },
                    (error) => {
                        // console.log('oops', error);
                    });
        }
    }

    validarDatos(): boolean {
        if (this.blackListModel.tipo.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el tipo.');
            return false;
        } else if (this.blackListModel.valor.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el número o placa.');
            return false;
        } else if (this.blackListModel.descripcion.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el nombre.');
            return false;
        } else if (this.blackListModel.estado.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el estado.');
            return false;
        } else if (this.puntoModel.id === 0) {
            Utils.swalAlertWarning('Atención', 'No se encuentra el punto');
            return false;
        } else if (this.localidadModel.id === 0) {
            Utils.swalAlertWarning('Atención', 'No se encuentra la localidad');
            return false;
        }
        return true;
    }

    localidadInfo(localidad: LocalidadModel) {
        return Utils.localidadInfo(localidad);
    }

    redirectBackPage() {
        localStorage.setItem('residenteModel', null);
        this.router.navigate(['/location/location_create']);
    }

}
