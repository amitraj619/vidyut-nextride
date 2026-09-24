import nextride_logo from "../../../assets/images/nextride_welcome_logo.svg";
import { motion } from "framer-motion";

const WelcomeComponentV2 = () => {
  return (
    <motion.div
      className="welcome_to_section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
    >
      <div className="welcome_block">
        <div className="welcome_to_txt">Welcome to</div>
        <div className="platform_logo">
          <img
            src={nextride_logo}
            alt="nextride logo"
            title="nextride"
            fetchPriority="high"
          />
        </div>
      </div>
      <p className="best_platform_txt">
        India’s best platform to buy and sell EV
      </p>
    </motion.div>
  );
};

export default WelcomeComponentV2;
