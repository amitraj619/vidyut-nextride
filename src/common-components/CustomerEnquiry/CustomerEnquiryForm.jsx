import { useParams, useSearchParams } from "react-router-dom";
import Header from "../Header";
import CustomerEnquiryHeading from "./components/CustomerEnquiryHeading";
import "./SCSS/style.scss";
import CustomerEnquiryInput from "./components/CustomerEnquiryInput";
import { useTranslation } from "react-i18next";
import { sendEvent } from "../../services/analytics-service";
import { CLICK, VIEW } from "../../services/constants";
import { useEffect } from "react";
import SEO from "../SEO";
import { seoData } from "../../utils/dynamicSEOData";
import HeaderDesktop from "../HeaderDesktop";

const CustomerEnquiryForm = () => {
  const { vehicleRegNumber, enquirySource, vehicleId, oem_name } = useParams();
  const [searchParams] = useSearchParams();
  const vehicle_type = searchParams.get("vehicle_type");
  const { t } = useTranslation();

  const enquiryHeadingDetails = {
    TEST_RIDE: {
      heading: t("CUSTOMER_ENQUIRY.BOOK_TEST_RIDE_HEADER"),
      description: t("CUSTOMER_ENQUIRY.BOOK_TEST_RIDE_DESCRIPTION"),
      title: t("CUSTOMER_ENQUIRY.BOOK_TEST_RIDE_TITLE"),
    },
    FREE_INSPECTION: {
      heading: t("CUSTOMER_ENQUIRY.BOOK_INSPECTION_HEADER"),
      description: t("CUSTOMER_ENQUIRY.BOOK_INSPECTION_DESCRIPTION"),
      title: t("CUSTOMER_ENQUIRY.BOOK_INSPECTION_TITLE"),
    },
  };

  const handleTestRideFormView = () => {
    const eventBody = {
      flowContext: `BUY_TEST_RIDE_FORM_VIEW`,
      action: VIEW,
      source_page: window.location.pathname,
      vehicleId,
      registration_number: vehicleRegNumber,
      oem_name,
      vehicle_type,
    };
    sendEvent(eventBody);
  };

  const handleTestRideFormSubmitClick = (customer_name, mobile_number) => {
    const eventBody = {
      flowContext: `BUY_TEST_RIDE_FORM_SUBMIT`,
      action: CLICK,
      source_page: window.location.pathname,
      vehicleId,
      registration_number: vehicleRegNumber,
      oem_name,
      customer_name,
      mobile_number,
      vehicle_type,
    };
    sendEvent(eventBody);
  };

  const handleSellEnquiryFormView = () => {
    const eventBody = {
      flowContext: `SELL_ENQUIRY_FORM_VIEW`,
      source_page: window.location.pathname,
      action: VIEW,
    };
    sendEvent(eventBody);
  };

  const handleSellEnquiryFormSubmitClick = (customer_name, mobile_number) => {
    const eventBody = {
      flowContext: `SELL_ENQUIRY_FORM_SUBMIT`,
      action: CLICK,
      source_page: window.location.pathname,
      customer_name,
      mobile_number,
    };
    sendEvent(eventBody);
  };

  const handleEnquirySubmitClick = () => {
    if (enquirySource === "TEST_RIDE") handleTestRideFormSubmitClick();
    if (enquirySource === "FREE_INSPECTION") handleSellEnquiryFormSubmitClick();
  };

  useEffect(() => {
    if (enquirySource === "TEST_RIDE") handleTestRideFormView();
    if (enquirySource === "FREE_INSPECTION") handleSellEnquiryFormView();
  }, []);

  return (
    <div className="customer_enquiry_page">
      <HeaderDesktop
        header_name={enquiryHeadingDetails?.[enquirySource]?.title}
        show_location_btn={false}
      />
      <SEO data={seoData.DEFAULT} />

      <div className="container mx-auto" style={{ maxWidth: "600px" }}>
        <div className="user_contact_form_container py-4">
          <CustomerEnquiryHeading
            details={enquiryHeadingDetails?.[enquirySource]}
          />
          <CustomerEnquiryInput
            vehicleRegNumber={vehicleRegNumber}
            enquirySource={enquirySource}
            handleEnquirySubmitClick={handleEnquirySubmitClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerEnquiryForm;
