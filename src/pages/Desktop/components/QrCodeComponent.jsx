import scan_qr_up_arrow from "../../../assets/images/scan_qr_up_arrow.webp";
import { QRCode } from "antd";
import { isPROD } from "../../../utils/EnvUtils";
import { PROD_SITE_URL, UAT_SITE_URL } from "../../../services/constants";

const QrCodeComponent = () => {
  const SITE_URL = isPROD() ? PROD_SITE_URL : UAT_SITE_URL;

  return (
    <div className="scan_qr_code_section">
      <div className="qr_code_image">
        <QRCode type="svg" value={SITE_URL} size={292} />
      </div>
      <div className="scan_code_section">
        <div className="scan_qr_btns">
          <div className="rectangular_btn">SCAN QR</div>
          <div className="arrow_btn">
            <img src={scan_qr_up_arrow} alt="scan_qr_up_arrow" />
          </div>
        </div>
        <p>to access NextRide on mobile</p>
      </div>
    </div>
  );
};

export default QrCodeComponent;
