import PageWrapper from "../../common-components/PageWrapper";
import Header from "../../common-components/Header";
import { purple_right_arrow_icon } from "../../assets/SVGIcons/CommonIcons";
import VehicleCardsSection from "./components/VehicleCardsSection";
import BuyEVBanner from "./components/BuyEVBanner";
import { useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense, useContext, useEffect } from "react";
import { GeneralFilterContext } from "../../context/VehicleListProvider";
import { useTranslation } from "react-i18next";
import ComingSoonCities from "../../common-components/ComingSoonCities";
import { CLICK, VIEW } from "../../services/constants";
import { sendEvent } from "../../services/analytics-service";
import { useScrollToTop } from "../../customHooks/useScrollToTop";
import SEO from "../../common-components/SEO";
import { seoData } from "../../utils/dynamicSEOData";
import WhyChooseNextRide from "../../common-components/WhyChooseNextRide";
import CommonSkeleton from "../../common-components/skeletons/CommonSkeleton";

const FindMyEvSection = lazy(() =>
  import("../../common-components/FindMyEvSection")
);
const BuyEVByBrands = lazy(() =>
  import("../../common-components/BuyEVByBrands")
);
const CustomerReviews = lazy(() =>
  import("../../common-components/CustomerReviews")
);
const FAQSection = lazy(() => import("../../common-components/FAQSection"));
const Footer = lazy(() => import("../../common-components/Footer"));

const BuyUsedEV = () => {
  const { t } = useTranslation();
  const { appliedFilters, setSelectedFilterDraft } =
    useContext(GeneralFilterContext);
  const navigate = useNavigate();
  const location = useLocation();

  useScrollToTop([], "instant");

  const handleBrowseAllEVs = () => {
    setSelectedFilterDraft(appliedFilters);

    navigate({ pathname: "all-ev-vehicles", search: location.search });
    queueMicrotask(() => {
      sendEvent({
        flowContext: `BUY_LANDING_PAGE_VIEW_MORE_CLICK`,
        action: CLICK,
        source_page: window.location.pathname,
      });
    });
  };

  useEffect(() => {
    queueMicrotask(() => {
      sendEvent({
        flowContext: `BUY_LANDING_PAGE_VIEW`,
        action: VIEW,
        source_page: window.location.pathname,
      });
    });
  }, []);

  return (
    <PageWrapper isScrollEventRequired>
      <SEO data={seoData.BUY_PAGE} />
      <Header
        header_name={t("BUY_USED_EV.PAGE_TITLE")}
        navigate_url={window.location.pathname?.split("buy-used-ev")[0]}
        show_whatsapp_icon
      />
      <ComingSoonCities />
      <BuyEVBanner />
      <VehicleCardsSection>
        <button
          className="btn secondary_btn full_width_btn w-100"
          onClick={handleBrowseAllEVs}
          data-aos="fade-up"
        >
          {t("EVS_FOR_SALE.VIEW_MORE_EVS")}
          <span className="btn_arrow_icon">{purple_right_arrow_icon}</span>
        </button>
      </VehicleCardsSection>
      <WhyChooseNextRide cardType="buy" />

      <Suspense fallback={<CommonSkeleton />}>
        <FindMyEvSection />
        <BuyEVByBrands />
        <CustomerReviews />
        <FAQSection type="buy" />
        <Footer />
      </Suspense>
    </PageWrapper>
  );
};

export default BuyUsedEV;
