import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
// string url
import {URL_SERVICIOS, MSJ_ERROR_METODO} from '../../config/config';
// observables
import {Observable, of, Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import {RequestUser} from '../../model/request/request-user.model';
import {ResponseLogin} from '../../model/response/response-login.model';
import {UserModel} from '../../model/data/user.model';
import {ModalLoadingService} from '../../component/modal-loading/modal-loading.service';
import Utils from '../../config/utils';


@Injectable()
export class UsuarioService {

    userModel: UserModel;
    token: string;
    public cdn: string;
    public display: boolean;

    USUARIO_STORAGE = 'USUARIO_SE';
    TOKEN_STORAGE = 'TOKEN_SE';
    CDN_STORAGE = 'CDN_SE';
    RECORDAR_STORAGE = 'RECORDAR_SE';

    constructor(public http: HttpClient,
                public router: Router,
                public _modalLoadingService: ModalLoadingService) {
        this.cargarStorage();
    }

    showDialog() {
        this.display = true;
    }

    dismissDialog() {
        this.display = false;
    }

    estaLogeado() {
        return ( this.token.length > 1 ) ? true : false;
    }

    cargarStorage() {
        if (localStorage.getItem(this.TOKEN_STORAGE)) {
            this.token = localStorage.getItem(this.TOKEN_STORAGE);
            this.cdn = localStorage.getItem(this.CDN_STORAGE);
            this.userModel = JSON.parse(localStorage.getItem(this.USUARIO_STORAGE));
        } else {
            this.token = '';
            this.userModel = null;
        }
    }

    guardarStorage(token: string, cdn: string, userModel: UserModel) {
        localStorage.setItem(this.TOKEN_STORAGE, token);
        localStorage.setItem(this.CDN_STORAGE, cdn);
        localStorage.setItem(this.USUARIO_STORAGE, JSON.stringify(userModel));
        // user
        this.token = token;
        this.userModel = userModel;
    }

    guardarStorageRecuerdame(recordar: boolean, nameUser: string) {
        if (recordar) {
            localStorage.setItem(this.RECORDAR_STORAGE, nameUser);
        } else {
            localStorage.removeItem(this.RECORDAR_STORAGE);
        }
    }

    logout() {
        // encerar datos
        this.token = '';
        this.cdn = '';
        this.userModel = null;
        localStorage.removeItem(this.TOKEN_STORAGE);
        localStorage.removeItem(this.USUARIO_STORAGE);
        localStorage.removeItem(this.RECORDAR_STORAGE);
        localStorage.removeItem(this.CDN_STORAGE);
        // redirecionar a pagina login
        this.router.navigate(['/login']);
    }

    login(requestUser: RequestUser, recordar: boolean = false) {

        // show dialog
        this.showDialog();
        // uri login
        const url = URL_SERVICIOS + 'find/usuario/loginWeb';
        // recordar
        this.guardarStorageRecuerdame(recordar, requestUser.usuario);
        // call post
        return this.http.post(url, requestUser)
            .map((response: ResponseLogin) => {
                this.dismissDialog();
                console.log('RESPONSE: ', response);
                if (response.success) {
                    this.token = 'TOKENDUMMY';
                    this.guardarStorage(this.token, '', response.usuarioModel);

                    return true;
                } else {
                    Utils.swalAlertWarning(Utils.ATENCION, response.message);
                    return false;
                }
            }).catch(err => {
                this.dismissDialog();
                Utils.swalAlertError('Error en el login', MSJ_ERROR_METODO);
                return Observable.throw(err);
            });
    }

}
