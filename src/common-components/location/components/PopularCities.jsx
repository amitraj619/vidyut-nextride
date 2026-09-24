import { useTranslation } from "react-i18next";
import "../SCSS/style.scss";

const PopularCitiesCard = ({ data, isSelected = false, handleCitySelect }) => {
  return (
    <div
      className={`city-card ${isSelected ? "active" : ""}`}
      onClick={() => handleCitySelect(data?.name)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        padding: "16px 12px",
        borderRadius: "12px",
        background: isSelected ? "#f4eeff" : "transparent",
        border: isSelected ? "1px solid #7225f5" : "1px solid transparent",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.background = "#f8f9fa";
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.background = "transparent";
      }}
    >
      <div
        className={`image-wrapper ${isSelected ? "active" : ""}`}
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: isSelected
            ? "0 4px 12px rgba(114, 37, 245, 0.25)"
            : "0 2px 8px rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8f9fa",
        }}
      >
        <img
          src={
            data?.thumbnailLink ||
            "https://placehold.co/150x150/f8f9fa/a3a3a3?text=City"
          }
          alt={data?.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <span
        className={`city-name ${isSelected ? "active" : ""}`}
        style={{
          fontSize: "14px",
          fontWeight: isSelected ? 600 : 500,
          color: isSelected ? "#7225f5" : "#2c3e50",
          textAlign: "center",
        }}
      >
        {data?.name}
      </span>
    </div>
  );
};

const PopularCities = ({
  cities,
  searchQuery,
  selectedLocation,
  setSelectedLocation,
  handleLocationSelect,
  closeBottomSheet,
}) => {
  const { t } = useTranslation();

  const filteredCities = cities?.filter((city) =>
    city?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const isLocationSelected = (value) => {
    return (
      String(value)?.toLocaleLowerCase() ===
      String(selectedLocation)?.toLocaleLowerCase()
    );
  };

  const handleCitySelect = (value) => {
    setSelectedLocation(value);
    handleLocationSelect(value, true);
    closeBottomSheet();
  };

  if (searchQuery && filteredCities?.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          textAlign: "center",
          color: "#6c757d",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#1a1a2e",
            marginBottom: "8px",
          }}
        >
          {t("LOCATION.NO_CITY_FOUND", "No city found")}
        </div>
        <div style={{ fontSize: "14px" }}>
          {t(
            "LOCATION.NO_CITY_SUBTEXT",
            "Try checking for typos or searching a nearby city.",
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="cities_main_container">
      <div
        className="popular_cities_container"
        style={{ marginBottom: "32px" }}
      >
        <div
          className="cities_con_title"
          style={{
            fontSize: "14px",
            color: "#6c757d",
            fontWeight: 600,
            marginBottom: "16px",
            lineHeight: "1.5",
          }}
        >
          {t("LOCATION.POPULAR_CITIES")}
        </div>

        <div className="popular-cities-wrapper">
          <div
            className="popular-cities-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            {filteredCities
              ?.filter((ele) => ele?.popular)
              ?.map((city) => (
                <PopularCitiesCard
                  key={city?.key}
                  data={city}
                  isSelected={isLocationSelected(city?.name)}
                  handleCitySelect={handleCitySelect}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="all_cities">
        <div
          className="cities_con_title"
          style={{
            fontSize: "14px",
            color: "#6c757d",
            fontWeight: 600,
            marginBottom: "16px",
            paddingTop: "24px",
          }}
        >
          {t("LOCATION.All_CITIES")}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filteredCities
            ?.filter((ele) => !ele?.popular)
            ?.map((city) => (
              <div
                className="city_item"
                key={city?.key}
                onClick={() => handleCitySelect(city?.name)}
                style={{
                  padding: "14px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: isLocationSelected(city?.name)
                    ? "#f4eeff"
                    : "transparent",
                  color: isLocationSelected(city?.name) ? "#7225f5" : "#1a1a2e",
                  fontWeight: isLocationSelected(city?.name) ? 600 : 400,
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isLocationSelected(city?.name))
                    e.currentTarget.style.background = "#f8f9fa";
                }}
                onMouseLeave={(e) => {
                  if (!isLocationSelected(city?.name))
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {city?.name}
                {isLocationSelected(city?.name) && (
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    ✓
                  </span>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCities;
