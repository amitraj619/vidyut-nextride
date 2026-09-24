import { v4 as uuidv4 } from "uuid";
import { setCookie, getCookie } from "vt-fe-core/auth/cookieUtils";

export const getUUID = () => {
  const ts = Date.now();
  return `${ts}_${uuidv4()}_${uuidv4()}`;
};

export const getSessionTrackingIds = () => {
  const anonymous_id = validateAndReturnAnonymousId();
  const session_id =
    validateAndReturnSessionId();

  return {
    anonymous_id,
    session_id
  };
};

const validateAndReturnAnonymousId = () => {
  let anonymous_id = getCookie("anonymous_id");
  let ls_anonymous_id = localStorage.getItem("anonymous_id");

  if (!anonymous_id && ls_anonymous_id) {
    anonymous_id = ls_anonymous_id;
    setCookie("anonymous_id", anonymous_id, 365);
  } else if (anonymous_id && !ls_anonymous_id) {
    localStorage.setItem("anonymous_id", anonymous_id);
  }

  if (!anonymous_id && !ls_anonymous_id) {
    anonymous_id = getUUID();
    setCookie("anonymous_id", anonymous_id, 365);
    localStorage.setItem("anonymous_id", anonymous_id);
  }

  return anonymous_id;
};

const validateAndReturnSessionId = () => {
  let session_id = getCookie("session_id");
  let session_start_ts = localStorage.getItem("session_start_ts");
  let last_event_ts = localStorage.getItem("last_event_ts");

  const now = Date.now();
  const THIRTY_MINUTES = 30 * 60 * 1000;

  if (!session_id || !last_event_ts || now - parseInt(last_event_ts) >= THIRTY_MINUTES) {
    session_id = getUUID();
    session_start_ts = now.toString();
    last_event_ts = now.toString();

    setCookie("session_id", session_id, 0.0208); // ~30 minutes in days
    localStorage.setItem("session_start_ts", session_start_ts);
    localStorage.setItem("last_event_ts", last_event_ts);
  } else {
    setCookie("session_id", session_id, 0.0208); 
    last_event_ts = now.toString();
    localStorage.setItem("last_event_ts", last_event_ts);
  }

  return session_id;
};
