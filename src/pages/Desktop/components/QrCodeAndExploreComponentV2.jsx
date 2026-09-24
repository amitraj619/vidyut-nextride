import explore_icon from "../../../assets/images/explore_icon.webp";
import { IoIosArrowForward } from "react-icons/io";
import or_line_left from "../../../assets/images/or_line_left.webp";
import or_line_right from "../../../assets/images/or_line_right.webp";
import { QRCode } from "antd";
import { PROD_SITE_URL, UAT_SITE_URL } from "../../../services/constants";
import { isPROD } from "../../../utils/EnvUtils";
import { motion } from "framer-motion";

const QrCodeAndExploreComponentV2 = ({ handleExploreDesktopView }) => {
  const SITE_URL = isPROD() ? PROD_SITE_URL : UAT_SITE_URL;

  return (
    <motion.div
      className="qr_code_and_explore"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
    >
      <div className="explore_nextride_block">
        <div className="explore_nextride_txt">
          <img
            src={explore_icon}
            alt="explore"
            title="explore_nextride"
            fetchPriority="high"
          />
          <h2>Explore nextride now</h2>
        </div>
        <button
          className="explore_nextride_btn primary_btn btn"
          onClick={() => handleExploreDesktopView(true)}
        >
          Explore <IoIosArrowForward className="explore_arrow" />
        </button>
      </div>

      <div className="or_block">
        <img
          src={or_line_left}
          alt="line 1"
          title="line_1"
          fetchPriority="high"
        />
        <div className="or_txt">OR</div>
        <img
          src={or_line_right}
          alt="line 2"
          title="line_2"
          fetchPriority="high"
        />
      </div>

      <div className="scan_qr_code_section">
        <p className="qr_code_txt">For a better experience on phone</p>
        <div className="qr_code_image">
          <QRCode type="svg" value={SITE_URL} size={200} />
        </div>
        <div className="scan_this_qr_txt">Scan this QR</div>
      </div>
    </motion.div>
  );
};

export default QrCodeAndExploreComponentV2;
