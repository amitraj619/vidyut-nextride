import { right_arrow_icon } from "../../assets/SVGIcons/CommonIcons";
import "../SCSS/style.scss";

const Cards = ({
  card_img_url,
  text,
  show_arrow = false,
  is_brand_cards = false,
  handleClick = () => {},
  brand_key,
  width,
  height,
  fetchPriority = "auto",
  loading = "lazy",
}) => {
  return (
    <div className="cards" role="button" onClick={() => handleClick(brand_key)}>
      <div className="cards_img">
        <img
          src={card_img_url}
          alt={`${text}_logo`}
          title={text}
          fetchPriority={fetchPriority}
          width={width}
          height={height}
          loading={loading}
        />
      </div>
      <div
        className={`${
          is_brand_cards ? "browse_brand_cards_content" : "choose_cards_content"
        }`}
      >
        {text}
        {show_arrow ? right_arrow_icon : ""}
      </div>
    </div>
  );
};

export default Cards;
