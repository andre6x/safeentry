import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {Router} from "@angular/router";
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {EmpresaModel} from "../../../model/data/empresa.model";
import {AccessService} from "../../../services/access.service";
import {ResponseStatus} from "../../../model/response/response-status.model";
import Utils from "../../../config/utils";
import {ResponseFilterClient} from "../../../model/response/response-filter-client.model";
import {RequestFilterClient} from "../../../model/request/request-filter-client.model";

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[];

    empresaModel: EmpresaModel;


    constructor(public router: Router,
                private accessService: AccessService,
                public usuarioService: UsuarioService) {
        this.userModel = this.usuarioService.userModel;
        if (this.userModel.username) {
            this.usuario = this.userModel.username;
        }
    }

    ngOnInit(): void {
        this.empresaModel = new EmpresaModel();
        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Seleccione', value: ''});
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.cargarStorageData();
    }

    cargarStorageData() {
        this.empresaModel = new EmpresaModel();
        if (localStorage.getItem('empresaModel') && JSON.parse(localStorage.getItem('empresaModel')) != null) {
            this.empresaModel = JSON.parse(localStorage.getItem('empresaModel'));
        } else {
            this.empresaModel.estado = 'ACTIVO';
        }
    }

    saveData() {
        if (this.validarDatos()) {
            this.empresaModel.userCreate = this.usuario;
            console.log('REQUEST::', this.empresaModel);
            this.accessService.createOrUpdateClient(this.empresaModel)
                .subscribe((resp: ResponseStatus) => {
                        console.log('RESPONSE::', resp);
                        if (resp.code === 200) {
                            this.empresaModel.id = resp.idEntity;
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
        if (this.empresaModel.ruc.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el ruc.');
            return false;
        } else if (this.empresaModel.nombre.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el nombre.');
            return false;
        } else if (this.empresaModel.direccion.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese la dirección.');
            return false;
        } else if (this.empresaModel.estado.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el estado.');
            return false;
        }
        return true;
    }

    redirectBackPage() {
        localStorage.setItem('empresaModel', null);
        this.router.navigate(['/client/client_list']);
    }

}
