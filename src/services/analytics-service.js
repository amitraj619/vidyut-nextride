import { isMobileDevice } from "../utils/deviceCheck";
import { getEnvConfig } from "../utils/EnvUtils";
import * as constants from "./constants";
import { enqueueEvent, processQueue } from "./eventQueueService";
import { getSessionTrackingIds } from "./sessionTackingService";

export const getBaseURL = (env) => {
  return env === constants?.PROD
    ? constants?.PROD_ANALYTICS_URL
    : constants?.UAT_ANALYTICS_URL;
};

export const sendEvent = async (eventBody) => {
  let {
    flowContext,
    action,
    source_page,
    questions,
    prev_city,
    scroll_depth,
    filters_json,
    field_name,
    customer_name,
    no_of_vehicles_shown,
    sort_option,
    filter_category,
    current_sort_option,
    sort_option_chosen,
    sort_option_final,
    mobile_number,
    result,
    card_position,
    results_count,
    vehicleId,
    registration_number,
    oem_name,
    vehicle_type,
    banner_name,
    banner_position,
    cta_text,
    category_name,
    search_string,
    question_position,
    selected_language,
    destination_page,
  } = eventBody || {};

  const { utm_source, utm_medium, utm_campaign } = getUTMParams();

  const city = sessionStorage.getItem("city");

  if (filters_json && typeof filters_json === "object") {
    const { sortBy, ...rest } = filters_json;
    filters_json = JSON.stringify(rest);
  }

  const { anonymous_id, session_id } = getSessionTrackingIds();
  const deviceType = isMobileDevice() ? "mobile" : "desktop";

  const payload = {
    channel: constants?.nextride_channel ?? null,
    env: getEnvConfig()?.env ?? null,
    flow_context: flowContext ?? null,
    action: action ?? null,
    property_1: source_page ?? null,
    property_2: utm_source ?? null,
    property_3: utm_medium ?? null,
    property_4: utm_campaign ?? null,
    property_5: city ?? null,
    property_6:
      questions ??
      prev_city ??
      scroll_depth ??
      filters_json ??
      field_name ??
      customer_name ??
      banner_name ??
      cta_text ??
      category_name ??
      search_string ??
      selected_language ??
      deviceType ??
      null,
    property_7:
      no_of_vehicles_shown ??
      sort_option ??
      filter_category ??
      current_sort_option ??
      sort_option_chosen ??
      sort_option_final ??
      mobile_number ??
      banner_position ??
      question_position ??
      null,
    property_8: result ?? card_position ?? null,
    property_9: results_count ?? null,
    property_10: vehicleId ?? null,
    property_11: registration_number ?? null,
    property_12: oem_name ?? null,
    property_13: vehicle_type ?? null,
    property_14: destination_page,
    anonymous_id: anonymous_id,
    session_id: session_id,
  };

  await enqueueEvent(payload);
  processQueue();
};

export const getUTMParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    utm_source: searchParams.get("utm_source"),
    utm_medium: searchParams.get("utm_medium"),
    utm_campaign: searchParams.get("utm_campaign"),
  };
};
