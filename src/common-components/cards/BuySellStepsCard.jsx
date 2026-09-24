const BuySellStepsCard = ({
  step_icon,
  step_label,
  is_last_step = false,
  fade_up_delay = "0",
}) => {
  return (
    <>
      <div
        className="steps_item"
        data-aos="fade-up"
        data-aos-delay={fade_up_delay}
      >
        <div className="step_img">
          {step_icon}
          {is_last_step ? "" : <div className="dotted_line"></div>}
        </div>
        <div className="step_label">{step_label}</div>
      </div>
    </>
  );
};

export default BuySellStepsCard;
