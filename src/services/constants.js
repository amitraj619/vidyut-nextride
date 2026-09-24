// endpoints
export const emi_calculator_api =
  "/nextride/api/v1/vehicle/listing/emi/details";

export const vehicle_listing_search_api = (page_no, page_size) =>
  `/nextride/api/v1/vehicle/listing/search?pageNo=${page_no}&pageSize=${page_size}`;

export const vehicle_detail_api = (vehicleId) =>
  `/nextride/api/v1/vehicle/listing/${vehicleId}`;

export const get_vehicle_image_api = (vehicleId, imageId) =>
  `/nextride/api/v1/vehicle/listing/${vehicleId}/${imageId}`;

export const get_vehicle_document_api = (vehicleId, documentId) =>
  `/nextride/api/v1/vehicle/listing/${vehicleId}/${documentId}`;

export const project_schema_api = `/nextride/api/v1/homepage/schema`;

export const cities_list_api = `/nextride/api/v1/homepage/cities`;

export const get_ip_api = `https://get.geojs.io/v1/ip/geo.json`;

export const customer_enquiry_api = "/nextride/api/v1/customer/enquiry/submit";

// analytics base url
export const UAT_ANALYTICS_URL = "https://analytics-uat.vidyuttech.com";
export const PROD_ANALYTICS_URL = "https://analytics.vidyuttech.com";

// analytics end point
export const event_api = "/api/event";

// http methods
export const POST = "POST";
export const PUT = "PUT";
export const GET = "GET";
export const DELETE = "DELETE";

// site URL
export const UAT_SITE_URL = "https://uat.vidyutnextride.com/";
export const PROD_SITE_URL = "https://vidyutnextride.com/";

export const UAT = "UAT";
export const PROD = "PROD";

// channel
export const resale_channel = "RESALE_PLATFORM";
export const nextride_channel = "NEXTRIDE_WEBSITE";
export const project_name = "nextride";

// object names (schema)
export const VehicleListing = "VehicleListing";
export const CustomerEnquiry = "CustomerEnquiry";

// filter price constants
export const MIN_PRICE = 50000;
export const MAX_PRICE = 500000;

// filter odometer(KMs) constants
export const MIN_KMS = 0;
export const MAX_KMS = 200000;

// default filter values
export const DEFAULT_FILTER = {
  sortBy: { sortField: "createdAt", sortDirection: "DESC" },
  oem: [],
  registrationYear: [],
  vehicleType: [],
  targetSellingPrice: { lowerBound: "", upperBound: "" },
  currentOdometer: { lowerBound: "", upperBound: "" },
  city: [],
};

// Error message
export const ERROR_MESSAGE =
  "Oop's something went wrong. Please reach out to Tech for support.";

// analytics
export const CLICK = "CLICK";
export const VIEW = "VIEW";

// meta pixel
export const pixelId = 354629303646728;

// event queue service
export const IDB_NAME = "AnalyticsDB";
export const IDB_STORE_NAME = "eventQueue";

export const MAX_IMAGES_STORE = 100;

export const USER_PINNED_LANGUAGE = "userPinnedLanguage";

// Store normalized city names
export const ENGLISH_PREFERRED_CITIES = new Set(
  [
    "Bengaluru",
    "Mysuru",
    "Tumkur",
    "Mandya",
    "Kolar",
    "Bangalore Rural",
    "Chennai",
    "Kanchipuram",
    "Tiruvallur",
    "Ernakulam",
    "Visakhapatnam",
    "Ananthapur",
    "Guntur",
    "Krishna",
    "Hyderabad",
    "K.V.Rangareddy",
    "Warangal",
    "Medak",
    "Nizamabad",
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Palghar",
    "Kharegaon",
  ].map((city) => city.trim().toLowerCase()),
);
