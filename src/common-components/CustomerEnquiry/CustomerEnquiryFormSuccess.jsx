import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { trackCustomEvent } from "../../utils/facebookPixelHelper";
import success_animation from "../../assets/animations/success_animation.json";
import Lottie from "lottie-react";
import "./SCSS/style.scss";
import { useTranslation } from "react-i18next";
import SEO from "../SEO";
import { seoData } from "../../utils/dynamicSEOData";

const CustomerEnquiryFormSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const { enquirySource, oem_name } = useParams();

  const basePath = location.pathname.split("/thankyou")[0];

  const getMessage = () => {
    if (enquirySource === "TEST_RIDE")
      return t("CUSTOMER_ENQUIRY.SUCCESS.BOOK_TEST_RIDE_MESSAGE", {
        oem: oem_name,
        model: searchParams.get("model"),
      });
    else if (enquirySource === "FREE_INSPECTION")
      return t("CUSTOMER_ENQUIRY.SUCCESS.BOOK_INSPECTION_MESSAGE", {
        oem: oem_name,
        model: searchParams.get("model"),
      });
  };

  useEffect(() => {
    trackCustomEvent("Lead");
  }, []);

  const onGoBack = () => {
    basePath === "" ? navigate(-1) : navigate(-2);
  };

  return (
    <div
      className="form_success_page container mx-auto"
      style={{ maxWidth: "500px" }}
    >
      <SEO data={seoData.DEFAULT} />
      <div className="success_container">
        <Lottie
          animationData={success_animation}
          loop={false}
          autoplay
          className="success_animation"
        />
        <div className="success_content">
          <h3>
            {t("CUSTOMER_ENQUIRY.SUCCESS.THANKS", {
              customer_name: searchParams.get("customerName"),
            })}
          </h3>
          <p>{getMessage()}</p>
        </div>
      </div>

      <div className="mt-4 w-100">
        <button
          className="btn primary_btn full_width_btn w-100"
          onClick={onGoBack}
        >
          {t("CUSTOMER_ENQUIRY.SUCCESS.GO_BACK")}
        </button>
      </div>
    </div>
  );
};

export default CustomerEnquiryFormSuccess;
