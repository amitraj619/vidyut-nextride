import ComingSoonCitiesComponent from "../../common-components/ComingSoonCitiesComponent";
import PageWrapper from "../../common-components/PageWrapper";
import { useEffect } from "react";
import SEO from "../../common-components/SEO";
import { seoData } from "../../utils/dynamicSEOData";
import HeaderDesktop from "../../common-components/HeaderDesktop";

const ComingSoonCitiesPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    return () => {
      // Revert back when user leaves the page
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <PageWrapper>
      <HeaderDesktop is_root={true} show_whatsapp_icon />
      <SEO data={seoData.DEFAULT} />
      <ComingSoonCitiesComponent />
    </PageWrapper>
  );
};

export default ComingSoonCitiesPage;
