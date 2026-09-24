import nextride_phone_mock from "../../../assets/images/nextride_phone_mock.webp";
import { motion } from "framer-motion";

const NextridePhoneHoldingComponentV2 = () => {
  return (
    <motion.div
      className="nextride_phone_view"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
    >
      <img
        src={nextride_phone_mock}
        alt="holding phone"
        title="phone view"
        fetchPriority="high"
      />
    </motion.div>
  );
};

export default NextridePhoneHoldingComponentV2;
