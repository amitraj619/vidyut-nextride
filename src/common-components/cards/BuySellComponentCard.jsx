import { right_arrow_icon } from "../../assets/SVGIcons/CommonIcons";
import { useLocation, useNavigate } from "react-router-dom";
import "../SCSS/style.scss";
import { sendEvent } from "../../services/analytics-service";
import { CLICK } from "../../services/constants";
import { trackCustomEvent } from "../../utils/facebookPixelHelper";

const BuySellComponentCard = ({
  icon,
  card_title,
  card_heading,
  card_text,
  navigate_url,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () => {
    const eventBody = {
      flowContext:
        card_title === "Buy" ? "BUY_ENTRY_CLICK" : "SELL_ENTRY_CLICK",
      action: CLICK,
      source_page: window.location.pathname,
    };
    sendEvent(eventBody);
    trackCustomEvent("CardClick", { card_title });
    navigate({ pathname: navigate_url, search: location.search });
  };

  return (
    <div className="buy_sell_card" onClick={handleNavigate}>
      <div className="icon">{icon}</div>
      <div className="buy_sell_content">
        <div className="card_heading">
          <h3>{card_heading}</h3>
          <p>{card_text}</p>
        </div>
        <div>{right_arrow_icon}</div>
      </div>
    </div>
  );
};

export default BuySellComponentCard;
