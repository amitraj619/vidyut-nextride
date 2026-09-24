import vehicles_image from "../../../assets/images/vehicles_image.webp";
import Marquee from "react-fast-marquee";

const KeyPointsComponent = () => {
  return (
    <div className="key_points_box">
      <div className="key_points_marquee_container">
        <Marquee speed={15} className="key_points_typo">
          • 100+ steps quality check • Up to 3 years of warranty • Free RC
          transfer and insurance
        </Marquee>
        <Marquee speed={30} className="key_points_typo">
          • 100+ steps quality check • Up to 3 years of warranty • Free RC
          transfer and insurance
        </Marquee>
        <Marquee speed={25} className="key_points_typo">
          • 100+ steps quality check • Up to 3 years of warranty • Free RC
          transfer and insurance
        </Marquee>
      </div>
      <div className="key_points_img_container">
        <img src={vehicles_image} alt="vehicles" />
        <div className="bottom_background_color"></div>
      </div>
    </div>
  );
};

export default KeyPointsComponent;
