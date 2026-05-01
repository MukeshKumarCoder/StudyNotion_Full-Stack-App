import React, { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";

const Sidebar = ({ onAfterNavigate, mobileHeader }) => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);
  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] w-full min-w-0 max-w-full items-center border-r border-richBlack-700 bg-richBlack-800 md:min-w-[220px]">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <>
      <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden border-r border-richBlack-700 bg-richBlack-800 py-6 md:h-[calc(100vh-3.5rem)] md:min-w-[220px] md:max-w-[280px] md:py-10">
        {mobileHeader}
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink
                key={link.id}
                link={link}
                iconName={link.icon}
                onAfterNavigate={onAfterNavigate}
              />
            );
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-px w-10/12 bg-richBlack-700" />
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
            onAfterNavigate={onAfterNavigate}
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => {
                  onAfterNavigate?.();
                  dispatch(logout(navigate));
                },
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richBlack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
