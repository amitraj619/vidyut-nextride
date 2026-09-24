import { useLocation, useNavigate } from "react-router-dom";
import "../SCSS/style.scss";
import { sendEvent } from "../../services/analytics-service";
import { CLICK } from "../../services/constants";

const CuratedCard = ({
  curated_img_url,
  curated_name,
  curated_category,
  curated_btn_name,
  curated_link,
  curated_cta_text,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (link, curated_cta_text) => {
    const eventBody = {
      flowContext: `CURATED_SECTION_CLICK`,
      action: CLICK,
      source_page: window.location.pathname,
      cta_text: curated_cta_text,
    };
    sendEvent(eventBody);
    navigate({
      pathname: link,
      search: location.search,
    });
  };

  return (
    <div className="curated_card">
      <div className="curated_image">
        <img
          src={curated_img_url}
          alt={curated_btn_name}
          title={curated_name}
          loading="lazy"
        />
      </div>
      <div className="curated_body_container">
        <span className="curated_card_category">{curated_category}</span>
        <h2 className="curated_name">{curated_name}</h2>
        <button
          className="btn w-100 secondary_btn curated_btn"
          onClick={() => handleNavigate(curated_link, curated_cta_text)}
        >
          {curated_btn_name}
        </button>
      </div>
    </div>
  );
};

export default CuratedCard;
