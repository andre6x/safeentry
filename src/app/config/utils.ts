// sweetalert
import swal from 'sweetalert';
import {LocalidadModel} from '../model/data/localidad.model';

export default class Utils {

    /*****************************************************************************************
     *PATH BUILD
     *****************************************************************************************/
    static APP_BASE_HREF = '/site.admin';

    /*****************************************************************************************
     *RUTA
     *****************************************************************************************/
    static cdn = 'https://apps.cajamarca.ec/';

    /*****************************************************************************************
     *CODIGOS
     *****************************************************************************************/


    /*****************************************************************************************
     *MENSAJES
     *****************************************************************************************/
    static ATENCION = 'Atención';
    static ACTIVO = 'ACTIVO';

    static RESIDENCIAL = 'RESIDENCIAL';
    static EDIFICIO = 'EDIFICIO';

    /*****************************************************************************************
     * DIALOG
     *****************************************************************************************/
    static swalAlert(title: string, message: string, type: string) {
        swal(title, message, type);
        return false;
    }

    static swalAlertSuccess(title: string, message: string) {
        swal(title, message, 'success');
        return false;
    }

    static swalAlertError(title: string, message: string) {
        swal(title, message, 'error');
        return false;
    }

    static swalAlertWarning(title: string, message: string) {
        swal(title, message, 'warning');
        return false;
    }

    /*****************************************************************************************
     * FUNCIONES
     *****************************************************************************************/
    static localidadInfo(model: LocalidadModel): string {
        let infoLocation = '';
        if (model) {
            if (model.tipo && model.tipo === 'EDIFICIO') {
                if (model.manzana && model.manzana.length > 0) {
                    infoLocation = infoLocation + 'MZ. ' + model.manzana + '  ';
                }
                if (model.descripcion && model.descripcion.length > 0) {
                    infoLocation = infoLocation + 'Edif: ' + model.descripcion + '  ';
                }
            } else if (model.tipo && model.tipo === 'RESIDENCIAL') {
                if (model.localidadPadre && model.localidadPadre.id > 0) {
                    if (model.localidadPadre && model.localidadPadre.descripcion.length > 0) {
                        infoLocation = infoLocation + 'Edif: ' + model.localidadPadre.descripcion + '  ';
                    }
                    if (model.piso && model.piso.length > 0) {
                        infoLocation = infoLocation + ' Piso: ' + model.piso + '  ';
                    }
                    if (model.departamento && model.departamento.length > 0) {
                        infoLocation = infoLocation + ' Dpto: ' + model.departamento + '  ';
                    }
                } else {
                    if (model.manzana && model.manzana.length > 0) {
                        infoLocation = infoLocation + 'MZ. ' + model.manzana + '  ';
                    }
                    if (model.villa && model.villa.length > 0) {
                        infoLocation = infoLocation + 'V. ' + model.villa + '  ';
                    }
                }
            }
        }
        return infoLocation;
    }
}
