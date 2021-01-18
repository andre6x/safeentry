import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {LocalidadModel} from "../../../model/data/localidad.model";
import {PuntoModel} from "../../../model/data/punto.model";
import {Router} from "@angular/router";
import {AccessService} from "../../../services/access.service";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {ResponseStatus} from "../../../model/response/response-status.model";
import Utils from "../../../config/utils";
import {VehiculoModel} from "../../../model/data/vehiculo.model";

@Component({
  selector: 'app-location-vehicle-create',
  templateUrl: './location-vehicle-create.component.html',
  styleUrls: ['./location-vehicle-create.component.css']
})
export class LocationVehicleCreateComponent implements OnInit {

    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[];
    listTypeItem: SelectItem[];

    localidadModel: LocalidadModel;
    puntoModel: PuntoModel;
    vehiculoModel: VehiculoModel;

    listClientItem: SelectItem[];


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
        this.listTypeItem.push({label: 'AUTO', value: 'AUTO'});
        this.listTypeItem.push({label: 'MOTO', value: 'MOTO'});

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

        this.vehiculoModel = new VehiculoModel();
        if (localStorage.getItem('vehiculoModel') && JSON.parse(localStorage.getItem('vehiculoModel')) != null) {
            this.vehiculoModel = JSON.parse(localStorage.getItem('vehiculoModel'));
        } else {
            this.vehiculoModel.estado = 'ACTIVO';
            this.vehiculoModel.tipo = 'AUTO';
        }
    }

    saveData() {
        if (this.validarDatos()) {
            this.vehiculoModel.userCreate = this.usuario;
            this.vehiculoModel.puntoId = this.puntoModel.id;
            this.vehiculoModel.localidadId = this.localidadModel.id;

            console.log('REQUEST::', this.vehiculoModel);
            this.accessService.createOrUpdateVehicle(this.vehiculoModel)
                .subscribe((resp: ResponseStatus) => {
                        console.log('RESPONSE::', resp);
                        if (resp.code === 200) {
                            this.vehiculoModel.id = resp.idEntity;
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
        if (this.vehiculoModel.tipo.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el tipo.');
            return false;
        } else if (this.vehiculoModel.placa.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese la placa.');
            return false;
        } else if (this.vehiculoModel.estado.length === 0) {
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

