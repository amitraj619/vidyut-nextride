export const SmallSpinner = () => {
  return (
    <div className="spinner-border text-secondary mx-auto" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export const BigSpinner = () => {
  return (
    <div className="big_spinner_container">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
