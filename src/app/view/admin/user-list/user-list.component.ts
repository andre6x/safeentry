import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {RequestFilterRol} from "../../../model/request/request-filter-rol.model";
import {Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {AccessService} from "../../../services/access.service";
import {ModalLoadingService} from "../../../component/modal-loading/modal-loading.service";
import {ResponseFilterUser} from "../../../model/response/response-filter-user.model";
import {RequestFilterUser} from "../../../model/request/request-filter-user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    cols: any[];

    userModel: UserModel;
    usuario = '';

    listStatusItem: SelectItem[];

    listUserModel: UserModel[];

    requestFilterUser: RequestFilterUser;

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
            {field: 'userName', header: 'Usuario'},
            {field: 'email', header: 'Email'},
            {field: 'persona.apellidos', header: 'Nombres'},
            {field: 'persona.identificacion', header: 'Identificación'},
            {field: 'estado', header: 'Estado'},
            {field: 'dateCreate', header: 'Creado Por'},
            {field: 'dateUpdate', header: 'Modificado Por'},
        ];

        this.listUserModel = [];

        this.requestFilterUser = new RequestFilterUser();
        this.requestFilterUser.estado = 'ACTIVO';

        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Inactivo', value: 'INACTIVO'});

        this.callService();
    }

    callService() {
        this.listUserModel = [];
        console.log('REQUEST::', this.requestFilterUser);
        this.accessService.getListUser(this.requestFilterUser)
            .subscribe((resp: ResponseFilterUser) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listUserModel = resp.items;
                    }
                }
            });
    }

    createData() {
        localStorage.setItem('userModel', null);
        this.redirectCreateEditPage();
    }

    editData(userModel: UserModel) {
        localStorage.setItem('userModel', JSON.stringify(userModel));
        this.redirectCreateEditPage();
    }

    deleteData(rolModel: UserModel) {

    }

    redirectCreateEditPage() {
        this.router.navigate(['/admin/user_create']);
    }

}

