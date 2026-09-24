import india_map from "../../../assets/images/india_map_delhi.webp";
import { motion } from "framer-motion";

const CitiesComponentV2 = () => {
  return (
    <motion.div
      className="cities_box"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.15 }}
    >
      <div className="cities_typo">
        <h3>In Delhi NCR</h3>
        <p>coming soon to more cities</p>
      </div>

      <div className="cities_img_container">
        <img src={india_map} alt="map" title="india map" fetchPriority="high" />
      </div>
    </motion.div>
  );
};

export default CitiesComponentV2;
