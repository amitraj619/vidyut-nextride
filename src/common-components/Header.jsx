import {
  useContext,
  useState,
  useEffect,
  Suspense,
  lazy,
  useMemo,
  useCallback,
} from "react";
import {
  burger_icon,
  left_arrow_icon,
  location_icon,
  purple_down_arrow_icon,
} from "../assets/SVGIcons/CommonIcons";
import nextride_logo from "../assets/images/nextride_logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationContext } from "../context/LocationContext";
import whatsapp_icon from "../assets/images/whatsapp_icon.svg";
import { useEVsNearYouFilter } from "../context/VehicleListProvider";
import { CLICK } from "../services/constants";
import { sendEvent } from "../services/analytics-service";
import Loader from "./Loader";
import LanguageToggleSwitch from "./LanguageToggleSwitch";
import { Helmet } from "react-helmet";
import { CustomSkeleton } from "./skeletons/CommonSkeleton";

const SelectLanguage = lazy(() => import("./SelectLanguage"));
const SelectLocation = lazy(() => import("./location/SelectLocation"));

const Header = ({
  is_root = false,
  header_name,
  show_location_btn = true,
  navigate_url = null,
  loading = false,
  show_whatsapp_icon = false,
  whatsapp_icon_bottom_height = "",
}) => {
  const [selectLocationBottomSheet, setSelectLocationBottomSheet] =
    useState(false);
  const [isLanguageSelectionOpen, setIsLanguageSelectionOpen] = useState(false);

  const { citiesData, selectedLocation } = useContext(LocationContext);
  const navigate = useNavigate();
  const { vehicleList, loading: isEvListLoading } = useEVsNearYouFilter();
  const location = useLocation();

  // Memoized selected city to prevent unnecessary re-renders
  const selectedCityName = useMemo(() => {
    const city = citiesData?.find(
      (ele) =>
        String(ele?.name)?.toLowerCase() ===
        String(selectedLocation)?.toLowerCase()
    );
    return city?.name || "";
  }, [citiesData, selectedLocation]);

  // Callbacks
  const handleCityBottomSheetVisible = useCallback((value) => {
    sendEvent({
      flowContext: "CITY_SELECTION",
      action: CLICK,
      source_page: window.location.pathname,
    });
    setSelectLocationBottomSheet(value);
  }, []);

  const handleLanguageSheetVisible = useCallback(
    (value, isUserClick = false) => {
      setIsLanguageSelectionOpen(value);
      if (isUserClick) {
        sendEvent({
          flowContext: "MENU_CLICK",
          action: CLICK,
          source_page: window.location.pathname,
        });
      }
    },
    []
  );

  const handleCloseLocationBottomSheet = useCallback(() => {
    setSelectLocationBottomSheet(false);
  }, []);

  const handleWhatsappClick = useCallback(() => {
    sendEvent({
      flowContext: "WHATSAPP_CLICK",
      action: CLICK,
      source_page: window.location.pathname,
    });
    window.open("https://wa.me/917090001401", "_blank");
  }, []);

  // Effect: redirect based on vehicle list & explore flag
  useEffect(() => {
    if (isEvListLoading) return;
    const isComingSoonPage = window.location.pathname.endsWith("coming-soon");
    const isExplore = sessionStorage.getItem("exploreNextride") === "false";

    if (vehicleList?.length === 0 && isExplore) {
      if (!isComingSoonPage) {
        navigate(
          { pathname: "coming-soon", search: location.search },
          { replace: true }
        );
      }
      sessionStorage.setItem("exploreNextride", true);
    } else if (vehicleList?.length > 0 && isComingSoonPage) {
      navigate(
        {
          pathname: location.pathname.split("coming-soon")[0],
          search: location.search,
        },
        { replace: true }
      );
    }
  }, [
    vehicleList,
    isEvListLoading,
    location.pathname,
    location.search,
    navigate,
  ]);

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={nextride_logo}
          fetchpriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={whatsapp_icon}
          fetchpriority="high"
        />
      </Helmet>

      <div className="header_container">
        <div className="left_header_part">
          <div className="burger_icon">
            {is_root ? (
              <button
                className="btn"
                aria-label="Open language change menu"
                onClick={() => handleLanguageSheetVisible(true, true)}
              >
                {burger_icon}
              </button>
            ) : (
              <button
                className="btn"
                aria-label="Back navigation"
                onClick={() =>
                  navigate_url
                    ? navigate({
                        pathname: navigate_url,
                        search: location.search,
                      })
                    : navigate(-1)
                }
              >
                {left_arrow_icon}
              </button>
            )}
          </div>
          {is_root ? (
            <img
              src={nextride_logo}
              alt="nextride"
              fetchPriority="high"
              width={119}
              height={24}
              onClick={() =>
                navigate({ pathname: "/", search: location.search })
              }
            />
          ) : (
            <div className="header_name">
              {loading ? (
                <CustomSkeleton height={27} width={150} />
              ) : (
                header_name
              )}
            </div>
          )}
        </div>
        {show_location_btn && (
          <button
            className="right_header_part btn"
            onClick={() => handleCityBottomSheetVisible(true)}
          >
            {location_icon}{" "}
            <span>
              {selectedCityName || <CustomSkeleton width={76} height={27} />}
            </span>{" "}
            {purple_down_arrow_icon}
          </button>
        )}
      </div>

      {/* Lazy-loaded sheets */}
      <Suspense fallback={null}>
        <SelectLocation
          selectCityBottomSheet={selectLocationBottomSheet}
          closeBottomSheet={handleCloseLocationBottomSheet}
          openCityBottomSheet={() => handleCityBottomSheetVisible(true)}
        />
        <SelectLanguage
          isOpen={isLanguageSelectionOpen}
          closeLanguageSelectionSheet={handleLanguageSheetVisible}
        />
      </Suspense>

      {/* Overlay loader */}
      {!selectLocationBottomSheet && !selectedCityName && (
        <div
          className={`location_selection_overlay ${
            sessionStorage.getItem("city") ? "d-none" : "d-flex"
          }`}
          onClick={() => handleCityBottomSheetVisible(true)}
        >
          <Loader text="Fetching city..." status />
        </div>
      )}

      {/* WhatsApp icon */}
      {show_whatsapp_icon && (
        <div
          className="whats_app_icon"
          style={{
            bottom: whatsapp_icon_bottom_height,
            left:
              sessionStorage.getItem("isDesktopViewEnable") === "true"
                ? window.innerWidth / 2 + 116
                : undefined,
          }}
          onClick={handleWhatsappClick}
        >
          <img
            src={whatsapp_icon}
            alt="whatsapp"
            width={48}
            height={48}
            fetchPriority="high"
          />
        </div>
      )}

      <LanguageToggleSwitch
        styles={{
          bottom: whatsapp_icon_bottom_height,
          left:
            sessionStorage.getItem("isDesktopViewEnable") === "true"
              ? window.innerWidth / 2 - 180
              : undefined,
        }}
      />
    </>
  );
};

export default Header;
