import {Component, OnInit} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import {UsuarioService} from './services/usuario/usuario.service';
import {UserModel} from './model/data/user.model';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="profile" [ngClass]="{'profile-expanded':active}">
            <a href="#" (click)="onClick($event)">
                <img class="profile-image" src="assets/layout/images/logo-icon.png"/>
                <span class="profile-name" style="font-size: 12px;">{{userModel.email}}</span>
                <i class="fa fa-fw fa-caret-down"></i>
                <span class="profile-role">{{rolName}}</span>
            </a>
        </div>

        <ul id="profile-menu" class="layout-menu" [@menu]="active ? 'visible' : 'hidden'">
            <li role="menuitem" style="display: none;">
                <a href="#" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-user"></i>
                    <span>Profile</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Profile</div>
                </div>
            </li>
            <li role="menuitem" style="display: none;">
                <a href="#" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-user-secret"></i>
                    <span>Privacy</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Privacy</div>
                </div>
            </li>
            <li role="menuitem" style="display: none;">
                <a href="#" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-cog"></i>
                    <span>Settings</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Settings</div>
                </div>
            </li>
            <li role="menuitem">
                <a (click)="usuarioService.logout()" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-sign-out"></i>
                    <span>Cerrar sesión</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Logout</div>
                </div>
            </li>
        </ul>
    `,
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppProfileComponent implements OnInit {

    active: boolean = true;
    userModel: UserModel;
    rolName: string = '';

    constructor(public usuarioService: UsuarioService) {

    }

    ngOnInit() {
        this.userModel = this.usuarioService.userModel;
        if (this.userModel.rol) {
            this.rolName = this.userModel.rol.nombre;
        }
    }

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
}
