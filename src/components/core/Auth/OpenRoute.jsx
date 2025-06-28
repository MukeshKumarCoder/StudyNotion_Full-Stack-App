// This will prevent authenticated users from accessing this route
import { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({ Children }) => {
  if (token === null) {
    return Children;
  } else {
    return <Navigate to="/dashboard/my-profile" />;
  }
};

export default OpenRoute;
