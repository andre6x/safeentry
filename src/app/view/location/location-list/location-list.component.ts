import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {AccessService} from "../../../services/access.service";
import {ModalLoadingService} from "../../../component/modal-loading/modal-loading.service";
import {LocalidadModel} from "../../../model/data/localidad.model";
import {RequestFilterLocation} from "../../../model/request/request-filter-location.model";
import {ResponseFilterPoint} from "../../../model/response/response-filter-point.model";
import {ResponseFilterLocation} from "../../../model/response/response-filter-location.model";
import {PuntoModel} from "../../../model/data/punto.model";
import Utils from "../../../config/utils";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.css'],
    styles: [],
    animations: [
        trigger('rowExpansionTrigger', [
            state('void', style({
                transform: 'translateX(-10%)',
                opacity: 0
            })),
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class LocationListComponent implements OnInit {

    cols: any[];

    userModel: UserModel;
    usuario = '';

    listStatusItem: SelectItem[];

    listLocalidadModel: LocalidadModel[];
    requestFilterLocation: RequestFilterLocation;

    puntoModel: PuntoModel;

    EDIFICIO = 'EDIFICIO';

    public expandedRows = {};
    public isExpanded:boolean = false;

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
            {field: 'nombre', header: 'Residencia', width: '10%'},
            {field: 'tipo', header: 'Tipo', width: '8%'},
            {field: 'metodoNotificacion', header: 'Metodo Notificación', width: '8%'},
            {field: 'direccion', header: 'Residentes', width: '15%'},
            // {field: 'longitud', header: 'Vehiculos', width: '15%'},
            {field: 'estado', header: 'Estado', width: '8%'},
            {field: 'dateCreate', header: 'Creado Por', width: '13%'},
            {field: 'dateUpdate', header: 'Modificado Por', width: '13%'},
        ];

        this.listLocalidadModel = [];

        this.requestFilterLocation = new RequestFilterLocation();
        this.requestFilterLocation.estado = 'ACTIVO';

        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.cargarStorageData();
        this.callService();
    }

    cargarStorageData() {
        this.puntoModel = new PuntoModel();
        if (localStorage.getItem('puntoModel') && JSON.parse(localStorage.getItem('puntoModel')) != null) {
            this.puntoModel = JSON.parse(localStorage.getItem('puntoModel'));
        }
    }

    callService() {
        this.listLocalidadModel = [];

        this.requestFilterLocation.puntoId = this.puntoModel.id;
        console.log('REQUEST::', this.requestFilterLocation);
        this.accessService.getListLocation(this.requestFilterLocation)
            .subscribe((resp: ResponseFilterLocation) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listLocalidadModel = resp.items;
                    }
                }
            });
    }

    expandAll() {
        if (!this.isExpanded) {
            this.listLocalidadModel.forEach(data => {
                this.expandedRows[data.id] = 1;
            });
        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    onRowExpand() {
        console.log("row expanded", Object.keys(this.expandedRows).length);
        /*if(Object.keys(this.expandedRows).length === this.temDataLength){
            this.isExpanded = true;
        }*/
    }
    onRowCollapse() {
        console.log("row collapsed",Object.keys(this.expandedRows).length);
        if(Object.keys(this.expandedRows).length === 0){
            this.isExpanded = false;
        }
    }

    localidadInfo(localidad: LocalidadModel) {
        if (localidad.id === 1790) {
            console.log(localidad);
        }
        return Utils.localidadInfo(localidad);
    }

    createData() {
        localStorage.setItem('localidadModel', null);
        this.redirectClientCreateEditPage();
    }

    editData(localidadModel: LocalidadModel) {
        localStorage.setItem('localidadModel', JSON.stringify(localidadModel));
        this.redirectClientCreateEditPage();
    }

    deleteData(localidadModel: LocalidadModel) {

    }

    redirectBackPage() {
        localStorage.setItem('puntoModel', null);
        localStorage.setItem('localidadModel', null);
        this.router.navigate(['/point/point_list']);
    }

    redirectClientCreateEditPage() {
        this.router.navigate(['/location/location_create']);
    }

}
