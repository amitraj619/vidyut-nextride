import "./SCSS/style.scss";
import WelcomeComponent from "./components/WelcomeComponent";
import BestPlatformComponent from "./components/BestPlatformComponent";
import QrCodeComponent from "./components/QrCodeComponent";
import KeyPointsComponent from "./components/KeyPointsComponent";
import CitiesComponent from "./components/CitiesComponent";

const DesktopDefaultPage = () => {
  return (
    <div className="desk_top_default_banner">
      {/* left section */}
      <div className="left_section">
        {/* Welcome component */}
        <WelcomeComponent />
        {/* bottom section */}
        <div className="bottom_section">
          {/* Best platform section */}
          <BestPlatformComponent />

          {/* QR code section */}
          <QrCodeComponent />
        </div>
      </div>

      {/* right section */}
      <div className="right_section">
        {/* key points */}
        <KeyPointsComponent />

        {/* cities */}
        <CitiesComponent />
      </div>
    </div>
  );
};

export default DesktopDefaultPage;
