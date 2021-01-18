import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {RolModel} from "../../../model/data/rol.model";
import {Router} from "@angular/router";
import {AccessService} from "../../../services/access.service";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import Utils from "../../../config/utils";
import {ResponseStatus} from "../../../model/response/response-status.model";

@Component({
  selector: 'app-rol-create',
  templateUrl: './rol-create.component.html',
  styleUrls: ['./rol-create.component.css']
})
export class RolCreateComponent implements OnInit {

    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[];

    rolModel: RolModel;

    constructor(public router: Router,
                private accessService: AccessService,
                public usuarioService: UsuarioService) {
        this.userModel = this.usuarioService.userModel;
        if (this.userModel.username) {
            this.usuario = this.userModel.username;
        }
    }

    ngOnInit(): void {
        this.rolModel = new RolModel();
        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Seleccione', value: ''});
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Inactivo', value: 'INACTIVO'});

        this.cargarStorageData();
    }

    cargarStorageData() {
        this.rolModel = new RolModel();
        if (localStorage.getItem('rolModel') && JSON.parse(localStorage.getItem('rolModel')) != null) {
            this.rolModel = JSON.parse(localStorage.getItem('rolModel'));
        } else {
            this.rolModel.estado = 'ACTIVO';
        }
    }

    saveData() {
        if (this.validarDatos()) {
            this.rolModel.userCreate = this.usuario;
            console.log('REQUEST::', this.rolModel);
            this.accessService.createOrUpdateRol(this.rolModel)
                .subscribe((resp: ResponseStatus) => {
                        console.log('RESPONSE::', resp);
                        if (resp.code === 200) {
                            this.rolModel.id = resp.idEntity;
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
        if (this.rolModel.nombre.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el nombre.');
            return false;
        } else if (this.rolModel.pathRol.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese path rol.');
            return false;
        } else if (this.rolModel.estado.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el estado.');
            return false;
        }
        return true;
    }

    redirectBackPage() {
        localStorage.setItem('rolModel', null);
        this.router.navigate(['/admin/rol_list']);
    }


}

