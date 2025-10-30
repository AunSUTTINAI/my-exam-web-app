import Swal from "sweetalert2";
import "./alert.css";

export function confirmDialog(props = {}) {
  const {
    titleName = "Do you want to delete this data item?",
    message = "",
    icon = undefined, 
    confirmText = "Confirm",
    cancelText = "Cancel",
  } = props;

  return Swal.fire({
    title: `<span style="color:#000; font-size:18px;">${titleName}</span>`,
    html: `
      <b>
        Name :
        <span style="color:red; font-weight:bold; margin:0; font-size:10px;">${message}</span>
      </b>
    `,
    icon,
    showCancelButton: true,
    confirmButtonText: `<span style="padding:5px 20px; font-size:14px;">${confirmText}</span>`,
    cancelButtonText: `<span style="padding:5px 20px; font-size:14px;">${cancelText}</span>`,
    customClass: {
      container: "custom-swal-alertv2-container",
      icon: "custom-swal-cancel-icon",
      popup: "custom-swal-popup",
      confirmButton: "custom-confirm-button",
      cancelButton: "custom-cancel-button",
    },
    backdrop: "rgba(0,0,0,0.4)",
  }).then((res) => res.isConfirmed);
}

export function confirmLogout(props = {}) {
  const {
    message = "Do you want to logout?",
    icon = "question",
    confirmText = "Confirm",
    cancelText = "Cancel",
  } = props;

  return Swal.fire({
    title: `<span style="color:#000; font-size:18px;">${message}</span>`,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    customClass: {
      container: "custom-swal-alertv2-container",
      popup: "custom-swal-logout-popup",
      confirmButton: "custom-confirm-logout-button",
      cancelButton: "custom-cancel-logout-button",
    },
    backdrop: "rgba(0,0,0,0.4)",
  }).then((res) => res.isConfirmed);
}

export function alertDialog(props = {}) {
  const { icon = "error", message = "" } = props;
  return Swal.fire({
    icon,
    text: message,
    confirmButtonColor: "#28b485",
  });
}

export function alertConfirm(props = {}) {
  const {
    message = "Data?",
    text = "",
    icon = "question",
    confirmText = "Confirm",
    cancelText = "Cancel",
  } = props;

  return Swal.fire({
    title: `<span style="color:#000; font-size:18px;">${message}</span>`,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    customClass: {
      container: "custom-swal-alertv2-container",
      icon: "custom-swal-confirm-icon",
      popup: "custom-swal-logout-popup",
      confirmButton: "custom-confirm-logout-button",
      cancelButton: "custom-cancel-logout-button",
    },
    backdrop: "rgba(0,0,0,0.4)",
  }).then((res) => res.isConfirmed);
}

export function toast(props = {}) {
  const defaults = {
    success: "บันทึกข้อมูลสำเร็จ",
    warning: "ข้อมูลไม่ถูกต้อง!!",
    info: "แจ้งเตือน!!",
    error: "ข้อมูลไม่ถูกต้องหรือมีปัญหาบางอย่าง กรุณาตรวจสอบ!!",
  };

  const { icon = "success", title = icon.toUpperCase(), message, timer = 3000 } = props;

  return Swal.fire({
    icon,
    html: `
      <div>
        <strong style="font-size:16px; display:block;">${title}</strong>
        <span>${message || defaults[icon] || "Message details"}</span>
      </div>
    `,
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    showCloseButton: true,
    closeButtonHtml:
      '<span style="font-size:35px; cursor:pointer;">&times;</span>',
    timer,
    customClass: {
      popup: `custom-toast ${icon}`,
      icon: "custom-icon",
    },
  });
}

export async function showAlertCallback(props = {}) {
  const {
    icon = "success",
    title = "บันทึกข้อมูลสำเร็จ",
    timer = 1000,
    callbackFunction,
  } = props;

  await Swal.fire({
    icon,
    title,
    showConfirmButton: false,
    timer,
    customClass: {
      container: "position-absolute",
      popup: `custom-toast ${icon}`,
      icon: "custom-icon",
    },
    toast: true,
    position: "top-right",
  });

  if (typeof callbackFunction === "function") {
    callbackFunction();
  }
}

export function alertDialogV2(props = {}) {
  const { icon = "error", message = "", confirmText = "OK", cancelText = "Cancel", showCancelButton = false, time = null } = props;

  const iconColors = {
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#4fc3f7",
    question: "#607d8b",
  };

  const background = iconColors[icon] || "#ffffff";

  return Swal.fire({
    icon,
    text: message,
    background,
    color: "#ffffff",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    showCancelButton,
    showConfirmButton: !time,
    timer: time || undefined,
    customClass: {
      popup: "custom-swal-alertv2-popup",
      container: "custom-swal-alertv2-container",
      confirmButton: "custom-confirmv2-button",
      cancelButton: "custom-cancelv2-button",
      icon: "custom-iconv2",
    },
    buttonsStyling: false,
    backdrop: "rgba(0,0,0,0.4)",
  });
}
