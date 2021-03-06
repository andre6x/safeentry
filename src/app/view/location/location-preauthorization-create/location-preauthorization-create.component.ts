import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../model/data/user.model";
import {MessageService, SelectItem} from "primeng";
import {LocalidadModel} from "../../../model/data/localidad.model";
import {PuntoModel} from "../../../model/data/punto.model";
import {Router} from "@angular/router";
import {AccessService} from "../../../services/access.service";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import Utils from "../../../config/utils";
import {ResponseStatus} from "../../../model/response/response-status.model";
import {PreautorizacionModel} from "../../../model/data/preautorizacion.model";
import {RequestCalculateDate} from "../../../model/request/request-calculate-date.model";
import {ResponseCalculateDateModel} from "../../../model/response/response-calculate-date.model";

@Component({
    selector: 'app-location-preauthorization-create',
    templateUrl: './location-preauthorization-create.component.html',
    styleUrls: ['./location-preauthorization-create.component.css']
})
export class LocationPreauthorizationCreateComponent implements OnInit {

    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[];
    listTypeItem: SelectItem[];

    localidadModel: LocalidadModel;
    puntoModel: PuntoModel;
    preautorizacionModel: PreautorizacionModel;

    listClientItem: SelectItem[];
    valorDias = '';

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
        this.listTypeItem.push({label: 'RECURRENTE', value: 'RECURRENTE'});
        this.listTypeItem.push({label: 'EVENTUAL', value: 'EVENTUAL'});
        this.listTypeItem.push({label: 'PROVISIONAL', value: 'PROVISIONAL'});

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

        this.preautorizacionModel = new PreautorizacionModel();
        if (localStorage.getItem('preautorizacionModel') && JSON.parse(localStorage.getItem('preautorizacionModel')) != null) {
            this.preautorizacionModel = JSON.parse(localStorage.getItem('preautorizacionModel'));
            this.preautorizacionModel.fechaInicio = new Date(this.preautorizacionModel.fechaInicio);
            this.preautorizacionModel.fechaFin = new Date(this.preautorizacionModel.fechaFin);
        } else {
            this.preautorizacionModel.estado = 'ACTIVO';
            this.preautorizacionModel.tipo = 'RECURRENTE';
            this.preautorizacionModel.fechaInicio = new Date();
            this.callServiceCalculoFecha();
        }
    }

    onChangeCalculate(event) {
        console.log('event :' + event);
        console.log(event.value);
        this.callServiceCalculoFecha();
    }

    callServiceCalculoFecha() {
        this.valorDias = '';
        const requestCalculateDate = new RequestCalculateDate();
        requestCalculateDate.puntoId = this.puntoModel.id;
        requestCalculateDate.fechaInicio = this.preautorizacionModel.fechaInicio.toISOString();
        requestCalculateDate.tipo = this.preautorizacionModel.tipo;
        requestCalculateDate.medio = 'WEB';
        console.log('REQUEST::', requestCalculateDate);
        this.accessService.calculateDatePrteauthorization(requestCalculateDate)
            .subscribe((resp: ResponseCalculateDateModel) => {
                    console.log('RESPONSE::', resp);
                    if (resp.code === 200) {
                        this.preautorizacionModel.fechaFin = new Date(resp.fechaFin);
                        this.valorDias = resp.valor;
                    } else {
                        Utils.swalAlertWarning('Atención', resp.message);
                    }
                },
                (error) => {
                    // console.log('oops', error);
                });
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
            this.preautorizacionModel.userCreate = this.usuario;
            this.preautorizacionModel.puntoId = this.puntoModel.id;
            this.preautorizacionModel.localidadId = this.localidadModel.id;
            console.log('REQUEST::', this.preautorizacionModel);

            this.formData = new FormData();
            this.formData.append('data', JSON.stringify(this.preautorizacionModel));
            if (this.fileFoto) {
                this.formData.append('file', this.fileFoto);
            }
            this.accessService.createOrUpdatePPrteauthorization(this.formData)
                .subscribe((resp: ResponseStatus) => {
                        console.log('RESPONSE::', resp);
                        if (resp.code === 200) {
                            this.preautorizacionModel.id = resp.idEntity;
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
        if (this.preautorizacionModel.identificacionVisitante.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el número de identificación.');
            return false;
        } else if (this.preautorizacionModel.descripcion.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el nombre.');
            return false;
        } else if (this.preautorizacionModel.tipo.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el tipo.');
            return false;
        } else if (this.preautorizacionModel.estado.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el estado.');
            return false;
        } else if (!this.preautorizacionModel.fechaInicio) {
            Utils.swalAlertWarning('Atención', 'Seleccione la fecha de inicio.');
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

