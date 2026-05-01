import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="relative flex min-h-0 w-full min-w-0 flex-1 flex-col md:min-h-[calc(100vh-3.5rem)] md:flex-row">
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="flex w-full items-center justify-between border-b border-richBlack-700 bg-richBlack-800 px-4 py-3.5 text-left text-sm font-medium text-richBlack-5 transition active:bg-richBlack-700"
          aria-expanded={mobileNavOpen}
          aria-controls="dashboard-mobile-sidebar"
        >
          <span className="flex items-center gap-2 text-richBlack-25">
            <AiOutlineMenu className="text-xl" aria-hidden />
            Menu
          </span>
        </button>
        {mobileNavOpen && (
          <div
            className="fixed inset-0 z-40 flex md:hidden"
            role="dialog"
            aria-modal="true"
            id="dashboard-mobile-sidebar"
          >
            <div
              className="min-h-0 flex-1 bg-richBlack-900/70 backdrop-blur-sm transition-opacity motion-reduce:transition-none"
              onClick={() => setMobileNavOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setMobileNavOpen(false)}
            />
            <div className="h-[100dvh] w-[min(100vw,300px)] max-w-[85vw] shrink-0 border-l border-richBlack-700 bg-richBlack-800 shadow-2xl transition-transform duration-300 ease-out motion-reduce:transform-none">
              <Sidebar
                onAfterNavigate={() => setMobileNavOpen(false)}
                mobileHeader={
                  <div className="mb-4 flex items-center justify-end border-b border-richBlack-700 px-2 pb-3">
                    <button
                      type="button"
                      onClick={() => setMobileNavOpen(false)}
                      className="grid h-9 w-9 place-items-center rounded-md text-richBlack-100 transition hover:bg-richBlack-700"
                      aria-label="Close menu"
                    >
                      <AiOutlineClose className="text-2xl" />
                    </button>
                  </div>
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className="hidden h-[calc(100vh-3.5rem)] min-h-0 w-full shrink-0 border-r border-richBlack-700 md:block md:w-auto">
        <Sidebar />
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] px-1 py-6 sm:px-0 sm:py-8 md:py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
