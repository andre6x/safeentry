import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {AccessService} from "../../../services/access.service";
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {PuntoModel} from "../../../model/data/punto.model";
import {ResidenteModel} from "../../../model/data/residente.model";
import {LocalidadModel} from "../../../model/data/localidad.model";
import Utils from "../../../config/utils";
import {PersonaModel} from "../../../model/data/persona.model";
import {ResponseStatus} from "../../../model/response/response-status.model";
import {ResponseFilterRol} from "../../../model/response/response-filter-rol.model";
import {RolModel} from "../../../model/data/rol.model";
import {RequestFilterRol} from "../../../model/request/request-filter-rol.model";

@Component({
    selector: 'app-location-resident-create',
    templateUrl: './location-resident-create.component.html',
    styleUrls: ['./location-resident-create.component.css']
})
export class LocationResidentCreateComponent implements OnInit {

    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[];
    listTypeItem: SelectItem[];
    listTypeItem2: SelectItem[];

    localidadModel: LocalidadModel;
    puntoModel: PuntoModel;
    residenteModel: ResidenteModel;

    listClientItem: SelectItem[];


    listRolModel: RolModel[];
    listRolItem: SelectItem[];
    selectRolModel: RolModel;

    fileFoto: File;
    formData: FormData;

    constructor(public router: Router,
                private accessService: AccessService,
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
        this.listTypeItem.push({label: 'CEDULA', value: 'CED'});
        this.listTypeItem.push({label: 'RUC', value: 'RUC'});
        this.listTypeItem.push({label: 'PASAPORTE', value: 'PAS'});

        this.listTypeItem2 = [];
        this.listTypeItem2.push({label: 'Seleccione', value: ''});
        this.listTypeItem2.push({label: 'PROPIETARIO', value: 'PROPIETARIO'});
        this.listTypeItem2.push({label: 'INQUILINO', value: 'INQUILINO'});
        this.listTypeItem2.push({label: 'MENOR_EDAD', value: 'MENOR_EDAD'});
        this.listTypeItem2.push({label: 'FAMILIAR', value: 'FAMILIAR'});

        this.cargarStorageData();
        this.callServiceRoles();
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

        this.residenteModel = new ResidenteModel();
        if (localStorage.getItem('residenteModel') && JSON.parse(localStorage.getItem('residenteModel')) != null) {
            this.residenteModel = JSON.parse(localStorage.getItem('residenteModel'));
            this.residenteModel.fechaInicio = new Date (this.residenteModel.fechaInicio);
            if (this.residenteModel.persona && this.residenteModel.persona.id > 0) {
                if (this.residenteModel.persona.usuarioModel && this.residenteModel.persona.usuarioModel.id > 0) {

                } else {
                    this.residenteModel.persona.usuarioModel = new UserModel();
                }
            } else {
                this.residenteModel.persona = new PersonaModel();
                this.residenteModel.persona.usuarioModel = new UserModel();
            }
        } else {
            this.residenteModel.estado = 'ACTIVO';
            this.residenteModel.fechaInicio = new Date();
            this.residenteModel.persona = new PersonaModel();
            this.residenteModel.persona.tipoIdentificacion = 'CED';
            this.residenteModel.persona.usuarioModel = new UserModel();
        }
    }

    callServiceRoles() {
        this.listRolItem = [];
        this.listRolItem.push({label: 'Seleccione', value: null});

        this.selectRolModel = new RolModel();
        this.listRolModel = [];
        const requestFilterRol = new RequestFilterRol();
        requestFilterRol.estado = 'ACTIVO';
        console.log('REQUEST::', requestFilterRol);
        this.accessService.getListRol(requestFilterRol)
            .subscribe((resp: ResponseFilterRol) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listRolModel = resp.items;
                        for (let item of this.listRolModel) {
                            this.listRolItem.push({label: item.nombre, value: item});
                            if (this.residenteModel.persona.usuarioModel && this.residenteModel.persona.usuarioModel.rolId
                                && (this.residenteModel.persona.usuarioModel.rolId === item.id)) {
                                this.selectRolModel = item;
                            }
                        }
                    }
                }
            });
    }

    saveData() {
        if (this.validarDatos()) {
            this.residenteModel.userCreate = this.usuario;
            this.residenteModel.puntoId = this.puntoModel.id;
            this.residenteModel.localidadId = this.localidadModel.id;
            this.residenteModel.persona.usuarioModel.rolId = this.selectRolModel.id;
            console.log('REQUEST::', this.residenteModel);

            this.formData = new FormData();
            this.formData.append('data', JSON.stringify(this.residenteModel));
            if (this.fileFoto) {
                this.formData.append('file', this.fileFoto);
            }
            this.accessService.createOrUpdateResident(this.formData)
                .subscribe((resp: ResponseStatus) => {
                        console.log('RESPONSE::', resp);
                        if (resp.code === 200) {
                            this.residenteModel.id = resp.idEntity;
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
        if (this.puntoModel.id === 0) {
            Utils.swalAlertWarning('Atención', 'No se encuentra el punto');
            return false;
        } else if (this.localidadModel.id === 0) {
            Utils.swalAlertWarning('Atención', 'No se encuentra la localidad');
            return false;
        } else if (this.residenteModel.tipo.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el tipo.');
            return false;
        } else if (!this.residenteModel.fechaInicio) {
            Utils.swalAlertWarning('Atención', 'Seleccione la fecha.');
            return false;
        } else if (this.residenteModel.estado.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el estado.');
            return false;
        } else if (this.residenteModel.persona.tipoIdentificacion.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el tipo.');
            return false;
        } else if (this.residenteModel.persona.nombres.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese los nombres.');
            return false;
        } else if (this.residenteModel.persona.apellidos.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese los apellidos.');
            return false;
        } else if (this.selectRolModel.id === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el rol.');
            return false;
        } /*else if (this.residenteModel.persona.usuarioModel.email.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el email.');
            return false;
        }*/
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
