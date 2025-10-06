import Swal, { type SweetAlertIcon } from "sweetalert2";
import router from "@/router";

const toast = (icon : SweetAlertIcon, title:string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: title,
  });
};

const redirectAlert = (icon: SweetAlertIcon, title: string, text: string, button: string, destination = null) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonText: button,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: true,
  }).then(() => {
    if (destination !== null) {
      router.push({ name: destination });
    }
  });
};

const simpleAlert = (icon: SweetAlertIcon, title: string, text: string) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
};

export default { toast, redirectAlert, simpleAlert };
