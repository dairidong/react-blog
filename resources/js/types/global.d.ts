import { AxiosInstance } from "axios";
import ziggyRoute, { Config as ZiggyConfig } from "ziggy-js";

declare global {
  interface Window {
    axios: AxiosInstance;
  }

  // 转换为 let 或 const 时 ts 编译报错
  // eslint-disable-next-line no-var,vars-on-top
  var route: typeof ziggyRoute;
  // eslint-disable-next-line no-var,vars-on-top
  var Ziggy: ZiggyConfig;
}
