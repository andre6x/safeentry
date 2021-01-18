import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {AccessService} from "../../../services/access.service";
import {UsuarioService} from "../../../services/usuario/usuario.service";
import {SelectItem} from "primeng";
import {UserModel} from "../../../model/data/user.model";
import {LocalidadModel} from "../../../model/data/localidad.model";
import Utils from "../../../config/utils";
import {ResponseStatus} from "../../../model/response/response-status.model";
import {PuntoModel} from "../../../model/data/punto.model";
import {ResponseFilterLocation} from "../../../model/response/response-filter-location.model";
import {RequestFilterLocation} from "../../../model/request/request-filter-location.model";
import {LocationResidentListComponent} from "../location-resident-list/location-resident-list.component";
import {LocationVehicleListComponent} from "../location-vehicle-list/location-vehicle-list.component";
import {LocationPhoneListComponent} from "../location-phone-list/location-phone-list.component";
import {LocationBlacklistListComponent} from "../location-blacklist-list/location-blacklist-list.component";
import {LocationPreauthorizationListComponent} from "../location-preauthorization-list/location-preauthorization-list.component";

@Component({
    selector: 'app-location-create',
    templateUrl: './location-create.component.html',
    styleUrls: ['./location-create.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LocationCreateComponent implements OnInit, AfterViewInit {

    userModel: UserModel;
    usuario = '';
    listStatusItem: SelectItem[];

    listTipoItem: SelectItem[];

    puntoModel: PuntoModel;
    localidadModel: LocalidadModel;
    etapaId = 0;

    localidadModelPadre: LocalidadModel;
    listLocalidadModelPadre: LocalidadModel[];
    listLocalidadPadreItem: SelectItem[];
    requestFilterLocation: RequestFilterLocation;

    renderTabs = true;
    disableButton = true;
    RESIDENCIAL = 'RESIDENCIAL';

    etiquetaManzana: object = {"display": ""};
    etiquetaVilla: object = {"display": ""};
    etiquetaDescripcion: object = {"display": ""};
    etiquetaPiso: object = {"display": ""};
    etiquetaDepartamento: object = {"display": ""};
    etiquetaMetoNoti: object = {"display": ""};


    etiquetaAsignarEdificio: object = {"display": ""};

    index = 0;


    @ViewChild('childResident') childResident: LocationResidentListComponent;
    @ViewChild('childVehicle') childVehicle: LocationVehicleListComponent;
    @ViewChild('childPhone') childPhone: LocationPhoneListComponent;
    @ViewChild('childPreauth') childPreauth: LocationPreauthorizationListComponent;
    @ViewChild('childBlacklist') childBlacklist: LocationBlacklistListComponent;

    constructor(public router: Router,
                private accessService: AccessService,
                public usuarioService: UsuarioService) {
        this.userModel = this.usuarioService.userModel;
        if (this.userModel.username) {
            this.usuario = this.userModel.username;
        }
    }

    ngOnInit(): void {
        this.listStatusItem = [];
        this.listStatusItem.push({label: 'Seleccione', value: ''});
        this.listStatusItem.push({label: 'Activo', value: 'ACTIVO'});
        this.listStatusItem.push({label: 'Eliminado', value: 'ELIMINADO'});

        this.listTipoItem = [];
        this.listTipoItem.push({label: 'RESIDENCIAL', value: 'RESIDENCIAL'});
        this.listTipoItem.push({label: 'EDIFICIO', value: 'EDIFICIO'});

        this.requestFilterLocation = new RequestFilterLocation();
        this.requestFilterLocation.estado = 'ACTIVO';

        this.cargarStorageData();
    }


    ngAfterViewInit(): void {
        if (localStorage.getItem('tabLocationIndex') && localStorage.getItem('tabLocationIndex') != null) {
            this.index = Number(localStorage.getItem('tabLocationIndex'));
            console.log('index' + this.index);
            if (this.index > 0) {
                this.callserviceOtherComponent();
            }
        }
    }

    cargarStorageData() {
        this.puntoModel = new PuntoModel();
        if (localStorage.getItem('puntoModel') && JSON.parse(localStorage.getItem('puntoModel')) != null) {
            this.puntoModel = JSON.parse(localStorage.getItem('puntoModel'));
            if (this.puntoModel.listEtapa && this.puntoModel.listEtapa.length > 0 && this.puntoModel.listEtapa[0].id > 0) {
                this.etapaId = this.puntoModel.listEtapa[0].id;
            }
        }


        this.localidadModelPadre = new LocalidadModel();
        this.localidadModel = new LocalidadModel();
        if (localStorage.getItem('localidadModel') && JSON.parse(localStorage.getItem('localidadModel')) != null) {
            this.localidadModel = JSON.parse(localStorage.getItem('localidadModel'));
            if (this.localidadModel.localidadPadre && this.localidadModel.localidadPadre.id > 0) {
                this.localidadModelPadre = this.localidadModel.localidadPadre;
            }
        } else {
            this.localidadModel.estado = Utils.ACTIVO;
            this.localidadModel.metodoNotificacion = 1;
            this.localidadModel.tipo = Utils.RESIDENCIAL;

            this.localidadModelPadre.estado = Utils.ACTIVO;
            this.localidadModel.metodoNotificacion = 1;
            this.localidadModel.tipo = Utils.RESIDENCIAL;
        }
        this.setRenderTabs();
        this.setEtiquetaTipo();
        this.callServiceLocalidadPadre();
    }


    editData(localidadModel: LocalidadModel) {
        localStorage.setItem('localidadModel', JSON.stringify(localidadModel));
    }

    setRenderTabs() {
        if (this.localidadModel.id > 0) {
            this.renderTabs = false;
        } else {
            this.renderTabs = true;
        }
    }

    onTabChange(event) {
        this.index = event.index;
        if (this.localidadModel.id === 0) {
            Utils.swalAlertWarning('Atención', 'Registre la localidad');
        } else  if (this.localidadModel.tipo === 'EDIFICIO') {
            Utils.swalAlertWarning('Atención', 'No disponible para el EDIFICIO');
        } else {
            console.log(this.index);
            localStorage.setItem('tabLocationIndex', this.index + '');
            this.callserviceOtherComponent();
        }
    }


    callserviceOtherComponent() {
        if (this.index === 1) {
            this.childResident.callService();
        } else if (this.index === 2) {
            this.childVehicle.callService();
        } else if (this.index === 3) {
            this.childPhone.callService();
        } else if (this.index === 4) {
            this.childPreauth.callService();
        } else if (this.index === 5) {
            this.childBlacklist.callService();
        }
    }

    onChangeTipo(event) {
        this.setEtiquetaTipo();
    }

    onChangeEdificio(event) {
        this.setEtiquetaTipo();
    }

    setEtiquetaTipo() {
        if (this.localidadModel.tipo === this.RESIDENCIAL) {
            this.etiquetaAsignarEdificio = {"display": ""};

            this.etiquetaManzana = {"display": ""};
            this.etiquetaVilla = {"display": ""};
            this.etiquetaDescripcion = {"display": "none"};
            this.etiquetaPiso = {"display": "none"};
            this.etiquetaDepartamento = {"display": "none"};
            this.etiquetaMetoNoti = {"display": ""};
            if (this.localidadModelPadre && this.localidadModelPadre.id > 0) {
                this.etiquetaManzana = {"display": "none"};
                this.etiquetaVilla = {"display": "none"};
                this.etiquetaDescripcion = {"display": "none"};
                this.etiquetaPiso = {"display": ""};
                this.etiquetaDepartamento = {"display": ""};
                this.etiquetaMetoNoti = {"display": ""};
            }
        } else {
            this.etiquetaAsignarEdificio = {"display": "none"};
            // this.localidadModelPadre = new LocalidadModel();

            this.etiquetaManzana = {"display": ""};
            this.etiquetaVilla = {"display": "none"};
            this.etiquetaDescripcion = {"display": ""};
            this.etiquetaPiso = {"display": "none"};
            this.etiquetaDepartamento = {"display": "none"};
            this.etiquetaMetoNoti = {"display": "none"};
        }
    }

    callServiceLocalidadPadre() {
        this.listLocalidadModelPadre = [];

        this.listLocalidadPadreItem = [];
        this.listLocalidadPadreItem.push({label: 'NO', value: null});

        this.requestFilterLocation.etapaId = this.etapaId;
        console.log('REQUEST::', this.requestFilterLocation);
        this.accessService.getListLocationEdificios(this.requestFilterLocation)
            .subscribe((resp: ResponseFilterLocation) => {
                console.log('RESPONSE::', resp);
                if (resp.code === 200) {
                    if (resp.items) {
                        this.listLocalidadModelPadre = resp.items;
                        this.localidadModelPadre = new LocalidadModel();
                        for (let item of this.listLocalidadModelPadre) {
                            // llenar lista para el spiner
                            this.listLocalidadPadreItem.push({label: Utils.localidadInfo(item), value: item});
                            // seleccionar
                            if (this.localidadModel.localidadPadre && this.localidadModel.localidadPadre.id === item.id) {
                                this.localidadModelPadre = item;
                            }
                        }
                    }
                }
            });
    }

    saveData() {
        this.localidadModel.localidadPadre = this.localidadModelPadre;
        if (this.validarDatos()) {
            this.localidadModel.userCreate = this.usuario;
            this.localidadModel.etapaId = this.etapaId;
            this.localidadModel.puntoId = this.puntoModel.id;
            console.log('REQUEST::', this.localidadModel);
            this.accessService.createOrUpdateLocation(this.localidadModel)
                .subscribe((resp: ResponseStatus) => {
                        console.log('RESPONSE::', resp);
                        if (resp.code === 200) {
                            this.localidadModel.id = resp.idEntity;
                            this.editData(this.localidadModel);
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
        if (this.localidadModel.tipo.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el Tipo.');
            return false;
        } else if (this.localidadModel.metodoNotificacion === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el Metodo de Notificación.');
            return false;
        }

        if (this.localidadModel.tipo === 'EDIFICIO') {
            if (this.localidadModel.manzana.length === 0) {
                Utils.swalAlertWarning('Atención', 'Ingrese la manzana.');
                return false;
            } else if (this.localidadModel.descripcion && this.localidadModel.descripcion.length === 0) {
                Utils.swalAlertWarning('Atención', 'Ingrese el edificio.');
                return false;
            }
        } else if (this.localidadModel.tipo === 'RESIDENCIAL') {
            if (this.localidadModel.localidadPadre && this.localidadModel.localidadPadre.id > 0) {
                if (this.localidadModel.piso.length === 0) {
                    Utils.swalAlertWarning('Atención', 'Ingrese el piso.');
                    return false;
                } else if (this.localidadModel.departamento.length === 0) {
                    Utils.swalAlertWarning('Atención', 'Ingrese el departamento.');
                    return false;
                }
            } else {
                if (this.localidadModel.manzana.length === 0) {
                    Utils.swalAlertWarning('Atención', 'Ingrese la manzana.');
                    return false;
                } else if (this.localidadModel.villa.length === 0) {
                    Utils.swalAlertWarning('Atención', 'Ingrese la villa.');
                    return false;
                }
            }
        }
        if (this.localidadModel.estado.length === 0) {
            Utils.swalAlertWarning('Atención', 'Ingrese el estado.');
            return false;
        }
        return true;
    }

    localidadInfo(localidad: LocalidadModel) {
        return Utils.localidadInfo(localidad);
    }

    redirectBackPage() {
        localStorage.setItem('tabLocationIndex', '0');
        localStorage.setItem('localidadModel', null);
        this.router.navigate(['/location/location_list']);
    }

}
