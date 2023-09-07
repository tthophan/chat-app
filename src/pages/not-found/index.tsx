import React from "react";
import { useLocation } from "react-router-dom";

const NotFound: React.FC = () => {
  let location = useLocation();
  return <h3 className="exception">No match for {location.pathname}</h3>;
};
export default NotFound;
