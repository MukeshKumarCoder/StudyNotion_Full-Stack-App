import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="update-password/:id" element={<UpdatePassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          element={
            // <PrivateRoute>
            <Dashboard />
            // </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          {/* <Route path="dashboard/Settings" element={<Settings />} /> */}

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
