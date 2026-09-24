import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { location_icon } from "../../../assets/SVGIcons/CommonIcons";
import { useTranslation } from "react-i18next";
import "../SCSS/style.scss";

const SearchYourCity = ({ searchQuery, setSearchQuery, fetchUserLocation }) => {
  const { t } = useTranslation();

  return (
    <div className="search_your_city">
      <div className="search_city_wrapper">
        <IoIosSearch className="search_icon" />
        <input
          type="search"
          placeholder={t("LOCATION.SEARCH_YOUR_CITY") || "Search your city"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        {searchQuery && (
          <RxCross2
            className="clear_icon"
            onClick={() => setSearchQuery("")}
            title="Clear search"
          />
        )}
      </div>

      <div
        className="use_current_location"
        onClick={() => fetchUserLocation(true)}
      >
        <span className="location_icon_wrapper">{location_icon}</span>
        <span>
          {t("LOCATION.USE_CURRENT_LOCATION") || "Use current location"}
        </span>
      </div>
    </div>
  );
};

export default SearchYourCity;
