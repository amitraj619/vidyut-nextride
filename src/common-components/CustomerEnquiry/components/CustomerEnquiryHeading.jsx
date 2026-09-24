import "../SCSS/style.scss";

const CustomerEnquiryHeading = ({ details }) => {
  return (
    <div className="user_form_information_container">
      <div className="heading">{details?.heading}</div>
      <div className="enquiry_note">{details?.description}</div>
    </div>
  );
};

export default CustomerEnquiryHeading;
