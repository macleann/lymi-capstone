export const CustomToolbar = (props) => {
  const navigate = (action) => {
    props.onNavigate(action);
  };

  const goToBack = () => {
    navigate("PREV");
  };

  const goToNext = () => {
    navigate("NEXT");
  };

  const goToToday = () => {
    navigate("TODAY");
  };

  return (
    <div className="rbc-toolbar">
      <div className="rbc-btn-group">
        <button className="btn-primary mr-2" onClick={goToBack}>
          Back
        </button>
        <button className="btn-primary" onClick={goToToday}>
          Today
        </button>
        <button className="btn-primary ml-2" onClick={goToNext}>
          Next
        </button>
      </div>
      <span className="rbc-toolbar-label text-3xl">{props.label}</span>
    </div>
  );
};
