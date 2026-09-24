import { validateToken } from "vt-fe-core/auth";
import { getCookie } from "vt-fe-core/auth/cookieUtils";
import { getEnvConfig } from "../utils/EnvUtils";
import { resale_channel } from "./constants";

export const validateUser = async () => {
  const config = getEnvConfig();

  if (!getCookie("vt_user_token")) return;

  const data = await validateToken(config, getAuthorizationToken());
  return data;
};

export const getAuthorizationToken = () => {
  let channel = resale_channel;
  let referenceNum = getCookie("vt_user_referenceNum");
  let token = getCookie("vt_user_token");
  return channel.concat("|").concat(referenceNum).concat("|").concat(token);
};
