import axios, { AxiosRequestConfig } from "axios";

export async function editorUploadImage(
  url: string,
  file: File,
  config?: AxiosRequestConfig,
) {
  const form = new FormData();
  form.append("image", file);
  const response = await axios.post<{ url: string }>(url, form, config);
  return response.data;
}
