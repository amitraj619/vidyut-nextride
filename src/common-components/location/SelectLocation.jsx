import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import "./SCSS/style.scss";
import { Drawer } from "antd";
import { left_arrow_icon } from "../../assets/SVGIcons/CommonIcons";
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
import { CLICK } from "../../services/constants";
import { sendEvent } from "../../services/analytics-service";
import { isMobileDevice } from "../../utils/deviceCheck";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";

const SelectLocation = ({
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
  const { t } = useTranslation();

  // Memoized drawer styles to prevent re-render
  const drawerStyles = useMemo(
    () => ({
      body: {
        padding: "16px",
        paddingTop: "0px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      },
      header: { padding: "0px" },
      mask: {
        width: isMobileDevice() ? "100%" : "400px",
        justifySelf: "center",
      },
      content: {
        width: isMobileDevice() ? "100%" : "400px",
        justifySelf: "center",
      },
    }),
    []
  );

  // Fetch cities list
  const fetchCities = useCallback(async () => {
    const res = await getCitiesList();
    if (res?.status) {
      const sortedCities = res.data?.cities?.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
      setCitiesData(sortedCities);
    }
  }, [setCitiesData]);

  // Handle location selection
  const handleLocationSelect = useCallback(
    (value, isUserAction = false) => {
      const selectedCity = citiesData?.find(
        (ele) =>
          String(ele?.name)?.toLowerCase() === String(value)?.toLowerCase()
      );
      if (!selectedCity) return;

      const prevCity = sessionStorage.getItem("city");
      const cityKey = selectedCity?.cityGroups?.length
        ? selectedCity?.cityGroups
        : [selectedCity?.key];
      const cityName = selectedCity?.name;

      sessionStorage.setItem("city", cityName);
      setSelectedLocation(cityName);

      if (isUserAction) {
        sendEvent({
          flowContext: `CITY_SELECTED`,
          action: CLICK,
          source_page: window.location.pathname,
          prev_city: prevCity,
        });
      }

      // General
      setGeneralFilterDraft(() => {
        const updatedDraft = { ...appliedGeneralFilters, city: cityKey };
        applyGeneralFilters(updatedDraft);
        return updatedDraft;
      });

      // EVs near you
      setEVsNearYouFilterDraft(() => {
        const updatedDraft = { ...appliedEVsNearYouFilters, city: cityKey };
        applyEVsNearYouFilters(updatedDraft, 4);
        sessionStorage.setItem("exploreNextride", false);
        return updatedDraft;
      });

      // Brand
      setBrandFilterDraft(() => {
        const updatedDraft = {
          ...appliedBrandFilters,
          city: cityKey,
          oem: oem.length ? oem : appliedBrandFilters.oem,
        };
        applyBrandFilters(updatedDraft);
        return updatedDraft;
      });

      // Quiz
      setQuizFilterDraft(() => {
        const updatedDraft = { ...appliedQuizBrandFilters, city: cityKey };
        applyQuizBrandFilters(updatedDraft);
        return updatedDraft;
      });

      searchParams.set("city", cityName);
      setSearchParams(searchParams, { replace: true });
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
    ]
  );
  // Fetch user location
  const fetchUserLocation = useCallback(
    async (forceFetch = false) => {
      const applyCity = (city) => {
        handleLocationSelect(city, forceFetch);
        closeBottomSheet();
      };

      if (forceFetch) {
        setLoading(true);
        const res = await getLocation();
        const city = res?.city;
        sessionStorage.setItem("city", city);
        applyCity(city);
        setLoading(false);
        return;
      }

      const cityFromURL = searchParams.get("city");
      const cityFromSession = sessionStorage.getItem("city");

      if (cityFromURL) {
        // If city is in URL, overwrite sessionStorage
        sessionStorage.setItem("city", cityFromURL);
        applyCity(cityFromURL);
        return;
      }

      if (cityFromSession) {
        // If city exists in sessionStorage
        applyCity(cityFromSession);
        return;
      }

      const res = await getLocation();
      const cityFromAPI = res?.city;

      if (cityFromAPI) {
        sessionStorage.setItem("city", cityFromAPI);
        // update searchParams as well
        searchParams.set("city", cityFromAPI);
        setSearchParams(searchParams, { replace: true });
        applyCity(cityFromAPI);
      } else {
        openCityBottomSheet();
      }
    },
    [
      handleLocationSelect,
      closeBottomSheet,
      openCityBottomSheet,
      searchParams,
      setSearchParams,
    ]
  );

  // Initial effect
  useEffect(() => {
    if (!citiesData?.length) fetchCities();

    if (searchParams.get("override") === null) {
      const overrideValue =
        sessionStorage.getItem("isDesktopViewEnable") === "true";
      searchParams.set("override", overrideValue);
      setSearchParams(searchParams, { replace: true });
    }
  }, [citiesData?.length, fetchCities, searchParams, setSearchParams]);

  useEffect(() => {
    if (!selectedLocation && citiesData?.length) fetchUserLocation();
  }, [selectedLocation, citiesData?.length, fetchUserLocation]);

  return (
    <Drawer
      open={selectCityBottomSheet}
      onClose={closeBottomSheet}
      placement="bottom"
      height="100%"
      className="custom_select_city_bottom_sheet"
      styles={drawerStyles}
      title={
        <div className="drawer_title_con">
          <button className="btn" onClick={closeBottomSheet}>
            {left_arrow_icon}
          </button>{" "}
          {t("LOCATION.SELECT_CITY")}
        </div>
      }
      destroyOnClose
    >
      <div className="position-relative">
        <Loader text="Fetching location..." status={loading} />
        <SearchYourCity
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          fetchUserLocation={fetchUserLocation}
        />
        <PopularCities
          cities={citiesData}
          searchQuery={searchQuery}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          handleLocationSelect={handleLocationSelect}
          closeBottomSheet={closeBottomSheet}
        />
      </div>
    </Drawer>
  );
};

export default SelectLocation;
