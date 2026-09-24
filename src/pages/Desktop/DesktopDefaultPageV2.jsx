import "./SCSS/styleV2.scss";
import WelcomeComponentV2 from "./components/WelcomeComponentV2";
import KeyPointsComponentV2 from "./components/KeyPointsComponentV2";
import CitiesComponentV2 from "./components/CitiesComponentV2";
import QrCodeAndExploreComponentV2 from "./components/QrCodeAndExploreComponentV2";
import NextridePhoneHoldingComponentV2 from "./components/NextridePhoneHoldingComponentV2";
import SEO from "../../common-components/SEO";
import { seoData } from "../../utils/dynamicSEOData";

const DesktopDefaultPageV2 = ({ handleExploreDesktopView }) => {
  return (
    <div className="desk_top_default_banner">
      <SEO data={seoData.HOME} />

      {/* left section */}
      <div className="left_section sections">
        <WelcomeComponentV2 />
        <KeyPointsComponentV2 />
      </div>

      {/* center section */}
      <div className="center_section sections">
        <QrCodeAndExploreComponentV2
          handleExploreDesktopView={handleExploreDesktopView}
        />
      </div>

      {/* right section */}
      <div className="right_section sections">
        <CitiesComponentV2 />
        <NextridePhoneHoldingComponentV2 />
      </div>
    </div>
  );
};

export default DesktopDefaultPageV2;
