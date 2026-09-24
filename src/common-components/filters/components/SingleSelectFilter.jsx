import "../SCSS/style.scss";
import { ConfigProvider, Radio, Space } from "antd";

const SingleSelectFilter = ({
  field,
  selectedFilterDraft,
  setSelectedFilterDraft,
}) => {
  const handleRadioFilterChange = (e) => {
    setSelectedFilterDraft({ [field?.name]: [e.target.value] });
  };

  const handleUnSelectValues = (value) => {
    if (selectedFilterDraft?.[field?.name]?.[0] === value) {
      setSelectedFilterDraft({ [field?.name]: [] });
    }
  };
  return (
    <>
      {field?.selectableValues?.map((ele) => (
        <ConfigProvider
          key={ele?.key}
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
          <Radio.Group
            onChange={handleRadioFilterChange}
            value={selectedFilterDraft[field?.name]?.[0]}
          >
            <Space direction="vertical">
              <Radio
                onClick={() => handleUnSelectValues(ele?.key)}
                value={ele?.key}
                style={{ display: "flex", gap: "8px" }}
              >
                {ele?.name}
              </Radio>
            </Space>
          </Radio.Group>
        </ConfigProvider>
      ))}
    </>
  );
};

export default SingleSelectFilter;
