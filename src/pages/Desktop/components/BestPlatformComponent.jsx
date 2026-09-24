import platform_mobile_view from "../../../assets/images/platform_mobile_view.webp";

const BestPlatformComponent = () => {
  return (
    <div className="best_platform_section">
      <div className="best_platform_typo">
        <p>India’s best platform to</p>
        <h4>
          Buy and sell used <br />
          EV
        </h4>
      </div>
      <div className="best_platform_img_container">
        <img src={platform_mobile_view} alt="platform_mobile_view" />
        <div className="bottom_background_color">
          <div className="top_pattern_color"></div>
        </div>
      </div>
    </div>
  );
};

export default BestPlatformComponent;
