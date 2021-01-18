import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {DashboardBankingComponent} from './demo/view/dashboardbanking.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {AppWizardComponent} from './pages/app.wizard.component';
import {LoginGuardGuard} from './services/guards/login-guard.guard';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {AccessListComponent} from './view/access/access-list/access-list.component';
import {ClientListComponent} from "./view/client/client-list/client-list.component";
import {ClientCreateComponent} from "./view/client/client-create/client-create.component";
import {PointListComponent} from "./view/point/point-list/point-list.component";
import {PointCreateComponent} from "./view/point/point-create/point-create.component";
import {LocationListComponent} from "./view/location/location-list/location-list.component";
import {LocationCreateComponent} from "./view/location/location-create/location-create.component";
import {LocationResidentCreateComponent} from "./view/location/location-resident-create/location-resident-create.component";
import {LocationVehicleCreateComponent} from "./view/location/location-vehicle-create/location-vehicle-create.component";
import {LocationPreauthorizationCreateComponent} from "./view/location/location-preauthorization-create/location-preauthorization-create.component";
import {LocationPhoneCreateComponent} from "./view/location/location-phone-create/location-phone-create.component";
import {LocationBlacklistCreateComponent} from "./view/location/location-blacklist-create/location-blacklist-create.component";
import {RolListComponent} from "./view/admin/rol-list/rol-list.component";
import {RolCreateComponent} from "./view/admin/rol-create/rol-create.component";
import {UserListComponent} from "./view/admin/user-list/user-list.component";
import {UserCreateComponent} from "./view/admin/user-create/user-create.component";

export const routes: Routes = [
    {
        path: '', component: AppMainComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: '', component: DashboardComponent},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'access/access_list', component: AccessListComponent},
            {path: 'client/client_list', component: ClientListComponent},
            {path: 'client/client_create', component: ClientCreateComponent},
            {path: 'point/point_list', component: PointListComponent},
            {path: 'point/point_create', component: PointCreateComponent},
            {path: 'location/location_list', component: LocationListComponent},
            {path: 'location/location_create', component: LocationCreateComponent},
            {path: 'location/location_resident_create', component: LocationResidentCreateComponent},
            {path: 'location/location_vehicle_create', component: LocationVehicleCreateComponent},
            {path: 'location/location_preauthorization_create', component: LocationPreauthorizationCreateComponent},
            {path: 'location/location_phone_create', component: LocationPhoneCreateComponent},
            {path: 'location/location_blacklist_create', component: LocationBlacklistCreateComponent},
            {path: 'admin/rol_list', component: RolListComponent},
            {path: 'admin/rol_create', component: RolCreateComponent},
            {path: 'admin/user_list', component: UserListComponent},
            {path: 'admin/user_create', component: UserCreateComponent},
            {path: 'pages/empty', component: EmptyDemoComponent}
            /*{path: 'dashboards/generic', component: DashboardDemoComponent},
            {path: 'dashboards/dashboard_banking', component: DashboardBankingComponent},
            {path: 'components/sample', component: SampleDemoComponent},
            {path: 'components/forms', component: FormsDemoComponent},
            {path: 'components/data', component: DataDemoComponent},
            {path: 'components/panels', component: PanelsDemoComponent},
            {path: 'components/overlays', component: OverlaysDemoComponent},
            {path: 'components/menus', component: MenusDemoComponent},
            {path: 'components/messages', component: MessagesDemoComponent},
            {path: 'components/misc', component: MiscDemoComponent},
            {path: 'components/charts', component: ChartsDemoComponent},
            {path: 'components/file', component: FileDemoComponent},
            {path: 'documentation', component: DocumentationComponent},
            {path: 'pages/invoice', component: AppInvoiceComponent},
            {path: 'pages/help', component: AppHelpComponent}*/
        ]
    },
    {path: 'error', component: AppErrorComponent},
    {path: 'accessdenied', component: AppAccessdeniedComponent},
    {path: 'notfound', component: AppNotfoundComponent},
    {path: 'login', component: AppLoginComponent},
    {path: 'wizard', component: AppWizardComponent},
    {path: '**', redirectTo: '/notfound'},

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', useHash: false});
