import React, { useState, useEffect, useContext } from "react";
import {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchVehicleDetails } from "../../services/commonServices";
import { sendEvent } from "../../services/analytics-service";
import { trackCustomEvent } from "../../utils/facebookPixelHelper";
import { useScrollToTop } from "../../customHooks/useScrollToTop";
import {
  convertFromISO8601Duration,
  fieldKeyAndValueMap,
  findFieldFromFetchedData,
  formatTime,
  getEMIStartsValue,
  getRto,
} from "../../utils/commonUtils";
import { ProjectSchemaContext } from "../../context/ProjectSchemaProvider";
import {
  CLICK,
  ENGLISH_PREFERRED_CITIES,
  VehicleListing,
  VIEW,
} from "../../services/constants";
import SEO from "../../common-components/SEO";
import VehicleImagesCarousel from "./components/VehicleImagesCarousel";
import InspectionReportSection from "./components/InspectionReportSection";
import VehicleReportBottomSheet from "./components/VehicleReportBottomSheet";
import InspectionReportSectionV2 from "./components/InspectionReportSectionV2";
import {
  battery_capacity_icon,
  charging_time_icon,
  file_icon,
  insurance_validity_icon,
  manufacture_year_icon,
  no_of_owners_icon,
  reg_date_icon,
  reg_number_icon,
  rto_icon,
  top_speed_icon,
} from "../../assets/SVGIcons/VehicleDetailsPageIcons";
import {
  location_black_icon,
  location_icon,
  purple_power_icon,
  lock_icon,
} from "../../assets/SVGIcons/CommonIcons";
import VehicleReportModalV2 from "./components/VehicleReportModalV2";
import VehicleDetailSkeletonV2 from "./components/VehicleDetailSkeletonV2";
import LanguageToggleSwitch from "../../common-components/LanguageToggleSwitch";
import Footer from "../../common-components/Footer";
import EMICalculator from "../../common-components/EMICalculator";
import { GeneralFilterContext } from "../../context/VehicleListProvider";
import { RightSideContent } from "./components/RightSideContent";

const VehicleEmiCalculator = ({ price, vehicleId }) => (
  <EMICalculator
    vehicle_value={price}
    handleEMICalClick={(key) => {
      sendEvent({
        flowContext: `EMI_CALCULATOR_INTERACTION`,
        action: CLICK,
        source_page: window.location.pathname,
        vehicleId,
        interacted_field: key,
      });
    }}
  />
);

const VehicleDetailPageV2 = (props) => {
  const { vehicleId: paramId } = useParams();
  const vehicleId = props.vehicleId || paramId;
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { schema } = useContext(ProjectSchemaContext);
  const { appliedFilters } = useContext(GeneralFilterContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isReportBottomSheetVisible, setIsReportBottomSheetVisible] =
    useState(false);
  const [activeReportSection, setActiveReportSection] = useState(null);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const city = searchParams.get("city") || "N/A";
  const shouldShowAudioSummary = !ENGLISH_PREFERRED_CITIES.has(
    city.trim().toLowerCase(),
  );

  const fetchVehicle = async () => {
    setLoading(true);
    const vehicleData = await fetchVehicleDetails(vehicleId);
    if (vehicleData?.status) {
      setData(vehicleData?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 0);
    }
  }, [loading, vehicleId]);

  useEffect(() => {
    if (vehicleId) {
      fetchVehicle();
    }
  }, [vehicleId]);

  const fields = data?.fields || [];

  const yearRaw = findFieldFromFetchedData(
    fields,
    "registrationYear",
  )?.fieldValue;
  const year = yearRaw ? String(yearRaw) : "";
  const oem = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "oem",
    findFieldFromFetchedData(fields, "oem")?.fieldValue,
  );
  const model = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "model",
    findFieldFromFetchedData(fields, "model")?.fieldValue,
  );
  const variant = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "variant",
    findFieldFromFetchedData(fields, "variant")?.fieldValue,
  );
  const vehicle_type = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "vehicleType",
    findFieldFromFetchedData(fields, "vehicleType")?.fieldValue,
  );
  const chargerAvailability = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "chargerAvailability",
    findFieldFromFetchedData(fields, "chargerAvailability")?.fieldValue,
  );
  const registration_number = findFieldFromFetchedData(
    fields,
    "vehicleRegNumber",
  )?.fieldValue;

  const audioSummaryField = findFieldFromFetchedData(
    fields,
    "vehicleSummaryAudioHindi",
  );

  const currentAddress = findFieldFromFetchedData(
    fields,
    "currentAddress",
  )?.fieldValue;

  const price =
    findFieldFromFetchedData(fields, "targetSellingPrice")?.fieldValue || 0;
  const odometer =
    findFieldFromFetchedData(fields, "currentOdometer")?.fieldValue || "N/A";

  const vehicleName =
    ` ${oem} ${model} ${variant}`.trim() || "Loading Vehicle...";
  const vehicleTags = [
    `${odometer} ${t("VEHICLE_DETAILS.KM", "km")}`,
    getRto(findFieldFromFetchedData(fields, "vehicleRegNumber")?.fieldValue) ||
      city.toUpperCase(),
  ];

  const specs = [
    {
      icon: reg_number_icon,
      label: t("VEHICLE_DETAILS.KNOW_YOUR_EV.REG_NO"),
      value: registration_number || "N/A",
    },
    {
      icon: reg_date_icon,
      label: t("VEHICLE_DETAILS.KNOW_YOUR_EV.REG_DATE", "Reg. Date"),
      value:
        findFieldFromFetchedData(fields, "registrationDate")?.fieldValue ||
        "N/A",
    },
    {
      icon: insurance_validity_icon,
      label: t("VEHICLE_DETAILS.KNOW_YOUR_EV.INSURANCE_VALIDITY"),
      value:
        findFieldFromFetchedData(fields, "insuranceValidity")?.fieldValue ||
        "N/A",
    },
    {
      icon: no_of_owners_icon,
      label: t("VEHICLE_DETAILS.KNOW_YOUR_EV.NO_OF_OWNERS"),
      value:
        findFieldFromFetchedData(fields, "noOfOwners")?.fieldValue || "N/A",
    },
    {
      icon: rto_icon,
      label: t("VEHICLE_DETAILS.KNOW_YOUR_EV.RTO"),
      value: findFieldFromFetchedData(fields, "rto")?.fieldValue || "N/A",
    },
    {
      icon: battery_capacity_icon,
      label: t("VEHICLE_DETAILS.KNOW_YOUR_EV.BATTERY_CAPACITY"),
      value:
        findFieldFromFetchedData(fields, "batterySpec")?.fieldValue || "N/A",
    },
    {
      icon: charging_time_icon,
      label: t("VEHICLE_DETAILS.KNOW_YOUR_EV.CHARGING_TIME"),
      value:
        formatTime(
          convertFromISO8601Duration(
            findFieldFromFetchedData(fields, "chargingTime")?.fieldValue,
          ),
        ) || "N/A",
    },
    {
      icon: manufacture_year_icon,
      label: t("VEHICLE_DETAILS.KNOW_YOUR_EV.MANUFACTURE_YEAR"),
      value: year || "N/A",
    },
    {
      icon: purple_power_icon,
      label: t("VEHICLE_DETAILS.CHARGER_AVAILABILITY"),
      value: chargerAvailability || "N/A",
    },
  ];

  useEffect(() => {
    if (data) {
      const eventBody = {
        flowContext: `BUY_VEHICLE_DETAIL_PAGE_VIEW`,
        action: VIEW,
        source_page: window.location.pathname,
        vehicleId,
        registration_number,
        oem_name: oem,
        vehicle_type: vehicle_type,
        filters_json: appliedFilters,
        sort_option: JSON.stringify(appliedFilters?.sortBy),
      };
      sendEvent(eventBody);
    }
  }, [data, appliedFilters]);

  const handleBuyTestRideClick = (e, clickType = "TEST_RIDE") => {
    if (e && e.stopPropagation) e.stopPropagation();

    const destinationPath = `/all-ev-vehicles/${vehicleId}/details/${registration_number}/${oem}/TEST_RIDE/customer-enquiry`;

    const flowContext =
      clickType === "CHECK_AMOUNT"
        ? "BUY_VEHICLE_CHECK_AMOUNT_CLICKED"
        : "BUY_VEHICLE_TEST_RIDE_CLICKED";

    const eventBody = {
      flowContext: flowContext,
      action: CLICK,
      source_page: window.location.pathname,
      vehicleId,
      registration_number,
      oem_name: oem,
      vehicle_type,
      destination_page: destinationPath,
      filters_json: appliedFilters,
      sort_option: JSON.stringify(appliedFilters?.sortBy),
    };

    sendEvent(eventBody);
    trackCustomEvent("BookTestRide", {
      vehicleId,
      registration_number,
      oem,
    });

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("model", model);
    updatedSearchParams.set("vehicle_type", vehicle_type);

    setTimeout(() => {
      navigate({
        pathname: destinationPath,
        search: updatedSearchParams.toString(),
      });
    }, 10);
  };

  const handleReportOpen = (activeKey) => {
    setActiveReportSection(activeKey);
    setIsReportBottomSheetVisible(true);
    const eventBody = {
      flowContext: `BUY_INSPECTION_REPORT_CTA_CLICK`,
      action: CLICK,
      source_page: window.location.pathname,
      vehicleId,
      registration_number,
      oem_name: oem,
      vehicle_type,
    };
    sendEvent(eventBody);
  };

  const currentSeoData = {
    title: `Buy ${oem} ${model} Used EV in ${city} | NextRide`,
    description: `Discover the best deals on the ${oem} ${model} used electric vehicle in ${city}.`,
    keywords: `Buy ${oem} ${model} used EV in ${city}`,
    link: `https://vidyutnextride.com${location?.pathname}?${location?.search}`,
    robots: "index, follow",
  };

  const estEmi = getEMIStartsValue(price);

  if (loading) {
    return <VehicleDetailSkeletonV2 />;
  }

  return (
    <div
      className="vehicle-detail-v2 pb-5"
      style={{
        backgroundColor: "#F8F9FA",
        minHeight: "100vh",
      }}
    >
      <SEO data={currentSeoData} />

      {/* Global Header */}
      <div
        className="w-100 bg-white shadow-sm mb-4"
        style={{
          position: "sticky",
          top: 0,
          borderBottom: "1px solid #eee",
          zIndex: 1040,
        }}
      >
        <div className="container py-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-link text-dark text-decoration-none p-0 d-flex align-items-center"
              onClick={() => window.history.back()}
            >
              <span className="fs-5 fw-bold">←</span>
            </button>
            <h5
              className="m-0 fw-bold text-truncate"
              style={{ maxWidth: "60vw" }}
            >
              {vehicleName}
            </h5>
          </div>

          <div className="d-flex align-items-center">
            <LanguageToggleSwitch />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-7 col-xl-8 d-flex flex-column gap-4">
            <VehicleImagesCarousel
              image_data={findFieldFromFetchedData(fields, "images")}
              vehicleId={vehicleId}
              registration_number={registration_number}
              oem={oem}
              vehicle_type={vehicle_type}
              loading={loading}
            />

            <div className="d-block d-lg-none">
              <RightSideContent
                vehicleName={vehicleName}
                vehicleTags={vehicleTags}
                vehicleId={vehicleId}
                audioSummaryField={audioSummaryField}
                currentAddress={currentAddress}
                price={price}
                estEmi={estEmi}
                handleBuyTestRideClick={handleBuyTestRideClick}
                shouldShowAudioSummary={shouldShowAudioSummary}
                registration_number={registration_number}
                oem={oem}
                vehicle_type={vehicle_type}
              />
            </div>

            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">
                  {t("VEHICLE_DETAILS.KNOW_YOUR_EV.TITLE")}
                </h5>
                <div className="row g-4">
                  {specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="col-6 col-md-4 d-flex align-items-start"
                    >
                      <div
                        className="me-3 bg-light rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "40px", height: "40px", flexShrink: 0 }}
                      >
                        {spec.icon}
                      </div>
                      <div>
                        <small
                          className="text-muted d-block"
                          style={{ fontSize: "12px" }}
                        >
                          {spec.label}
                        </small>
                        <strong style={{ fontSize: "14px" }}>
                          {spec.value}
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <InspectionReportSectionV2
              inspection_report={findFieldFromFetchedData(
                fields,
                "inspectionReport",
              )}
              handleReportOpen={handleReportOpen}
              loading={loading}
            />

            {!isDesktop && (
              <VehicleEmiCalculator price={price} vehicleId={vehicleId} />
            )}
          </div>

          <div className="col-12 col-lg-5 col-xl-4 d-none d-lg-block">
            <div className="position-sticky pe-1" style={{ top: "90px" }}>
              <RightSideContent
                vehicleName={vehicleName}
                vehicleTags={vehicleTags}
                vehicleId={vehicleId}
                audioSummaryField={audioSummaryField}
                currentAddress={currentAddress}
                price={price}
                estEmi={estEmi}
                handleBuyTestRideClick={handleBuyTestRideClick}
                shouldShowAudioSummary={shouldShowAudioSummary}
                registration_number={registration_number}
                oem={oem}
                vehicle_type={vehicle_type}
              />

              {isDesktop && (
                <div className="mt-4 pb-4">
                  <VehicleEmiCalculator price={price} vehicleId={vehicleId} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div
        className="d-lg-none fixed-bottom bg-white border-top shadow-lg p-3"
        style={{ zIndex: 1050 }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small
              className="text-muted d-block mb-1"
              style={{ fontSize: "12px" }}
            >
              {t("VEHICLE_DETAILS.EMI_STARTS")}
            </small>
            <div className="d-flex align-items-baseline">
              <h4 className="fw-bold m-0" style={{ color: "#212121" }}>
                ₹{estEmi ? estEmi.toLocaleString("en-IN") : "--"}
              </h4>
              <small className="text-muted ms-1" style={{ fontSize: "12px" }}>
                /{t("VEHICLE_DETAILS.EMI_CALCULATOR.M")}
              </small>
            </div>
          </div>
          <button
            onClick={(e) => handleBuyTestRideClick(e, "TEST_RIDE")}
            className="btn text-white fw-bold py-2 px-4 rounded-3"
            style={{ backgroundColor: "#7225f5" }}
          >
            {t("VEHICLE_DETAILS.BOOK_TEST_RIDE")}
          </button>
        </div>
      </div>

      <Footer />

      <VehicleReportModalV2
        bottomSheetVisible={isReportBottomSheetVisible}
        closeBottomSheet={() => setIsReportBottomSheetVisible(false)}
        reportData={findFieldFromFetchedData(fields, "inspectionReport")}
        vehicleId={vehicleId}
        registration_number={registration_number}
        oem={oem}
        vehicle_type={vehicle_type}
        activeReportSection={activeReportSection}
      />
    </div>
  );
};

export default VehicleDetailPageV2;
