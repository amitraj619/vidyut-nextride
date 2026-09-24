import { getNeoBaseUrl, makeHttpRequest } from "vt-fe-core/neo/neoUtils";
import * as constant from "./constants";
import { getEnvConfig } from "../utils/EnvUtils";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";

export const fetchEMICalculation = async (payload) => {
  const base_url = getNeoBaseUrl(getEnvConfig());
  const httpRes = await makeHttpRequest(
    base_url + constant.emi_calculator_api,
    constant.POST,
    payload,
  );

  if (httpRes?.statusCode >= 500) {
    toast.error(constant.ERROR_MESSAGE, {
      duration: 2000,
      className: "pe-1",
      cancel: { label: <RxCross2 className="fs-5" /> },
      cancelButtonStyle: {
        backgroundColor: "transparent",
        color: "#DC464E",
      },
    });
  } else {
    return httpRes;
  }
};

export const fetchVehicleList = async (payload, page_no, page_size) => {
  const base_url = getNeoBaseUrl(getEnvConfig());
  const httpRes = await makeHttpRequest(
    base_url + constant.vehicle_listing_search_api(page_no, page_size),
    constant.POST,
    payload,
  );

  if (httpRes?.statusCode >= 500) {
    toast.error(constant.ERROR_MESSAGE, {
      duration: 2000,
      className: "pe-1",
      cancel: { label: <RxCross2 className="fs-5" /> },
      cancelButtonStyle: {
        backgroundColor: "transparent",
        color: "#DC464E",
      },
    });
  } else {
    return httpRes;
  }
};

export const fetchVehicleDetails = async (vehicleId) => {
  const base_url = getNeoBaseUrl(getEnvConfig());
  const httpRes = await makeHttpRequest(
    base_url + constant.vehicle_detail_api(vehicleId),
    constant.GET,
  );

  if (httpRes?.statusCode >= 500) {
    toast.error(constant.ERROR_MESSAGE, {
      duration: 2000,
      className: "pe-1",
      cancel: { label: <RxCross2 className="fs-5" /> },
      cancelButtonStyle: {
        backgroundColor: "transparent",
        color: "#DC464E",
      },
    });
  } else {
    return httpRes;
  }
};

export const fetchProjectSchema = async () => {
  const base_url = getNeoBaseUrl(getEnvConfig());
  const httpRes = await makeHttpRequest(
    base_url + constant.project_schema_api,
    constant.GET,
  );

  if (httpRes?.statusCode >= 500) {
    toast.error(constant.ERROR_MESSAGE, {
      duration: 2000,
      className: "pe-1",
      cancel: { label: <RxCross2 className="fs-5" /> },
      cancelButtonStyle: {
        backgroundColor: "transparent",
        color: "#DC464E",
      },
    });
  } else {
    return httpRes;
  }
};

export const getVehicleImgUrl = async (vehicleId, imageId) => {
  const base_url = getNeoBaseUrl(getEnvConfig());
  const httpRes = await makeHttpRequest(
    base_url + constant.get_vehicle_image_api(vehicleId, imageId),
    constant.GET,
  );

  if (httpRes?.statusCode >= 500) {
    toast.error(constant.ERROR_MESSAGE, {
      duration: 2000,
      className: "pe-1",
      cancel: { label: <RxCross2 className="fs-5" /> },
      cancelButtonStyle: {
        backgroundColor: "transparent",
        color: "#DC464E",
      },
    });
  } else {
    return httpRes;
  }
};

export const getVehicleAudioUrl = async (vehicleId, audioId) => {
  const base_url = getNeoBaseUrl(getEnvConfig());

  const httpRes = await makeHttpRequest(
    base_url + constant.get_vehicle_document_api(vehicleId, audioId),
    constant.GET,
  );

  if (httpRes?.statusCode >= 500) {
    console.error("Audio API Error: Server responded with status 500+");
  } else {
    return httpRes;
  }
};

export const getCitiesList = async () => {
  const base_url = getNeoBaseUrl(getEnvConfig());
  const httpRes = await makeHttpRequest(
    base_url + constant.cities_list_api,
    constant.GET,
  );

  if (httpRes?.statusCode >= 500) {
    toast.error(constant.ERROR_MESSAGE, {
      duration: 2000,
      className: "pe-1",
      cancel: { label: <RxCross2 className="fs-5" /> },
      cancelButtonStyle: {
        backgroundColor: "transparent",
        color: "#DC464E",
      },
    });
  } else {
    return httpRes;
  }
};

export const getLocation = async () => {
  try {
    const geo_res = await fetch(constant.get_ip_api);
    if (geo_res?.ok) {
      const data = await geo_res.json();
      return data;
    }

    return null;
  } catch (err) {
    console.error("Error fetching geo data:", err);
  }
};

export const submitCustomerEnquiry = async (payload) => {
  const base_url = getNeoBaseUrl(getEnvConfig());
  const httpRes = await makeHttpRequest(
    base_url + constant.customer_enquiry_api,
    constant.POST,
    payload,
  );

  if (httpRes?.statusCode >= 500) {
    toast.error(constant.ERROR_MESSAGE, {
      duration: 2000,
      className: "pe-1",
      cancel: { label: <RxCross2 className="fs-5" /> },
      cancelButtonStyle: {
        backgroundColor: "transparent",
        color: "#DC464E",
      },
    });
  } else {
    return httpRes;
  }
};
