import { Suspense, useEffect, lazy } from "react";
import PageWrapper from "../../common-components/PageWrapper";
import BuySellComponent from "../../common-components/BuySellComponent";
import CarouselBanner from "./components/CarouselBanner";
import Header from "../../common-components/Header";
import BuyEVByBrands from "../../common-components/BuyEVByBrands";
import ComingSoonCities from "../../common-components/ComingSoonCities";
import { sendEvent } from "../../services/analytics-service";
import { VIEW } from "../../services/constants";
import { useScrollToTop } from "../../customHooks/useScrollToTop";
import SEO from "../../common-components/SEO";
import { seoData } from "../../utils/dynamicSEOData";
import CommonSkeleton from "../../common-components/skeletons/CommonSkeleton";
import HeaderDesktop from "../../common-components/HeaderDesktop";
import HeroSection from "./components/HeroSection";
import BrandAutoCarousel from "../../common-components/BrandAutoCarousel";

const WhyChooseNextRideV2 = lazy(
  () => import("../../common-components/WhyChooseNextRideV2"),
);
const FindMyEvSectionV2 = lazy(
  () => import("../../common-components/FindMyEvSectionV2"),
);
const CustomerReviewsV2 = lazy(
  () => import("../../common-components/CustomerReviewsV2"),
);
const CuratedForYou = lazy(
  () => import("../../common-components/CuratedForYou"),
);
const OurStorySoFarV2 = lazy(
  () => import("../../common-components/OurStorySoFarV2"),
);
const FAQSection = lazy(() => import("../../common-components/FAQSection"));
const Footer = lazy(() => import("../../common-components/Footer"));

const HomePage = () => {
  useScrollToTop([], "instant");

  useEffect(() => {
    if (sessionStorage.getItem("isFirstPaint") === null) {
      const eventBody = { flowContext: "HOME_PAGE_VIEW", action: VIEW };
      sendEvent(eventBody);
      sessionStorage.setItem("isFirstPaint", true);
    }
  }, []);
  return (
    <PageWrapper isScrollEventRequired>
      <SEO data={seoData.HOME} />
      <HeaderDesktop is_root={true} show_whatsapp_icon />
      <ComingSoonCities />
      <HeroSection />
      <BrandAutoCarousel />

      <Suspense fallback={<CommonSkeleton />}>
        <WhyChooseNextRideV2 />
        <FindMyEvSectionV2 />
        <CustomerReviewsV2 />
        <OurStorySoFarV2 />
        {/* <CuratedForYou /> */}
        <FAQSection />
        <Footer />
      </Suspense>
    </PageWrapper>
  );
};

export default HomePage;
