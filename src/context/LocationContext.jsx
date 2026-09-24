import { createContext, useState, useMemo } from "react";

export const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [citiesData, setCitiesData] = useState([]);
  const [isLocationSet, setIsLocationSet] = useState(false);

  const contextValue = useMemo(
    () => ({
      selectedLocation,
      setSelectedLocation,
      citiesData,
      setCitiesData,
      isLocationSet,
      setIsLocationSet,
    }),
    [selectedLocation, citiesData, isLocationSet]
  );

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
