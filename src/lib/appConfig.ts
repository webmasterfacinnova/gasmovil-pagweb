export const APP_NAME = "Zerkio";
export const COMPANY_NAME = "Facinnovations";
export const CONTACT_EMAIL = "informacion@facinnova.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.faccinnova.gasmovil";

const DELETE_DATA_SUBJECT = `Solicitud de eliminacion de datos - ${APP_NAME}`;
const DELETE_DATA_BODY = [
  `Hola equipo de ${APP_NAME},`,
  "",
  "Solicito la eliminacion de mis datos. Comparto los siguientes datos para validacion:",
  "- Nombre:",
  "- Correo registrado:",
  "- Telefono registrado:",
  "- Detalle de la solicitud:",
].join("\n");

export const DELETE_DATA_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(DELETE_DATA_SUBJECT)}&body=${encodeURIComponent(DELETE_DATA_BODY)}`;
