import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'p-button p-component p-button-success mr-3',
        cancelButton: 'p-button p-component p-button-danger'
    },
    buttonsStyling: false
});

export const SwalConfirm = swalWithBootstrapButtons.mixin({
    icon: 'question',
    title: '¿Estás seguro?',
    text: '',
    showCancelButton: true,
    cancelButtonText: '<i class="pi pi-times mr-2"></i> Cancelar',
    confirmButtonText: '<i class="pi pi-check mr-2"></i> Aceptar',
    allowOutsideClick: false,
    allowEscapeKey: false
});
