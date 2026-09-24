import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import "./SCSS/style.scss";
import { Modal } from "antd";
import PopularCities from "./components/PopularCities";
import { getCitiesList, getLocation } from "../../services/commonServices";
import SearchYourCity from "./components/SearchYourCity";
import { LocationContext } from "../../context/LocationContext";
import {
  useBrandFilter,
  useEVsNearYouFilter,
  useGeneralFilter,
  useQuizFilter,
} from "../../context/VehicleListProvider";
import { useTranslation } from "react-i18next";
import {
  CLICK,
  ENGLISH_PREFERRED_CITIES,
  USER_PINNED_LANGUAGE,
} from "../../services/constants";
import { sendEvent } from "../../services/analytics-service";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";

const SelectLocationDesktop = ({
  selectCityBottomSheet,
  closeBottomSheet,
  openCityBottomSheet,
}) => {
  const { selectedLocation, setSelectedLocation, citiesData, setCitiesData } =
    useContext(LocationContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const oem = searchParams.get("oem")?.split(",") || [];
  const [loading, setLoading] = useState(false);

  const {
    setSelectedFilterDraft: setEVsNearYouFilterDraft,
    applyNewFilters: applyEVsNearYouFilters,
    appliedFilters: appliedEVsNearYouFilters,
  } = useEVsNearYouFilter();

  const {
    setSelectedFilterDraft: setGeneralFilterDraft,
    applyNewFilters: applyGeneralFilters,
    appliedFilters: appliedGeneralFilters,
  } = useGeneralFilter();

  const {
    setSelectedFilterDraft: setBrandFilterDraft,
    applyNewFilters: applyBrandFilters,
    appliedFilters: appliedBrandFilters,
  } = useBrandFilter();

  const {
    setSelectedFilterDraft: setQuizFilterDraft,
    applyNewFilters: applyQuizBrandFilters,
    appliedFilters: appliedQuizBrandFilters,
  } = useQuizFilter();

  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();

  const modalStyles = useMemo(
    () => ({
      body: {
        padding: "0 clamp(12px, 4vw, 32px) clamp(16px, 5vw, 32px)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      },
      header: {
        padding: "clamp(20px, 5vw, 32px) clamp(12px, 4vw, 32px) 24px",
        borderBottom: "none",
        textAlign: "center",
      },
      content: {
        borderRadius: "24px",
        boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
        border: "none",
      },
      mask: {
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(26, 26, 46, 0.7)",
      },
    }),
    [],
  );

  const fetchCities = useCallback(async () => {
    const res = await getCitiesList();
    if (res?.status) {
      const sortedCities = res.data?.cities?.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      );
      setCitiesData(sortedCities);
    }
  }, [setCitiesData]);

  const handleLocationSelect = useCallback(
    (value, isUserAction = false) => {
      const selectedCity = citiesData?.find(
        (ele) =>
          String(ele?.name)?.toLowerCase() === String(value)?.toLowerCase(),
      );
      if (!selectedCity) return;

      const prevCity = sessionStorage.getItem("city");
      const cityKey = selectedCity?.cityGroups?.length
        ? selectedCity?.cityGroups
        : [selectedCity?.key];
      const cityName = selectedCity?.name;

      sessionStorage.setItem("city", cityName);
      setSelectedLocation(cityName);

      const userPinnedLang = sessionStorage.getItem(USER_PINNED_LANGUAGE);
      if (!userPinnedLang) {
        const targetLang = ENGLISH_PREFERRED_CITIES.has(
          cityName.trim().toLowerCase(),
        )
          ? "en"
          : "hi";

        if (i18n.language !== targetLang) {
          i18n.changeLanguage(targetLang);
        }
      }

      if (isUserAction) {
        sendEvent({
          flowContext: `CITY_SELECTED`,
          action: CLICK,
          source_page: window.location.pathname,
          prev_city: prevCity,
        });
      }

      setGeneralFilterDraft(() => {
        const updatedDraft = { ...appliedGeneralFilters, city: cityKey };
        applyGeneralFilters(updatedDraft);
        return updatedDraft;
      });

      setEVsNearYouFilterDraft(() => {
        const updatedDraft = { ...appliedEVsNearYouFilters, city: cityKey };
        applyEVsNearYouFilters(updatedDraft, 4);
        sessionStorage.setItem("exploreNextride", false);
        return updatedDraft;
      });

      setBrandFilterDraft(() => {
        const updatedDraft = {
          ...appliedBrandFilters,
          city: cityKey,
          oem: oem.length ? oem : appliedBrandFilters.oem,
        };
        applyBrandFilters(updatedDraft);
        return updatedDraft;
      });

      setQuizFilterDraft(() => {
        const updatedDraft = { ...appliedQuizBrandFilters, city: cityKey };
        applyQuizBrandFilters(updatedDraft);
        return updatedDraft;
      });

      const newParams = new URLSearchParams(searchParams);

      newParams.set("city", cityName);

      setSearchParams(newParams, {
        replace: true,
      });
    },
    [
      citiesData,
      setSelectedLocation,
      setGeneralFilterDraft,
      setEVsNearYouFilterDraft,
      setBrandFilterDraft,
      setQuizFilterDraft,
      appliedGeneralFilters,
      appliedEVsNearYouFilters,
      appliedBrandFilters,
      appliedQuizBrandFilters,
      applyGeneralFilters,
      applyEVsNearYouFilters,
      applyBrandFilters,
      applyQuizBrandFilters,
      oem,
      searchParams,
      setSearchParams,
      i18n,
    ],
  );

  const fetchUserLocation = useCallback(
    async (forceFetch = false) => {
      const applyCity = (city) => {
        handleLocationSelect(city, forceFetch);
        closeBottomSheet();
      };

      // HELPER: validation function
      const isValidCity = (cityName) => {
        if (!cityName) return false;
        return citiesData?.some(
          (city) =>
            String(city.name).toLowerCase() === String(cityName).toLowerCase(),
        );
      };

      if (forceFetch) {
        setLoading(true);
        const res = await getLocation();
        const city = res?.city;

        if (isValidCity(city)) {
          sessionStorage.setItem("city", city);
          applyCity(city);
        } else {
          openCityBottomSheet();
        }

        setLoading(false);
        return;
      }

      const cityFromURL = searchParams.get("city");
      const cityFromSession = sessionStorage.getItem("city");

      // SECURE URL CHECK: Only apply if valid
      if (isValidCity(cityFromURL)) {
        sessionStorage.setItem("city", cityFromURL);
        applyCity(cityFromURL);
        return;
      }

      // SECURE SESSION CHECK: Only apply if valid
      if (isValidCity(cityFromSession)) {
        applyCity(cityFromSession);
        return;
      }

      // 4. SECURE API CHECK
      const res = await getLocation();
      const cityFromAPI = res?.city;

      if (isValidCity(cityFromAPI)) {
        sessionStorage.setItem("city", cityFromAPI);
        const newParams = new URLSearchParams(searchParams);

        newParams.set("city", cityFromAPI);

        setSearchParams(newParams, {
          replace: true,
        });
        setSearchParams(searchParams, { replace: true });
        applyCity(cityFromAPI);
      } else {
        // FALLBACK: If the URL, Session, and API are all invalid/empty
        openCityBottomSheet();
      }
    },
    [
      citiesData,
      handleLocationSelect,
      closeBottomSheet,
      openCityBottomSheet,
      searchParams,
      setSearchParams,
    ],
  );

  useEffect(() => {
    if (!citiesData?.length) fetchCities();
  }, [citiesData?.length, fetchCities]);

  useEffect(() => {
    if (!selectedLocation && citiesData?.length) fetchUserLocation();
  }, [selectedLocation, citiesData?.length, fetchUserLocation]);

  useEffect(() => {
    const handlePopState = () => {
      closeBottomSheet();
    };

    if (selectCityBottomSheet) {
      window.history.pushState({ cityModalOpen: true }, "");
      window.addEventListener("popstate", handlePopState);

      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "";

      if (selectCityBottomSheet && window.history.state?.cityModalOpen) {
        window.history.back();
      }
    };
  }, [selectCityBottomSheet]);

  return (
    <Modal
      open={selectCityBottomSheet}
      onCancel={closeBottomSheet}
      className="custom_select_city_desktop_modal"
      styles={modalStyles}
      centered
      footer={null}
      width={{
        xs: "95%",
        sm: "90%",
        md: "80%",
        lg: 850,
      }}
      title={
        <div className="d-flex justify-content-center align-items-center w-100 mb-1">
          <h2
            style={{
              color: "#1a1a2e",
              fontWeight: "700",
              fontSize: "clamp(24px, 3vw, 28px)",
              margin: 0,
            }}
          >
            {t("LOCATION.SELECT_CITY") || "Select city"}
          </h2>
        </div>
      }
      destroyOnClose
    >
      <div className="d-flex flex-column position-relative h-100">
        <Loader text="Fetching location..." status={loading} />

        {/* Search Bar */}
        <div className="w-100 mb-4">
          <div
            style={{
              border: "1px solid #e2e2ec",
              borderRadius: "16px",
              padding: "4px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              background: "#ffffff",
            }}
          >
            <SearchYourCity
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              fetchUserLocation={fetchUserLocation}
            />
          </div>
        </div>

        <div
          className="modal_scrollable_area pb-2"
          style={{
            flex: 1,
            overflowY: "auto",
            maxHeight: "55vh",
            paddingRight: "8px",
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 transparent",
          }}
        >
          <PopularCities
            cities={citiesData}
            searchQuery={searchQuery}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            handleLocationSelect={handleLocationSelect}
            closeBottomSheet={closeBottomSheet}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SelectLocationDesktop;
