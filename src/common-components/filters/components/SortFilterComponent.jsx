import { ConfigProvider, Radio, Space } from "antd";
import { sortSchema } from "../../../utils/sortSchema";
import { CLICK } from "../../../services/constants";
import { sendEvent } from "../../../services/analytics-service";

const SortFilterComponent = ({ useFilters }) => {
  const { selectedFilterDraft, setSelectedFilterDraft, appliedFilters } =
    useFilters;

  // Default selection fallback
  const getSelectedKey = () => {
    const sortBy = selectedFilterDraft?.sortBy;
    const match = sortSchema.selectableValues.find(
      (option) =>
        option.sortField === sortBy?.sortField &&
        option.sortDirection === sortBy?.sortDirection
    );
    return match?.key || sortSchema.selectableValues[0].key;
  };

  const handleSortChange = (e) => {
    const selectedKey = e.target.value;
    const selectedOption = sortSchema.selectableValues.find(
      (option) => option.key === selectedKey
    );

    if (selectedOption) {
      setSelectedFilterDraft((prev) => ({
        ...prev,
        sortBy: {
          sortField: selectedOption.sortField,
          sortDirection: selectedOption.sortDirection,
        },
      }));
      handleSortOptionSelectEvent();
    }
  };

  const handleSortOptionSelectEvent = () => {
    const eventBody = {
      flowContext: `BUY_SORT_OPTION_SELECT`,
      action: CLICK,
      source_page: window.location.pathname,
      filters_json: appliedFilters,
      sort_option: JSON.stringify(selectedFilterDraft?.sortBy),
    };
    sendEvent(eventBody);
  };

  const selectedKey = getSelectedKey();

  return (
    <div className="ps-4 py-4">
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              borderColor: "#7225f5",
            },
          },
          token: {
            colorPrimary: "#7225f5",
            colorBorder: "#666666",
          },
        }}
      >
        <Radio.Group onChange={handleSortChange} value={selectedKey}>
          <Space direction="vertical">
            {sortSchema.selectableValues.map((option) => (
              <Radio
                key={option.key}
                value={option.key}
                style={{
                  display: "flex",
                  gap: "8px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                {option.name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </ConfigProvider>
    </div>
  );
};

export default SortFilterComponent;
