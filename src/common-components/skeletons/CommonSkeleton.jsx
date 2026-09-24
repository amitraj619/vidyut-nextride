const CommonSkeleton = () => {
  return (
    <div className="common_skeleton">
      <div className="custom_skeleton heading_skeleton shimmer_effect"></div>
      <div className="body_skeleton shimmer_effect"></div>
    </div>
  );
};

export const CustomSkeleton = ({ width, height, borderRadius }) => {
  return (
    <div
      className="custom_skeleton shimmer_effect"
      style={{
        width: width + "px",
        height: height + "px",
        borderRadius: borderRadius + "px",
      }}
    ></div>
  );
};

export const CardSkeleton = ({ width, height }) => {
  return (
    <div
      className="card_skeleton"
      style={{ width: width + "px", height: height + "px" }}
    >
      <CustomSkeleton width={48} height={48} />

      <CustomSkeleton width={110} height={30} />
    </div>
  );
};

export const ScrollingCardsSkeleton = () => {
  return (
    <div className="buy_used_ev_skeleton">
      <CustomSkeleton width={180} height={28} />
      <div className="cards_container">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
};

export const HeaderNavSkeleton = () => {
  return (
    <div className="header_nav_skeleton">
      <div className="left_header_skeleton">
        <CustomSkeleton width={34} height={34} />
        <CustomSkeleton width={119} height={34} />
      </div>
      <div className="right_header_skeleton">
        <CustomSkeleton width={147} height={34} />
      </div>
    </div>
  );
};

export default CommonSkeleton;
