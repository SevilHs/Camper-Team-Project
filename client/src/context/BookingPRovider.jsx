import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./UserProvider";
export const BookingContext = createContext();
const BookingPRovider = ({ children }) => {
  const { checkUser } = useContext(UserContext);

  const [bookinginfo, setBookingInfo] = useState({
    traveller: [{}],
    contactDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      adress: "",
    },
    tourTitle:"",
    notes: "",
    userName: checkUser?.userName,
  });
  const providerValue = {
    bookinginfo,
    setBookingInfo,
  };
  return (
    <BookingContext.Provider value={providerValue}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingPRovider;
