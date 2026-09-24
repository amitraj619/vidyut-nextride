import "../SCSS/style.scss";
import { CustomSkeleton } from "../../../common-components/skeletons/CommonSkeleton";

const GalleryCard = ({
  thumbnail,
  overlay_text = "",
  is_active,
  handleGallery,
  show = true,
  loading,
}) => {
  return (
    <div
      className={`gallery_card ${is_active && "active"} ${
        loading ? "d-flex" : !show && "d-none"
      }`}
      onClick={handleGallery}
    >
      {loading || !thumbnail ? (
        <CustomSkeleton height={203} width={132} />
      ) : (
        <img
          src={thumbnail}
          alt="thumbnail"
          onLoad={(e) => {
            e.target.style.opacity = 1;
          }}
          style={{
            opacity: 0,
            transition: "opacity 0.4s ease-in-out",
          }}
        />
      )}
      <div className="gallery_card_overlay">
        <div className="gallery_card_overlay_text">{overlay_text}</div>
      </div>
    </div>
  );
};

export default GalleryCard;
