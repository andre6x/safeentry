import { Injectable } from '@angular/core';
import {RequestFilterPoint} from '../model/request/request-filter-point.model';
import {HttpClient} from '@angular/common/http';
import {ModalLoadingService} from '../component/modal-loading/modal-loading.service';
import {MSJ_ERROR_METODO, URL_SERVICIOS} from '../config/config';
import Utils from '../config/utils';

import {Observable, of, Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import {RequestFilterVisit} from '../model/request/request-filter-visit.model';
import {EmpresaModel} from '../model/data/empresa.model';
import {PuntoModel} from "../model/data/punto.model";
import {RequestFilterLocation} from "../model/request/request-filter-location.model";
import {LocalidadModel} from "../model/data/localidad.model";
import {RequestFilterResident} from "../model/request/request-filter-resident.model";
import {RequestFilterPhoneContact} from "../model/request/request-filter-phone-contact.model";
import {RequestFilterVehicle} from "../model/request/request-filter-vehicle.model";
import {RequestFilterPreauthorization} from "../model/request/request-filter-preauthorization.model";
import {RequestFilterBlackList} from "../model/request/request-filter-black-list.model";
import {TelefonoContactoModel} from "../model/data/telefono-contacto.model";
import {VehiculoModel} from "../model/data/vehiculo.model";
import {PreautorizacionModel} from "../model/data/preautorizacion.model";
import {BlackListModel} from "../model/data/black-list.model";
import {ResidenteModel} from "../model/data/residente.model";
import {RequestCalculateDate} from "../model/request/request-calculate-date.model";
import {RequestFilterRol} from "../model/request/request-filter-rol.model";
import {RolModel} from "../model/data/rol.model";
import {RequestFilterUser} from "../model/request/request-filter-user.model";

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(public http: HttpClient, public modalLoadingService: ModalLoadingService) { }

    /*********************************************************************************************
     * PUNTOS
     *********************************************************************************************/
    getListPoints(request: RequestFilterPoint) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/punto/byFilterSearch';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    createOrUpdatePoint(request: PuntoModel) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'registro/edicion/punto';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    /*********************************************************************************************
     * VISITAS
     *********************************************************************************************/
    getListVisit(request: RequestFilterVisit) {

        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/visitaPunto';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    /*********************************************************************************************
     * CLIENTES
     *********************************************************************************************/
    getListClients(request: RequestFilterPoint) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/empresa/byFilterSearch';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    createOrUpdateClient(request: EmpresaModel) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'registro/edicion/empresa';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    /*********************************************************************************************
     * LOCALIDADES
     *********************************************************************************************/
    getListLocation(request: RequestFilterLocation) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/localidad/filterSearch';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    getListLocationEdificios(request: RequestFilterLocation) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/localidad/edificiosPadre';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    createOrUpdateLocation(request: LocalidadModel) {
        this.modalLoadingService.showDialog();
        // uri
        const url = URL_SERVICIOS + 'registro/edicion/localidad';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissDialog();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissDialog();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    /*********************************************************************************************
     * PERSONAS
     *********************************************************************************************/
    getListPersonsByLocation(request: RequestFilterResident) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/personaLocalidad/byLocalidadId/filter';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    createOrUpdateResident(formData: FormData) {
        this.modalLoadingService.showDialog();
        // uri
        const url = URL_SERVICIOS + 'registro/edicion/personaLocalidad/multipart';
        // headers
        const options = {} as any; // Set any options you like
        // call post
        return this.http.post(url, formData, options)
            .map((resp: any) => {
                this.modalLoadingService.dismissDialog();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissDialog();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    /*********************************************************************************************
     * VEHICULOS
     *********************************************************************************************/
    getListVehiclesByLocation(request: RequestFilterVehicle) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/vehiculo/byLocalidadId/filter';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    createOrUpdateVehicle(request: VehiculoModel) {
        this.modalLoadingService.showDialog();
        // uri
        const url = URL_SERVICIOS + 'registro/edicion/vehiculoResidente';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissDialog();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissDialog();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    /*********************************************************************************************
     * TELEFONOS
     *********************************************************************************************/
    getListPhonesByLocation(request: RequestFilterPhoneContact) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/telefonoContacto/byLocalidadId/filter';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    createOrUpdatePhones(formData: FormData) {
        this.modalLoadingService.showDialog();
        // uri
        const url = URL_SERVICIOS + 'registro/edicion/telefonoContacto/multipart';
        // headers
        const options = {} as any; // Set any options you like
        // call post
        return this.http.post(url, formData, options)
            .map((resp: any) => {
                this.modalLoadingService.dismissDialog();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissDialog();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    /*********************************************************************************************
     * PREAUTHORIZATION
     *********************************************************************************************/
    getListPreauthorizationByLocation(request: RequestFilterPreauthorization) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/preautorizacion/vigenteByLocalidadId/filter';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    createOrUpdatePPrteauthorization(formData: FormData) {
        this.modalLoadingService.showDialog();
        // uri
        const url = URL_SERVICIOS + 'registro/edicion/preautorizacion/multipart';
        // headers
        const options = {} as any; // Set any options you like
        // call post
        return this.http.post(url, formData, options)
            .map((resp: any) => {
                this.modalLoadingService.dismissDialog();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissDialog();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    calculateDatePrteauthorization(request: RequestCalculateDate) {
        this.modalLoadingService.showDialog();
        // uri
        const url = URL_SERVICIOS + 'preautorizacion/calcularFechaFin';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissDialog();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissDialog();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    /*********************************************************************************************
     * BLACK LIST
     *********************************************************************************************/
    getListBlacklistByLocation(request: RequestFilterBlackList) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/listaNegra/byLocalidadId/filter';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    createOrUpdateBlacklist(formData: FormData) {
        this.modalLoadingService.showDialog();
        // uri
        const url = URL_SERVICIOS + 'registro/edicion/listaNegra/multipart';
        // headers
        const options = {} as any; // Set any options you like
        // call post
        return this.http.post(url, formData, options)
            .map((resp: any) => {
                this.modalLoadingService.dismissDialog();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissDialog();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    /*********************************************************************************************
     * ROL
     *********************************************************************************************/
    getListRol(request: RequestFilterRol) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/rol/filter';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    createOrUpdateRol(request: RolModel) {
        this.modalLoadingService.showDialog();
        // uri
        const url = URL_SERVICIOS + 'registro/edicion/rol';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissDialog();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissDialog();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

    /*********************************************************************************************
     * USUARIO
     *********************************************************************************************/
    getListUser(request: RequestFilterUser) {
        this.modalLoadingService.showLoadingLayout();
        // uri
        const url = URL_SERVICIOS + 'find/usuario/filter';
        // call post
        return this.http.post(url, request)
            .map((resp: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                return resp;
            })
            .catch((error: any) => {
                this.modalLoadingService.dismissLoadingLayout();
                Utils.swalAlertError('Error', MSJ_ERROR_METODO);
                return Observable.throw(error.statusText);
            });
    }

}
