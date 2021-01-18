import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
    <ul class="layout-menu layout-main-menu clearfix">
        <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
    </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            // {label: 'Dashboard', icon: 'fa fa-fw fa-dashboard', routerLink: ['/dashboard']},
            {label: 'Clientes', icon: 'fa fa-fw fa-dashboard', routerLink: ['/client/client_list']},
            {label: 'Puntos', icon: 'fa fa-fw fa-dashboard', routerLink: ['/point/point_list']},
            {label: 'Accesos', icon: 'fa fa-fw fa-list-alt', routerLink: ['/access/access_list']},
            {label: 'Estadisticas', icon: 'fa fa-fw fa-list-alt', routerLink: ['/access/access_list']},
            {label: 'Administración', icon: 'fa fa-fw fa-dashboard', routerLink: ['/dashboards'],
                items: [
                    {label: 'Rol', icon: 'fa fa-fw fa-home', routerLink: ['/admin/rol_list']},
                    {label: 'Usuarios', icon: 'fa fa-fw fa-bank', routerLink: ['/admin/user_list']},
                    {label: 'Configuración', icon: 'fa fa-fw fa-bank', routerLink: ['/dashboards/dashboard_banking']},
                ]
            },
            /*{
                label: 'Components', icon: 'fa fa-fw fa-sitemap', routerLink: ['/components'],
                items: [
                    {label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/components/sample']},
                    {label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/components/forms']},
                    {label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/components/data']},
                    {label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/components/panels']},
                    {label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/components/overlays']},
                    {label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/components/menus']},
                    {label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/components/messages']},
                    {label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/components/charts']},
                    {label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/components/file']},
                    {label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/components/misc']}
                ]
            },
            {
                label: 'Template Pages', icon: 'fa fa-fw fa-life-saver', routerLink: ['/pages'],
                items: [
                    {label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/pages/empty']},
                    {label: 'Invoice', icon: 'fa fa-fw fa-list-alt', routerLink: ['/pages/invoice']},
                    {label: 'Help Page', icon: 'fa fa-fw fa-question-circle', routerLink: ['/pages/help']},
                    {label: 'Wizard', icon: 'fa fa-fw fa-star', routerLink: ['/wizard']},
                    {label: 'Landing Page', icon: 'fa fa-fw fa-certificate', url: 'assets/pages/landing.html', target: '_blank'},
                    {label: 'Login Page', icon: 'fa fa-fw fa-sign-in', routerLink: ['/login'], target: '_blank'},
                    {label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', routerLink: ['/error'], target: '_blank'},
                    {label: 'Not Found Page', icon: 'fa fa-fw fa-times', routerLink: ['/notfound'], target: '_blank'},
                    {label: 'Access Denied Page', icon: 'fa fa-fw fa-exclamation-triangle',
                        routerLink: ['/accessdenied'], target: '_blank'}
                ]
            },
            {
                label: 'Menu Hierarchy', icon: 'fa fa-fw fa-gg',
                items: [
                    {
                        label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in'},
                                    {label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in'}
                                ]
                            },
                        ]
                    }
                ]
            },
            {label: 'Utils', icon: 'fa fa-fw fa-wrench', routerLink: ['/utils']},
            {label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: ['/documentation']}
            */
        ];
    }
}
