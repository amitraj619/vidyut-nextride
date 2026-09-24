import { Slider } from "antd";
import "../SCSS/style.scss";
import { getFormattedCurrency } from "../../utils/commonUtils";

const HorizontalProgressCard = ({
  selected_value,
  min_value,
  max_value,
  progress_label,
  stepSize,
  onChange,
  prefix = "",
  suffix = "",
}) => {
  return (
    <div className="horizontal_progress">
      <div className="progress_label">
        <label>{progress_label}</label>
        <div className="selected_value">
          {prefix}
          {getFormattedCurrency(selected_value)}
          {suffix}
        </div>
      </div>
      <Slider
        min={min_value}
        max={max_value}
        value={selected_value}
        step={stepSize}
        onChange={onChange}
        tooltip={{ open: false }}
        className="custom_progress_slider"
      />
      <div className="progress_label">
        <div className="min_value">
          {prefix}
          {getFormattedCurrency(min_value)}
          {suffix}
        </div>
        <div className="max_value">
          {prefix}
          {getFormattedCurrency(max_value)}
          {suffix}
        </div>
      </div>
    </div>
  );
};

export default HorizontalProgressCard;
