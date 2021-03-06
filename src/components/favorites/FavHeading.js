import React from "react";

const FavHeading = ({ fav }) => {
  return (
    <>
      <div className="col my-favorites">
        <h2>{fav}</h2>
      </div>
    </>
  );
};

export default FavHeading;
