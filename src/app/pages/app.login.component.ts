import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestUser} from '../model/request/request-user.model';
import {UsuarioService} from '../services/usuario/usuario.service';
import {RequestCode} from '../model/request/request-code.model';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    styles: [`
        /* Table */
        .login-body {
            overflow: hidden;
            margin: 0 auto;
            position: relative;
            height: 100%;
        }
        .login-body .login-image {
            height: calc(100vh - 380px);
            background: url("assets/layout/images/login/bg-login.jpg") no-repeat;
            background-size: cover;
            background-position: center;
        }
        @media screen and (min-width: 40.063em) {
            .login-body .login-image {
                height: calc(100vh - 380px);
                background: url("assets/layout/images/login/bg-login.jpg") no-repeat;
                background-size: cover;
                background-position: center;
            }
            .login-body .login-panel {
                width: 100%;
                height: 380px;
                position: absolute;
                margin-bottom: 0;
                border-radius: 0;
                bottom: 0;
                text-align: center;
                background-color: #292b2c;
            }

            .login-body .login-panel .login-panel-content {
                width: 400px;
                position: relative;
                margin-left: -200px;
                top: 30px;
                left: 50%;
                color: #ffffff;
            }
        }
        @media screen and (min-width: 64.063em) {
            .login-body .login-image {
                height: 100vh;
                background: url("assets/layout/images/login/bg-login.jpg") no-repeat;
                background-size: cover;
                background-position: center;
            }
            .login-body .login-panel {
                width: 100%;
                height: 100vh;
                margin-top: 0;
                border-radius: 0;
                text-align: center;
                background-color: #292b2c;
                position: static;
                display: flex;
                align-items: center;
            }

            .login-body .login-panel .login-panel-content {
                width: 100%;
                position: static;
                margin-left: 0;
                color: #ffffff;
            }
        }
    `],
})
export class AppLoginComponent implements OnInit, OnDestroy {

    user: string;
    sub: Subscription;
    public codigoAcceso: string;

    constructor(public activatedRoute: ActivatedRoute, public router: Router, public usuarioService: UsuarioService) {
    }

    ngOnInit() {
        // si no tiene nada coloca ''
        this.user = localStorage.getItem('user') || '';
        if (this.user.length > 1) {
        }

        this.sub = this.activatedRoute
            .queryParams
            .subscribe(params => {
                // tslint:disable-next-line:prefer-const
                let termino = params['session'] || '';
                if (termino.length > 0) {
                    this.ingresarSession(termino);
                }
            });
    }

    ingresarSession(termino: string) {
        console.log('LoginComponent', termino);
        /* const requestSession = new RequestSession(termino);
         this._usuarioService.loginSession(requestSession)
             .subscribe(resp => {
                 // console.log(resp);
                 if (resp) {
                      this.rediectPageQuiz();
                 }
             });*/
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    ingresar(forma: NgForm) {
        if (forma.invalid) {
            return;
        }
        const requestUser = new RequestUser(forma.value.user, forma.value.password);
        this.usuarioService.login(requestUser, forma.value.recuerdame)
            .subscribe(resp => {
                // console.log(resp);
                if (resp) {
                    this.rediectPageAccess();
                }
            });
    }

    rediectPageAccess() {
        this.router.navigate(['/access/access_list']);
    }

}
