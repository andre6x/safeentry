import { Component, OnInit } from '@angular/core';
import Utils from "../../../config/utils";
import {LocalidadModel} from "../../../model/data/localidad.model";
import {PuntoModel} from "../../../model/data/punto.model";
import {MessageService, SelectItem} from "primeng";
import {UserModel} from "../../../model/data/user.model";
import {Router} from "@angular/router";
import {AccessService} from "../../../services/access.service";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {TelefonoContactoModel} from "../../../model/data/telefono-contacto.model";
import {ResponseStatus} from "../../../model/response/response-status.model";

@Component({
  selector: 'app-location-phone-create',
  templateUrl: './location-phone-create.component.html',
  styleUrls: ['./location-phone-create.component.css']
})
export class LocationPhoneCreateComponent implements OnInit {

    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[];
    listTypeItem: SelectItem[];

    localidadModel: LocalidadModel;
    puntoModel: PuntoModel;
    telefonoContactoModel: TelefonoContactoModel;

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

        this.telefonoContactoModel = new TelefonoContactoModel();
        if (localStorage.getItem('telefonoContactoModel') && JSON.parse(localStorage.getItem('telefonoContactoModel')) != null) {
            this.telefonoContactoModel = JSON.parse(localStorage.getItem('telefonoContactoModel'));
        } else {
            this.telefonoContactoModel.estado = 'ACTIVO';
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
            this.telefonoContactoModel.userCreate = this.usuario;
            this.telefonoContactoModel.puntoId = this.puntoModel.id;
            this.telefonoContactoModel.localidadId = this.localidadModel.id;
            console.log('REQUEST::', this.telefonoContactoModel);

            this.formData = new FormData();
            this.formData.append('data', JSON.stringify(this.telefonoContactoModel));
            if (this.fileFoto) {
                this.formData.append('file', this.fileFoto);
            }

            this.accessService.createOrUpdatePhones(this.formData)
                .subscribe((resp: ResponseStatus) => {
                        console.log('RESPONSE::', resp);
                        if (resp.code === 200) {
                            this.telefonoContactoModel.id = resp.idEntity;
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
        if (this.telefonoContactoModel.valor.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el número.');
            return false;
        } else if (this.telefonoContactoModel.descripcion.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el nombre.');
            return false;
        } else if (this.telefonoContactoModel.estado.length === 0) {
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
