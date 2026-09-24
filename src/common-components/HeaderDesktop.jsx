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
const SelectLocation = lazy(() => import("./location/SelectLocationDesktop"));

const HeaderDesktop = ({
  is_root = false,
  header_name,
  show_location_btn = true,
  navigate_url = null,
  loading = false,
  show_whatsapp_icon = false,
  whatsapp_icon_bottom_height = "",
  onBackClick,
}) => {
  const [selectLocationBottomSheet, setSelectLocationBottomSheet] =
    useState(false);
  const [isLanguageSelectionOpen, setIsLanguageSelectionOpen] = useState(false);

  const { citiesData, selectedLocation } = useContext(LocationContext);
  const navigate = useNavigate();
  const { vehicleList, loading: isEvListLoading } = useEVsNearYouFilter();
  const location = useLocation();

  const selectedCityName = useMemo(() => {
    const city = citiesData?.find(
      (ele) =>
        String(ele?.name)?.toLowerCase() ===
        String(selectedLocation)?.toLowerCase(),
    );
    return city?.name || "";
  }, [citiesData, selectedLocation]);

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
    [],
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

  useEffect(() => {
    if (isEvListLoading) return;
    const isComingSoonPage = window.location.pathname.endsWith("coming-soon");
    const isExplore = sessionStorage.getItem("exploreNextride") === "false";

    if (vehicleList?.length === 0 && isExplore) {
      if (!isComingSoonPage) {
        navigate(
          { pathname: "coming-soon", search: location.search },
          { replace: true },
        );
      }
      sessionStorage.setItem("exploreNextride", true);
    } else if (vehicleList?.length > 0 && isComingSoonPage) {
      navigate(
        {
          pathname: location.pathname.split("coming-soon")[0],
          search: location.search,
        },
        { replace: true },
      );
    }
  }, [
    vehicleList,
    isEvListLoading,
    location.pathname,
    location.search,
    navigate,
  ]);

  const isDesktop = window.innerWidth >= 768;

  const floatingBottomMargin = isDesktop ? "24px" : "96px";

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={nextride_logo}
          fetchpriority="high"
        />
      </Helmet>

      <div
        style={{
          width: "100%",
          padding: isDesktop ? "16px 32px" : "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #eee",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {!is_root && (
            <button
              className="btn"
              onClick={() => {
                if (onBackClick) {
                  onBackClick();
                } else if (navigate_url) {
                  navigate({
                    pathname: navigate_url,
                    search: location.search,
                  });
                } else {
                  navigate(-1);
                }
              }}
            >
              {left_arrow_icon}
            </button>
          )}

          {is_root ? (
            <img
              src={nextride_logo}
              alt="nextride"
              width={isDesktop ? 140 : 110}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate({ pathname: "/", search: location.search })
              }
            />
          ) : (
            <div
              style={{
                fontSize: isDesktop ? "1.4rem" : "1.1rem",
                fontWeight: 600,
                color: "#212121",
              }}
            >
              {loading ? (
                <CustomSkeleton height={24} width={160} />
              ) : (
                header_name
              )}
            </div>
          )}
        </div>

        {show_location_btn && (
          <button
            className="btn"
            onClick={() => handleCityBottomSheetVisible(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: isDesktop ? "8px 14px" : "6px 10px",
              borderRadius: "10px",
              background: "#f6f7fb",
              border: "1px solid #e6e6e6",
              fontWeight: 500,
            }}
          >
            {location_icon}
            <span>
              {selectedCityName || <CustomSkeleton width={70} height={20} />}
            </span>
            {purple_down_arrow_icon}
          </button>
        )}
      </div>

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

      {/* LANGUAGE TOGGLE FLOATING (LEFT) */}
      <LanguageToggleSwitch
        styles={{
          position: "fixed",
          bottom: floatingBottomMargin,
          left: "18px",
          zIndex: 100,
          transition: "bottom 0.3s ease-in-out",
        }}
      />

      {/* WHATSAPP FLOATING (RIGHT) */}
      {show_whatsapp_icon && (
        <div
          style={{
            position: "fixed",
            bottom: whatsapp_icon_bottom_height || floatingBottomMargin,
            right: "24px",
            zIndex: 100,
            cursor: "pointer",
            transition: "bottom 0.3s ease-in-out",
          }}
          onClick={handleWhatsappClick}
        >
          <img src={whatsapp_icon} width={48} height={48} alt="whatsapp" />
        </div>
      )}
    </>
  );
};

export default HeaderDesktop;
