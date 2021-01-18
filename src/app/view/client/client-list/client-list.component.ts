import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {AccessService} from "../../../services/access.service";
import {ModalLoadingService} from "../../../component/modal-loading/modal-loading.service";
import {UserModel} from "../../../model/data/user.model";
import {SelectItem} from "primeng";
import {EmpresaModel} from "../../../model/data/empresa.model";
import {RequestFilterClient} from "../../../model/request/request-filter-client.model";
import {ResponseFilterClient} from "../../../model/response/response-filter-client.model";

@Component({
    selector: 'app-client-list',
    templateUrl: './client-list.component.html',
    styleUrls: ['./client-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ClientListComponent implements OnInit {

    cols: any[];

    userModel: UserModel;
    usuario = '';

    listStatusItem: SelectItem[];

    listEmpresaModel: EmpresaModel[];

    requestFilterClient: RequestFilterClient;

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
            {field: 'ruc', header: 'Ruc'},
            {field: 'nombre', header: 'Nombre'},
            {field: 'direccion', header: 'direccion'},
            {field: 'nemonicoSgi', header: 'Nemonico SGI'},
            {field: 'estado', header: 'Estado'},
            {field: 'dateCreate', header: 'Creado Por'},
            {field: 'dateUpdate', header: 'Modificado Por'},
        ];

        this.listEmpresaModel = [];

        this.requestFilterClient = new RequestFilterClient();
        this.requestFilterClient.estado = 'ACTIVO';

        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.callService();
    }

    callService() {
        this.listEmpresaModel = [];
        console.log('REQUEST::', this.requestFilterClient);
        this.accessService.getListClients(this.requestFilterClient)
            .subscribe((resp: ResponseFilterClient) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listEmpresaModel = resp.items;
                    }
                }
            });
    }

    createData() {
        localStorage.setItem('empresaModel', null);
        this.redirectClientCreateEditPage();
    }

    editData(empresaModel: EmpresaModel) {
        localStorage.setItem('empresaModel', JSON.stringify(empresaModel));
        this.redirectClientCreateEditPage();
    }

    deleteData(empresaModel: EmpresaModel) {

    }

    redirectClientCreateEditPage() {
        this.router.navigate(['/client/client_create']);
    }

}
