import {
  HeaderNavSkeleton,
  CustomSkeleton,
  ScrollingCardsSkeleton,
} from "./CommonSkeleton";

const BuySellPageSkeleton = () => {
  return (
    <div className="page_wrapper_skeleton">
      <HeaderNavSkeleton />

      <div className="common_banner_skeleton">
        <div className="common_banner_img shimmer_effect"></div>
        <div className="common_banner_steps_con">
          <div className="common_banner_steps">
            <div className="steps_skeleton">
              <CustomSkeleton width={64} height={64} />
              <CustomSkeleton width={190} height={24} />
            </div>
            <div className="steps_skeleton">
              <CustomSkeleton width={64} height={64} />
              <CustomSkeleton width={120} height={24} />
            </div>
            <div className="steps_skeleton">
              <CustomSkeleton width={64} height={64} />
              <CustomSkeleton width={160} height={24} />
            </div>
            <div className="steps_skeleton">
              <CustomSkeleton width={64} height={64} />
              <CustomSkeleton width={90} height={24} />
            </div>
          </div>
        </div>
      </div>

      <ScrollingCardsSkeleton />
    </div>
  );
};

export default BuySellPageSkeleton;
