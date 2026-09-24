import { memo, useCallback, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cards from "./cards/Cards";
import mahindra_logo from "../assets/images/brand_logos/mahindra_logo.webp";
import montra_logo from "../assets/images/brand_logos/montra_logo.webp";
import euler_logo from "../assets/images/brand_logos/euler_logo.webp";
import altigreen_logo from "../assets/images/brand_logos/altigreen_logo.png";
import piaggio_logo from "../assets/images/brand_logos/piaggio_logo.webp";
import { BrandFilterContext } from "../context/VehicleListProvider";
import { CLICK, DEFAULT_FILTER } from "../services/constants";
import { sendEvent } from "../services/analytics-service";
import { trackCustomEvent } from "../utils/facebookPixelHelper";

const BuyEVByBrands = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSelectedFilterDraft, applyNewFilters } =
    useContext(BrandFilterContext);

  const brandList = useMemo(
    () => [
      {
        img: mahindra_logo,
        name: t("BUY_EV_BY_BRANDS.MAHINDRA"),
        key: "MAHINDRA",
      },
      { img: montra_logo, name: t("BUY_EV_BY_BRANDS.MONTRA"), key: "MONTRA" },
      { img: euler_logo, name: t("BUY_EV_BY_BRANDS.EULER"), key: "EULER" },
      {
        img: altigreen_logo,
        name: t("BUY_EV_BY_BRANDS.ALTI_GREEN"),
        key: "ALTI_GREEN",
      },
      {
        img: piaggio_logo,
        name: t("BUY_EV_BY_BRANDS.PIAGGIO"),
        key: "PIAGGIO",
      },
    ],
    [t],
  );

  const handleBuyByBrand = useCallback(
    (brandKey) => {
      setSelectedFilterDraft((prev) => {
        const updatedDraft = {
          ...DEFAULT_FILTER,
          city: prev.city ?? [],
          oem: [brandKey],
        };
        applyNewFilters(updatedDraft);
        return updatedDraft;
      });

      const eventBody = {
        flowContext: "OEM_ENTRY_CLICK",
        action: CLICK,
        source_page: window.location.pathname,
        oem_name: brandKey,
      };

      sendEvent(eventBody);
      trackCustomEvent("BrandCardClick", { oem: brandKey });

      const city = sessionStorage.getItem("city");
      const params = new URLSearchParams({
        type: "brand",
        oem: brandKey,
        city: city || "",
      });

      navigate(`all-ev-vehicles?${params.toString()}`);
    },
    [setSelectedFilterDraft, applyNewFilters, navigate],
  );

  return (
    <section className="cards_section" data-aos="fade-up" data-aos-delay="200">
      <h2 className="section_header">{t("BUY_EV_BY_BRANDS.TITLE")}</h2>
      <div className="scrolling_cards_container">
        {brandList.map((brand, index) => (
          <Cards
            key={brand.key}
            card_img_url={brand.img}
            text={brand.name}
            show_arrow
            is_brand_cards
            brand_key={brand.key}
            handleClick={handleBuyByBrand}
            fetchPriority={index < 3 ? "high" : "low"}
            loading={index < 3 ? "eager" : "lazy"}
            width={63}
            height={48}
          />
        ))}
      </div>
    </section>
  );
};

BuyEVByBrands.displayName = "BuyEVByBrands";

export default memo(BuyEVByBrands);
