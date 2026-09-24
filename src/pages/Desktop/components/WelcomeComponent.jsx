import nextride_logo from "../../../assets/images/nextride_big_logo.webp";
import thunder_fade_icon from "../../../assets/images/thunder_fade_icon.webp";

const WelcomeComponent = () => {
  return (
    <div className="left_top_section">
      <div className="welcome_badge">Welcome to</div>
      <div className="platform_logo">
        <img src={nextride_logo} alt="" />
      </div>
      <div className="thunder_fade_logo">
        <img src={thunder_fade_icon} alt="thunder" />
      </div>
    </div>
  );
};

export default WelcomeComponent;
