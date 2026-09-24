import india_map from "../../../assets/images/india_map.webp";

const CitiesComponent = () => {
  return (
    <div className="cities_box">
      <div className="cities_typo">
        <h3>6+ cities</h3>
        <p>and growing</p>
      </div>

      <div className="cities_img_container">
        <img src={india_map} alt="map" />
      </div>
    </div>
  );
};

export default CitiesComponent;
