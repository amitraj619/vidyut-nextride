import { useState, useEffect, useContext } from "react";
import CustomerReviews from "../../common-components/CustomerReviews";
import EMICalculator from "../../common-components/EMICalculator";
import FAQSection from "../../common-components/FAQSection";
import Footer from "../../common-components/Footer";
import Header from "../../common-components/Header";
import PageWrapper from "../../common-components/PageWrapper";
import WhyChooseNextRide from "../../common-components/WhyChooseNextRide";
import InspectionReportSection from "./components/InspectionReportSection";
import KnowYourEVSection from "./components/KnowYourEVSection";
import LocationAndPriceSection from "./components/LocationAndPriceSection";
import VehicleImagesCarousel from "./components/VehicleImagesCarousel";
import VehicleNameWithTags from "./components/VehicleNameWithTags";
import "./SCSS/style.scss";
import { fetchVehicleDetails } from "../../services/commonServices";
import BottomActionBar from "./components/BottomActionBar";
import {
  fieldKeyAndValueMap,
  findFieldFromFetchedData,
} from "../../utils/commonUtils";
import { ProjectSchemaContext } from "../../context/ProjectSchemaProvider";
import { useParams, useSearchParams } from "react-router-dom";
import { CLICK, VehicleListing, VIEW } from "../../services/constants";
import VehicleReportBottomSheet from "./components/VehicleReportBottomSheet";
import { useTranslation } from "react-i18next";
import { sendEvent } from "../../services/analytics-service";
import { useScrollToTop } from "../../customHooks/useScrollToTop";
import { trackCustomEvent } from "../../utils/facebookPixelHelper";
import SEO from "../../common-components/SEO";

const VehicleDetailPage = () => {
  const [data, setData] = useState(null);
  const [isReportBottomSheetVisible, setIsReportBottomSheetVisible] =
    useState(false);
  const [activeReportSection, setActiveReportSection] = useState(null);
  const { schema } = useContext(ProjectSchemaContext);
  const { vehicleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  useScrollToTop([], "instant");

  const city = searchParams.get("city");

  const fetchVehicle = async () => {
    setLoading(true);
    const vehicleData = await fetchVehicleDetails(vehicleId);
    if (vehicleData?.status) {
      setData(vehicleData?.data);
    }
    setLoading(false);
  };

  const handleReportBottomSheetVisible = (value) =>
    setIsReportBottomSheetVisible(value);

  const year = String(
    findFieldFromFetchedData(data?.fields, "registrationYear")?.fieldValue
  );

  const oem = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "oem",
    findFieldFromFetchedData(data?.fields, "oem")?.fieldValue
  );

  const model = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "model",
    findFieldFromFetchedData(data?.fields, "model")?.fieldValue
  );

  const variant = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "variant",
    findFieldFromFetchedData(data?.fields, "variant")?.fieldValue
  );

  const vehicle_type = fieldKeyAndValueMap(
    schema,
    VehicleListing,
    "vehicleType",
    findFieldFromFetchedData(data?.fields, "vehicleType")?.fieldValue
  );

  const registration_number = findFieldFromFetchedData(
    data?.fields,
    "vehicleRegNumber"
  )?.fieldValue;

  const handleReportOpen = (activeKey) => {
    setActiveReportSection(activeKey);
    handleReportBottomSheetVisible(true);
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

  const handleEMICalClick = (field_name) => {
    const eventBody = {
      flowContext: `BUY_VEHICLE_DETAIL_PAGE_EMI_CALC_CLICK`,
      action: CLICK,
      source_page: window.location.pathname,
      vehicleId,
      registration_number,
      oem_name: oem,
      field_name,
      vehicle_type,
    };
    sendEvent(eventBody);
  };

  const handleBuyTestRideClick = () => {
    const eventBody = {
      flowContext: `BUY_TEST_RIDE_CTA_CLICK`,
      action: CLICK,
      source_page: window.location.pathname,
      vehicleId,
      registration_number,
      oem_name: oem,
      vehicle_type,
    };
    sendEvent(eventBody);
    trackCustomEvent("BookTestRide", {
      vehicleId,
      registration_number,
      oem,
    });
  };

  // SEO data
  let currentSeoData = {
    title: `Buy ${year} ${oem} ${model} Used EV in ${city} | NextRide`,
    description: `Discover the best deals on the ${year} ${oem} ${model} used electric vehicle in ${city}. NextRide offers quality-checked EVs with verified details, transparent pricing, and a hassle-free buying experience. Find your perfect ${oem} ${model} in ${city} today and make the switch to sustainable driving.`,
    keywords: `Buy ${year} ${oem} ${model} used EV in ${city}, ${year} ${oem} ${model} second hand EV ${city}, ${oem} ${model} electric car for sale ${city}, Affordable ${year} ${oem} ${model} used EV ${city}, NextRide ${year} ${oem} ${model} ${city}, Best deals on ${oem} ${model} EV ${city}, Used ${oem} ${model} electric vehicle ${city}`,
    link: `https://vidyutnextride.com${location.pathname}?${location.search}`,
    robots: "index, follow",
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

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
      };
      sendEvent(eventBody);
    }
  }, [data]);

  return (
    <div className="vehicle_detail_page">
      <PageWrapper isScrollEventRequired>
        <Header
          header_name={`${year} ${oem} ${model} ${variant}`}
          show_location_btn={false}
          loading={loading}
        />
        <SEO data={currentSeoData} />
        <VehicleImagesCarousel
          image_data={findFieldFromFetchedData(data?.fields, "images")}
          vehicleId={vehicleId}
          registration_number={registration_number}
          oem={oem}
          vehicle_type={vehicle_type}
          loading={loading}
        />
        <VehicleNameWithTags
          vehicleData={data?.fields}
          schema={schema}
          loading={loading}
        />
        <LocationAndPriceSection
          vehicleData={data?.fields}
          schema={schema}
          handleReportOpen={handleReportOpen}
          handleReportBottomSheetVisible={handleReportBottomSheetVisible}
          loading={loading}
        />
        <KnowYourEVSection vehicleData={data?.fields} loading={loading} />
        <InspectionReportSection
          inspection_report={findFieldFromFetchedData(
            data?.fields,
            "inspectionReport"
          )}
          setActiveReportSection={setActiveReportSection}
          handleReportOpen={handleReportOpen}
          loading={loading}
        />
        <EMICalculator
          vehicle_value={
            findFieldFromFetchedData(data?.fields, "targetSellingPrice")
              ?.fieldValue
          }
          handleEMICalClick={handleEMICalClick}
        />
        <CustomerReviews />
        <WhyChooseNextRide />
        <FAQSection type="buy" />
        <Footer />
        <BottomActionBar
          price={
            findFieldFromFetchedData(data?.fields, "targetSellingPrice")
              ?.fieldValue
          }
          vehicleNo={
            findFieldFromFetchedData(data?.fields, "vehicleRegNumber")
              ?.fieldValue
          }
          loading={loading}
          handleBuyTestRideClick={handleBuyTestRideClick}
          oem={oem}
          model={model}
          vehicle_type={vehicle_type}
        />
        <VehicleReportBottomSheet
          bottomSheetVisible={isReportBottomSheetVisible}
          closeBottomSheet={() => handleReportBottomSheetVisible(false)}
          reportData={findFieldFromFetchedData(
            data?.fields,
            "inspectionReport"
          )}
          vehicleId={vehicleId}
          registration_number={registration_number}
          oem={oem}
          vehicle_type={vehicle_type}
          activeReportSection={activeReportSection}
        />
      </PageWrapper>
    </div>
  );
};

export default VehicleDetailPage;
