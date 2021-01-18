import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {AccessService} from "../../../services/access.service";
import {ModalLoadingService} from "../../../component/modal-loading/modal-loading.service";
import {RequestFilterRol} from "../../../model/request/request-filter-rol.model";
import {ResponseFilterPoint} from "../../../model/response/response-filter-point.model";
import {ResponseFilterRol} from "../../../model/response/response-filter-rol.model";
import {RolModel} from "../../../model/data/rol.model";

@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.css']
})
export class RolListComponent implements OnInit {

    cols: any[];

    userModel: UserModel;
    usuario = '';

    listStatusItem: SelectItem[];

    listRolModel: RolModel[];

    requestFilterRol: RequestFilterRol;

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
            {field: 'nombre', header: 'Nombre'},
            {field: 'pathRol', header: 'Path Rol'},
            {field: 'estado', header: 'Estado'},
            {field: 'dateCreate', header: 'Creado Por'},
            {field: 'dateUpdate', header: 'Modificado Por'},
        ];

        this.listRolModel = [];

        this.requestFilterRol = new RequestFilterRol();
        this.requestFilterRol.estado = 'ACTIVO';

        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Inactivo', value: 'INACTIVO'});

        this.callService();
    }

    callService() {
        this.listRolModel = [];
        console.log('REQUEST::', this.requestFilterRol);
        this.accessService.getListRol(this.requestFilterRol)
            .subscribe((resp: ResponseFilterRol) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listRolModel = resp.items;
                    }
                }
            });
    }

    createData() {
        localStorage.setItem('rolModel', null);
        this.redirectCreateEditPage();
    }

    editData(rolModel: RolModel) {
        localStorage.setItem('rolModel', JSON.stringify(rolModel));
        this.redirectCreateEditPage();
    }

    deleteData(rolModel: RolModel) {

    }

    redirectCreateEditPage() {
        this.router.navigate(['/admin/rol_create']);
    }

}
