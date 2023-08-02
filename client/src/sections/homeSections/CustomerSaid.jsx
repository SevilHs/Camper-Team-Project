import React from "react";
import FeedBack from "../../components/FeedBackCarusel/FeedBack";

const CustomerSaid = () => {
  return (
    <div id="customers-said">
      <div className="container">
        <div className="customer-said">
          <h2>What Customer Said</h2>
          <FeedBack />
        </div>
      </div>
    </div>
  );
};

export default CustomerSaid;
