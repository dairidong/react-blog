import { AxiosInstance } from "axios";
import { RouteList } from "ziggy-js";

declare global {
  interface Window {
    axios: AxiosInstance;
  }

  // eslint-disable-next-line no-var,vars-on-top
  var Ziggy: RouteList;
}
