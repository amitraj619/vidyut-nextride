import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { CLICK } from "../services/constants";
import { sendEvent } from "../services/analytics-service";

const ComingSoonCitiesComponent = () => {
  const { t } = useTranslation();
  const { selectedLocation } = useContext(LocationContext);
  const navigate = useNavigate();
  const location = useLocation();

  const basePath = location.pathname.split("coming-soon")[0];

  const handleExploreNextride = () => {
    const eventBody = {
      flowContext: `COMING_SOON_CITY_EXPLORE_CTA_CLICK`,
      action: CLICK,
      source_page: window.location.pathname,
    };
    sendEvent(eventBody);

    navigate(
      { pathname: basePath, search: location.search },
      { replace: true },
    );
    sessionStorage.setItem("exploreNextride", true);
  };

  return (
    <div
      className="coming_soon_cities_component"
      style={{
        height: "calc(100dvh - 64px)",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      <div className="inner_coming_soon_component text-center">
        <div className="d-flex flex-column" style={{ gap: "16px" }}>
          <h3>{t("COMING_SOON.TITLE")}</h3>
          <p>{t("COMING_SOON.IN_CITY", { city: selectedLocation })}</p>
        </div>
        <button
          className="btn explore_nextride_btn primary_btn"
          onClick={handleExploreNextride}
        >
          {t("COMING_SOON.EXPLORE_NEXTRIDE_BUTTON")}
        </button>
      </div>
    </div>
  );
};

export default ComingSoonCitiesComponent;
