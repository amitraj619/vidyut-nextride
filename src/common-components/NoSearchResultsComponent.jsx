import { useNavigate } from "react-router-dom";
import sad_emoji from "../assets/images/sad_emoji.webp";
import "./SCSS/style.scss";
import { useTranslation } from "react-i18next";

const NoSearchResultsComponent = ({
  noResultsMsg = "",
  showBtn = false,
  noResultsBtnText = "",
  navigateURL = {},
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="no_results_container">
      <div className="inner_container">
        <img src={sad_emoji} alt="" />
        <h3 className="no_results_title">
          {t("VEHICLES_LISTING.NO_RESULTS.TITLE")}
        </h3>
        <div className="no_results_text">{noResultsMsg}</div>

        {showBtn && (
          <button
            className="btn primary_btn"
            onClick={() =>
              navigate({
                pathname: navigateURL?.pathname,
                search: navigateURL?.search,
              })
            }
          >
            {noResultsBtnText}
          </button>
        )}
      </div>
    </div>
  );
};

export default NoSearchResultsComponent;
