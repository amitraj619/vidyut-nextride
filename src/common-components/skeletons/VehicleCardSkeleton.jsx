import { Skeleton } from "antd";
import "../SCSS/style.scss";

const VehicleCardSkeleton = ({ cardStyle, fade_up_delay }) => {
  return (
    <div
      className="vehicle_card"
      style={cardStyle}
      data-aos="fade-up"
      data-aos-delay={fade_up_delay * 100}
    >
      <div className="vehicle_image">
        <Skeleton.Image active className="image_skeleton" />
      </div>
      <div className="vehicle_details_container">
        <h2 className="vehicle_name">
          <Skeleton.Button active size="small" style={{ width: "254px" }} />
        </h2>
        <div className="vehicle_details">
          <Skeleton.Button active style={{ height: "24px", width: "77px" }} />
          <Skeleton.Button active style={{ height: "24px", width: "24px" }} />
        </div>
        <div className="price_details">
          <div className="emi_starts">
            <label>
              <Skeleton.Button
                active
                style={{ height: "16px", width: "65px" }}
              />
            </label>
            <div className="emi_price">
              <Skeleton.Button
                active
                style={{ height: "16px", width: "65px" }}
              />
            </div>
          </div>
          <div className="vehicle_price">
            <Skeleton.Button active style={{ width: "85px", height: "36px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCardSkeleton;
