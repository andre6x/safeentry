import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {Router} from "@angular/router";
import {AccessService} from "../../../services/access.service";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {PuntoModel} from "../../../model/data/punto.model";
import Utils from "../../../config/utils";
import {ResponseStatus} from "../../../model/response/response-status.model";
import {RequestFilterClient} from "../../../model/request/request-filter-client.model";
import {ResponseFilterClient} from "../../../model/response/response-filter-client.model";
import {EmpresaModel} from "../../../model/data/empresa.model";

@Component({
    selector: 'app-point-create',
    templateUrl: './point-create.component.html',
    styleUrls: ['./point-create.component.css']
})
export class PointCreateComponent implements OnInit {

    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[];
    listTypeItem: SelectItem[];

    puntoModel: PuntoModel;

    listClientItem: SelectItem[];

    requestFilterClient: RequestFilterClient;
    listEmpresaModel: EmpresaModel[];
    selectEmpresaModel: EmpresaModel;

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
        this.listTypeItem.push({label: 'Empresarial', value: 'EMPRESARIAL'});
        this.listTypeItem.push({label: 'Residencial', value: 'RESIDENCIAL'});

        this.cargarStorageData();
        this.callServiceClient();
    }

    cargarStorageData() {
        this.puntoModel = new PuntoModel();
        if (localStorage.getItem('puntoModel') && JSON.parse(localStorage.getItem('puntoModel')) != null) {
            this.puntoModel = JSON.parse(localStorage.getItem('puntoModel'));
            if (this.puntoModel.empresa && this.puntoModel.empresa.id > 0) {
                // ok
            } else {
                this.puntoModel.empresa = new EmpresaModel();
            }
        } else {
            this.puntoModel.estado = 'ACTIVO';
            this.puntoModel.empresa = new EmpresaModel();
        }
    }

    callServiceClient() {
        this.requestFilterClient = new RequestFilterClient();
        this.requestFilterClient.estado = 'ACTIVO';
        this.listEmpresaModel = [];
        this.listClientItem = [];
        this.listClientItem.push({label: 'Seleccione', value: null});

        this.selectEmpresaModel = new EmpresaModel();

        console.log('REQUEST::', this.requestFilterClient);
        this.accessService.getListClients(this.requestFilterClient)
            .subscribe((resp: ResponseFilterClient) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listEmpresaModel = resp.items;
                        for (let item of this.listEmpresaModel) {
                            this.listClientItem.push({label: item.nombre, value: item});
                            if (this.puntoModel.empresa && (this.puntoModel.empresa.id === item.id)) {
                                this.selectEmpresaModel = item;
                            }
                        }
                    }
                }
            });
    }

    saveData() {
        if (this.validarDatos()) {
            this.puntoModel.userCreate = this.usuario;
            console.log('REQUEST::', this.puntoModel);
            this.accessService.createOrUpdatePoint(this.puntoModel)
                .subscribe((resp: ResponseStatus) => {
                        console.log('RESPONSE::', resp);
                        if (resp.code === 200) {
                            this.puntoModel.id = resp.idEntity;
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
        if (this.puntoModel.nombre.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el nombre.');
            return false;
        } else if (this.selectEmpresaModel.id === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el cliente.');
            return false;
        } else if (this.puntoModel.tipo.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el tipo.');
            return false;
        } else if (this.puntoModel.direccion.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese la dirección.');
            return false;
        } else if (this.puntoModel.estado.length === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el estado.');
            return false;
        } else if (this.puntoModel.empresa.id === 0) {
            Utils.swalAlertWarning('Atención', 'Seleccione el cliente.');
            return false;
        }

        return true;
    }

    redirectBackPage() {
        localStorage.setItem('puntoModel', null);
        this.router.navigate(['/point/point_list']);
    }


}
