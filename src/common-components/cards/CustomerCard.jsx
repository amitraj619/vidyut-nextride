import { Rating } from "react-simple-star-rating";

const CustomerCard = ({
  customer_img_url,
  customer_name,
  customer_review,
  customer_ratings,
}) => {
  return (
    <div className="customer_card">
      <div className="customer_image">
        <img
          src={customer_img_url}
          alt={customer_name}
          title={`${customer_name}_review`}
          loading="lazy"
        />
      </div>
      <div className="customer_review_container">
        <div className="customer_review_details">
          <h2 className="customer_name">{customer_name}</h2>
          <div className="customer_review">{customer_review}</div>
        </div>
        <div className="ratings">
          <Rating initialValue={customer_ratings} size={23} readonly />
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
