import {
  createContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { getFilterPayload } from "../utils/commonUtils";
import { fetchVehicleList } from "../services/commonServices";
import { DEFAULT_FILTER } from "../services/constants";
import isEqual from "lodash.isequal";

export const createFilterContext = () => createContext();

const areFiltersEqual = (a, b) => isEqual(a, b);

const getInitialFilterState = (key) => {
  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : DEFAULT_FILTER;
  } catch {
    return DEFAULT_FILTER;
  }
};

export const createFilterProvider = (FilterContext, storageKey) => {
  const FilterProvider = ({ children }) => {
    const [vehicleList, setVehicleListPage] = useState([]);
    const [listPage, setListPage] = useState(0);
    const [isMoreData, setIsMoreData] = useState(true);
    const [loading, setLoading] = useState(true);
    const [activeTabKey, setActiveTabKey] = useState("1");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [appliedFilters, setAppliedFilters] = useState(
      getInitialFilterState(storageKey),
    );
    const [selectedFilterDraft, setSelectedFilterDraft] = useState(
      getInitialFilterState(storageKey),
    );

    const fetchedPages = useRef(new Set());

    const fetchVehiclesData = useCallback(
      async (filters = null, overridePage = null, PAGE_SIZE = 9) => {
        const currentPage = overridePage ?? listPage;
        const filtersToUse = filters ?? selectedFilterDraft;
        const filtersChanged = !areFiltersEqual(appliedFilters, filtersToUse);

        if (overridePage !== null || filtersChanged) {
          fetchedPages.current.clear();
        }

        const isAlreadyFetched =
          overridePage === null &&
          !filtersChanged &&
          fetchedPages.current.has(currentPage);

        if (isAlreadyFetched) return;

        setLoading(true);
        try {
          const res = await fetchVehicleList(
            getFilterPayload(filtersToUse),
            currentPage,
            PAGE_SIZE,
          );

          if (res?.status) {
            const { pageNo, totalPages, objects } = res.data;

            setIsMoreData(pageNo + 1 < totalPages);
            setVehicleListPage((prev) =>
              currentPage === 0 || filtersChanged
                ? objects
                : [...prev, ...objects],
            );
            setListPage(currentPage + 1);
            fetchedPages.current.add(currentPage);

            if (filtersChanged) {
              setAppliedFilters(filtersToUse);
            }
          }
        } catch (error) {
          console.error("Fetch failed:", error);
        } finally {
          setLoading(false);
        }
      },
      [appliedFilters, selectedFilterDraft, listPage],
    );

    const applyNewFilters = useCallback(
      async (filters = null, PAGE_SIZE = 9) => {
        setVehicleListPage([]);
        setListPage(0);
        fetchedPages.current.clear();
        await fetchVehiclesData(filters, 0, PAGE_SIZE);
      },
      [fetchVehiclesData],
    );

    const resetFilters = useCallback(() => {
      setSelectedFilterDraft({
        ...DEFAULT_FILTER,
        city: appliedFilters.city, // safely preserve city
      });
    }, [appliedFilters.city]);

    // Sync appliedFilters to sessionStorage
    useEffect(() => {
      sessionStorage.setItem(storageKey, JSON.stringify(appliedFilters));
    }, [appliedFilters, storageKey]);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(
      () => ({
        vehicleList,
        listPage,
        isMoreData,
        loading,
        fetchVehiclesData,
        applyNewFilters,
        appliedFilters,
        setAppliedFilters,
        selectedFilterDraft,
        setSelectedFilterDraft,
        resetFilters,
        DEFAULT_FILTER,
        activeTabKey,
        setActiveTabKey,
        isFilterOpen,
        setIsFilterOpen,
      }),
      [
        vehicleList,
        listPage,
        isMoreData,
        loading,
        fetchVehiclesData,
        applyNewFilters,
        appliedFilters,
        selectedFilterDraft,
        resetFilters,
        activeTabKey,
        isFilterOpen,
      ],
    );

    return (
      <FilterContext.Provider value={contextValue}>
        {children}
      </FilterContext.Provider>
    );
  };

  return FilterProvider;
};
