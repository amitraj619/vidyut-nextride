import { IoCheckmarkOutline } from "react-icons/io5";
import "../SCSS/style.scss";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";

const MultiSelectFilter = ({
  field,
  selectedFilterDraft,
  setSelectedFilterDraft,
  selectableValueList = null,
  sortEnabled = true,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const selectableValues = selectableValueList ?? field?.selectableValues;

  const handleSelectedFilter = (selectedField) => {
    setSelectedFilterDraft((prevFilters) => {
      const currentFieldFilters = prevFilters?.[field?.name] || [];
      if (currentFieldFilters?.includes(selectedField)) {
        return {
          ...prevFilters,
          [field.name]: currentFieldFilters.filter(
            (filter) => filter !== selectedField,
          ),
        };
      } else {
        return {
          ...prevFilters,
          [field.name]: [...currentFieldFilters, selectedField],
        };
      }
    });
  };

  const handleSearchFilter = (e) => {
    const searchData = e?.target?.value?.toLowerCase();
    setSearchValue(searchData);
    setIsExpanded(false);
  };

  const handleResetInput = () => {
    setSearchValue("");
    setIsExpanded(false);
  };

  // Filter fields based on search value
  const filteredFieldsList = (fieldsList, searchValue) => {
    return fieldsList?.filter((field) =>
      field?.name?.toLowerCase()?.includes(searchValue?.toLowerCase()),
    );
  };

  const processedList = filteredFieldsList(selectableValues, searchValue) || [];

  const sortedList = sortEnabled
    ? [...processedList].sort((a, b) => a?.name?.localeCompare(b?.name))
    : processedList;

  const displayedList = isExpanded ? sortedList : sortedList.slice(0, 6);

  const hasMoreThanSix = sortedList.length > 6;
  const shouldShowLoadMore = !isExpanded && hasMoreThanSix;
  const shouldShowShowLess = isExpanded && hasMoreThanSix;

  return (
    <>
      <div
        className={`${selectableValues?.length < 10 && "d-none"} pe-4`}
        style={{
          gap: "8px",
          paddingBottom: "8px",
          position: "relative",
          height: "60px",
        }}
      >
        <IoIosSearch
          className="position-absolute fs-5 "
          style={{ top: "18%", left: "4%", color: "#666666" }}
        />
        <input
          className="w-100 multi_select_search"
          type="search"
          placeholder="Search filter"
          value={searchValue}
          onChange={handleSearchFilter}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.stopPropagation(); // Prevent the Tab key from closing the dropdown
            }
          }}
        />
        {searchValue?.length > 0 && (
          <RxCross2
            className="position-absolute fs-5"
            onClick={handleResetInput}
            style={{
              top: "18%",
              right: "14%",
              color: "#666666",
              cursor: "pointer",
            }}
          />
        )}
      </div>

      <div
        className="d-flex flex-column selectable_value_list"
        style={{
          gap: "8px",
          overflowY: "auto",
        }}
      >
        {displayedList?.map((ele) => (
          <div
            key={ele?.key}
            className="d-flex align-items-center"
            style={{ gap: "16px", paddingTop: "8px", paddingBottom: "8px" }}
          >
            <div
              className="custom_checkbox_button"
              onClick={() => handleSelectedFilter(ele?.key)}
              style={{
                flexShrink: 0,
                borderColor:
                  selectedFilterDraft?.[field?.name]?.includes(ele?.key) &&
                  "#7225F5",
              }}
            >
              {selectedFilterDraft?.[field?.name]?.includes(ele?.key) && (
                <IoCheckmarkOutline
                  className="fs-4"
                  style={{ color: "#7225F5" }}
                />
              )}
            </div>
            <span style={{ wordBreak: "break-word" }}>{ele?.name}</span>
          </div>
        ))}

        {shouldShowLoadMore && (
          <div
            className="d-flex align-items-center"
            style={{
              paddingTop: "8px",
              paddingBottom: "8px",
              color: "#7225F5",
              cursor: "pointer",
              fontWeight: "500",
            }}
            onClick={() => setIsExpanded(true)}
          >
            + Load More
          </div>
        )}

        {shouldShowShowLess && (
          <div
            className="d-flex align-items-center"
            style={{
              paddingTop: "8px",
              paddingBottom: "8px",
              color: "#7225F5",
              cursor: "pointer",
              fontWeight: "500",
            }}
            onClick={() => setIsExpanded(false)}
          >
            - Show Less
          </div>
        )}
      </div>
    </>
  );
};

export default MultiSelectFilter;
