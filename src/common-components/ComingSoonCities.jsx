import { useContext, useState, useEffect } from "react";
import { LocationContext } from "../context/LocationContext";
import { useEVsNearYouFilter } from "../context/VehicleListProvider";

const ComingSoonCities = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const { selectedLocation } = useContext(LocationContext);
  const { vehicleList, loading: isEvListLoading } = useEVsNearYouFilter();

  useEffect(() => {
    if (!isEvListLoading && vehicleList?.length === 0) {
      setIsSectionVisible(true);
    } else {
      setIsSectionVisible(false);
    }
  }, [isEvListLoading, vehicleList]);

  return (
    <div
      className={`coming_soon_cities_section ${
        isSectionVisible ? "d-block" : "d-none"
      } `}
    >
      <div className="inner_coming_soon_section">
        <h6>Coming soon</h6>
        <p>NextRide is not available yet in {selectedLocation}</p>
      </div>
    </div>
  );
};

export default ComingSoonCities;
