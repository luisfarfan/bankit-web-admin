import { environment } from "../../environments/environment";

export const BASEURL = `${environment.api}:${environment.port}/api/v1/`

export const objectToFormData = <T>(object: T): FormData => {
  const formData = new FormData();
  Object.keys(object).forEach(k => {
    formData.append(k, object[k]);
  });
  return formData;
}

export const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
