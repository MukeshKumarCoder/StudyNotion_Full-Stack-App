import { useState, useEffect } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";

const toSlug = (str) => str.split(" ").join("-").toLowerCase();

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(res.data.data);
    } catch (error) {
      console.error("Could not fetch Categories.", error);
    } finally {
      setLoading(false);
    }
  };
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`relative z-50 flex h-14 w-full min-w-0 max-w-full shrink-0 items-center justify-center border-b border-b-richBlack-700 ${
        location.pathname !== "/" ? "bg-richBlack-800" : ""
      } transition-colors duration-200`}
    >
      <div className="flex w-full min-w-0 max-w-maxContent items-center justify-between gap-2 px-3 sm:px-4 md:px-0 md:w-11/12">
        <Link
          to="/"
          className="min-w-0 shrink-0"
          onClick={() => setMobileOpen(false)}
        >
          <img
            src={logo}
            alt="StudyNotion"
            className="h-7 w-auto sm:h-8"
            width={160}
            height={32}
            loading="lazy"
          />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-x-4 text-sm text-richBlack-25 lg:gap-x-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richBlack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-1/2 top-1/2 z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richBlack-5 p-4 text-richBlack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-1/2 top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richBlack-5" />
                      {loading ? (
                        <div className="spinner mx-auto" />
                      ) : subLinks?.length ? (
                        subLinks.map((subLink) => (
                          <Link
                            key={subLink._id}
                            to={`/catalog/${toSlug(subLink.name)}-${subLink._id}`}
                            className="rounded-lg bg-transparent py-3 pl-4 text-left hover:bg-richBlack-50"
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center">No courses found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path || "/"}>
                    <p
                      className={
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richBlack-25"
                      }
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden min-w-0 items-center gap-x-3 md:flex md:gap-x-4">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative shrink-0">
              <AiOutlineShoppingCart className="text-2xl text-richBlack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 min-w-0 place-items-center overflow-hidden rounded-full bg-richBlack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login" className="shrink-0">
              <button
                type="button"
                className="whitespace-nowrap rounded-lg border border-richBlack-700 bg-richBlack-800 px-3 py-2 text-sm text-richBlack-100"
              >
                Log in
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
        <div className="flex items-center gap-1 md:hidden">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/cart"
              className="relative grid size-9 shrink-0 place-items-center"
              onClick={() => setMobileOpen(false)}
            >
              <AiOutlineShoppingCart className="text-xl text-richBlack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 min-w-0 items-center justify-center rounded-full bg-richBlack-600 text-[10px] font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-md border border-richBlack-600 px-2 py-1.5 text-xs text-richBlack-100"
            >
              Log in
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
          <button
            type="button"
            className="ml-0.5 grid size-10 place-items-center rounded-md text-richBlack-100 transition hover:bg-richBlack-700"
            onClick={() => {
              setMobileOpen((o) => !o);
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <AiOutlineClose className="text-2xl" />
            ) : (
              <AiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div
          className="fixed inset-0 top-14 z-[200] flex md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="min-h-0 flex-1 bg-richBlack-900/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
          />
          <div className="flex h-[calc(100dvh-3.5rem)] w-[min(100vw,320px)] max-w-full shrink-0 flex-col overflow-y-auto border-l border-richBlack-700 bg-richBlack-800 shadow-2xl">
            <nav className="flex flex-col p-3 text-sm text-richBlack-5">
              {NavbarLinks.map((link, index) => (
                <div key={index} className="border-b border-richBlack-700 py-3 last:border-0">
                  {link.title === "Catalog" ? (
                    <div>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between font-medium text-richBlack-25"
                        onClick={() => setMobileCatalogOpen((o) => !o)}
                        aria-expanded={mobileCatalogOpen}
                      >
                        {link.title}
                        <span
                          className={`text-richBlack-100 transition-transform ${
                            mobileCatalogOpen ? "rotate-180" : ""
                          }`}
                        >
                          <BsChevronDown />
                        </span>
                      </button>
                      {mobileCatalogOpen && (
                        <div className="mt-2 max-h-56 overflow-y-auto pl-1">
                          {loading ? (
                            <div className="spinner mx-auto scale-50" />
                          ) : subLinks?.length ? (
                            subLinks.map((sub) => (
                              <Link
                                key={sub._id}
                                to={`/catalog/${toSlug(sub.name)}-${sub._id}`}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileCatalogOpen(false);
                                }}
                                className="block rounded py-2 text-sm text-richBlack-100"
                              >
                                {sub.name}
                              </Link>
                            ))
                          ) : (
                            <p className="text-richBlack-200">No categories</p>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link?.path || "/"}
                      onClick={() => setMobileOpen(false)}
                      className={`block ${
                        matchRoute(link?.path) ? "text-yellow-25" : ""
                      } font-medium text-richBlack-25`}
                    >
                      {link.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
