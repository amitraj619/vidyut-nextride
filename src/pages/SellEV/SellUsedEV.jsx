import { lazy, Suspense, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useScrollToTop } from "../../customHooks/useScrollToTop";
import { sendEvent } from "../../services/analytics-service";
import { VIEW } from "../../services/constants";
import { seoData } from "../../utils/dynamicSEOData";

import PageWrapper from "../../common-components/PageWrapper";
import Header from "../../common-components/Header";
import SellEVBanner from "./components/SellEVBanner";
import WhyChooseNextRide from "../../common-components/WhyChooseNextRide";
import ComingSoonCities from "../../common-components/ComingSoonCities";
import SEO from "../../common-components/SEO";
import CommonSkeleton from "../../common-components/skeletons/CommonSkeleton";

const CustomerReviews = lazy(() =>
  import("../../common-components/CustomerReviews")
);
const OurStorySoFar = lazy(() =>
  import("../../common-components/OurStorySoFar")
);
const FAQSection = lazy(() => import("../../common-components/FAQSection"));
const Footer = lazy(() => import("../../common-components/Footer"));

const SellUsedEV = () => {
  const { t } = useTranslation();
  useScrollToTop([], "instant");

  useEffect(() => {
    sendEvent({
      flowContext: "SELL_LANDING_PAGE_VIEW",
      action: VIEW,
      source_page: window.location.pathname,
    });
  }, []);

  const headerName = t("SELL_EV_SECTION.HEADER");
  const navigateUrl = window.location.pathname?.split("sell-used-ev")[0];

  return (
    <PageWrapper isScrollEventRequired>
      <SEO data={seoData.SELL_PAGE} />
      <Header
        header_name={headerName}
        navigate_url={navigateUrl}
        show_whatsapp_icon
      />
      <ComingSoonCities />
      <SellEVBanner />
      <WhyChooseNextRide cardType="sell" />

      <Suspense fallback={<CommonSkeleton />}>
        <CustomerReviews />
        <OurStorySoFar />
        <FAQSection type="sell" />
        <Footer />
      </Suspense>
    </PageWrapper>
  );
};

SellUsedEV.displayName = "SellUsedEV";
export default memo(SellUsedEV);
