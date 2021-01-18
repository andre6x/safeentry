import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {ResidenteModel} from "../../../model/data/residente.model";
import {LocalidadModel} from "../../../model/data/localidad.model";
import {Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {ModalLoadingService} from "../../../component/modal-loading/modal-loading.service";
import {AccessService} from "../../../services/access.service";
import {RequestFilterVehicle} from "../../../model/request/request-filter-vehicle.model";
import {VehiculoModel} from "../../../model/data/vehiculo.model";
import {ResponseFilterVehicle} from "../../../model/response/response-filter-vehicle.model";

@Component({
    selector: 'app-location-vehicle-list',
    templateUrl: './location-vehicle-list.component.html',
    styleUrls: ['./location-vehicle-list.component.css']
})
export class LocationVehicleListComponent implements OnInit {

    cols: any[];
    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[] = [];

    localidadModel: LocalidadModel;
    requestFilterVehicle: RequestFilterVehicle;
    listVehiculoModel: VehiculoModel[] = [];

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
            {field: 'tipo', header: 'Tipo', width: '8%'},
            {field: 'placa', header: 'Placa', width: '15%'},
            {field: 'estado', header: 'Estado', width: '8%'},
            {field: 'dateCreate', header: 'Creado Por', width: '13%'},
            {field: 'dateUpdate', header: 'Modificado Por', width: '13%'},
        ];

        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.requestFilterVehicle = new RequestFilterVehicle();
        this.requestFilterVehicle.estado = 'Activo';
    }

    cargarStorageData() {
        this.localidadModel = new LocalidadModel();
        if (localStorage.getItem('localidadModel') && JSON.parse(localStorage.getItem('localidadModel')) != null) {
            this.localidadModel = JSON.parse(localStorage.getItem('localidadModel'));
        }
    }

    callService() {
        this.cargarStorageData();

        this.listVehiculoModel = [];
        this.requestFilterVehicle.localidadId = this.localidadModel.id;
        console.log('REQUEST::', this.requestFilterVehicle);
        this.accessService.getListVehiclesByLocation(this.requestFilterVehicle)
            .subscribe((resp: ResponseFilterVehicle) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listVehiculoModel = resp.items;
                    }
                }
            });
    }

    createData() {
        localStorage.setItem('vehiculoModel', null);
        this.redirectVehicleCreateEditPage();
    }

    editData(vehiculoModel: VehiculoModel) {
        localStorage.setItem('vehiculoModel', JSON.stringify(vehiculoModel));
        this.redirectVehicleCreateEditPage();
    }

    deleteData(vehiculoModel: VehiculoModel) {

    }

    redirectVehicleCreateEditPage() {
        this.router.navigate(['/location/location_vehicle_create']);
    }

}
