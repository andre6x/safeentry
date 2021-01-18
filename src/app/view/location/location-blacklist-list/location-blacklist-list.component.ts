import {Component, OnInit} from '@angular/core';
import {LocalidadModel} from "../../../model/data/localidad.model";
import {SelectItem} from "primeng";
import {UserModel} from "../../../model/data/user.model";
import {Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {AccessService} from "../../../services/access.service";
import {ModalLoadingService} from "../../../component/modal-loading/modal-loading.service";
import {RequestFilterBlackList} from "../../../model/request/request-filter-black-list.model";
import {BlackListModel} from "../../../model/data/black-list.model";
import {ResponseFilterBlacklist} from "../../../model/response/response-filter-blacklist.model";

@Component({
    selector: 'app-location-blacklist-list',
    templateUrl: './location-blacklist-list.component.html',
    styleUrls: ['./location-blacklist-list.component.css']
})
export class LocationBlacklistListComponent implements OnInit {

    cols: any[];
    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[] = [];

    localidadModel: LocalidadModel;
    requestFilterBlackList: RequestFilterBlackList;
    listBlackListModel: BlackListModel[] = [];

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
            {field: 'valor', header: 'Valor', width: '8%'},
            {field: 'descripcion', header: 'Nombre', width: '15%'},
            {field: 'estado', header: 'Estado', width: '8%'},
            {field: 'dateCreate', header: 'Creado Por', width: '13%'},
            {field: 'dateUpdate', header: 'Modificado Por', width: '13%'},
        ];

        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.requestFilterBlackList = new RequestFilterBlackList();
        this.requestFilterBlackList.estado = 'Activo';
    }

    cargarStorageData() {
        this.localidadModel = new LocalidadModel();
        if (localStorage.getItem('localidadModel') && JSON.parse(localStorage.getItem('localidadModel')) != null) {
            this.localidadModel = JSON.parse(localStorage.getItem('localidadModel'));
        }
    }

    loadPhoto(blackListModel: BlackListModel) {
        if (blackListModel.urlFoto.length > 0) {
            return this.cdn + blackListModel.urlFoto;
        } else {
            return 'assets/layout/images/icons/usuario.png';
        }
    }

    callService() {
        this.cargarStorageData();

        this.listBlackListModel = [];
        this.requestFilterBlackList.localidadId = this.localidadModel.id;
        console.log('REQUEST::', this.requestFilterBlackList);
        this.accessService.getListBlacklistByLocation(this.requestFilterBlackList)
            .subscribe((resp: ResponseFilterBlacklist) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listBlackListModel = resp.items;
                    }
                    if (resp.summary) {
                        this.cdn = resp.summary.cdn;
                    }
                }
            });
    }

    createData() {
        localStorage.setItem('blackListModel', null);
        this.redirectBlackListCreateEditPage();
    }

    editData(blackListModel: BlackListModel) {
        localStorage.setItem('blackListModel', JSON.stringify(blackListModel));
        this.redirectBlackListCreateEditPage();
    }

    deleteData(blackListModel: BlackListModel) {

    }

    redirectBlackListCreateEditPage() {
        this.router.navigate(['/location/location_blacklist_create']);
    }

}
