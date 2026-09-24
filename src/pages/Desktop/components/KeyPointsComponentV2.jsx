import vehicles_image from "../../../assets/images/vehicles_image.webp";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const KeyPointsComponentV2 = () => {
  return (
    <motion.div
      className="key_points_box"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.35 }}
    >
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
        <img
          src={vehicles_image}
          alt="vehicles"
          title="EV vehicles"
          fetchPriority="high"
          width={421}
          height={304}
        />
        <div className="bottom_background_color"></div>
      </div>
    </motion.div>
  );
};

export default KeyPointsComponentV2;
