import { useAuth, useClerk } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/apis";
import { clerkSignOutRef } from "../utils/clerkSignOutRef";

const SYNC_PATHS = new Set(["/login", "/signup"]);

/**
 * Registers Clerk signOut for the Redux logout path, and exchanges a Clerk
 * session for the app JWT when the user completes Google (or other) sign-in.
 */
export default function ClerkSessionSync() {
  const { isLoaded, isSignedIn, userId, getToken } = useAuth();
  const { signOut } = useClerk();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const syncedForClerkUser = useRef(null);

  useEffect(() => {
    clerkSignOutRef.current = signOut;
    return () => {
      clerkSignOutRef.current = null;
    };
  }, [signOut]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) {
      if (!isSignedIn) syncedForClerkUser.current = null;
      return;
    }

    const path = location.pathname;
    if (!SYNC_PATHS.has(path)) return;

    if (syncedForClerkUser.current === userId && token) return;

    let cancelled = false;

    (async () => {
      try {
        const clerkToken = await getToken();
        if (!clerkToken || cancelled) return;

        const response = await apiConnector(
          "POST",
          endpoints.CLERK_SYNC_API,
          {},
          { Authorization: `Bearer ${clerkToken}` }
        );

        if (!response?.data?.success || cancelled) return;

        syncedForClerkUser.current = userId;
        dispatch(setToken(response.data.token));
        const u = response.data.user;
        const userImage =
          u?.image ||
          `https://api.dicebear.com/5.x/initials/svg?seed=${u?.firstName} ${u?.lastName}`;
        const userPayload = { ...u, image: userImage, password: undefined };
        dispatch(setUser(userPayload));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(userPayload));

        if (SYNC_PATHS.has(path)) {
          navigate("/dashboard/my-profile", { replace: true });
        }
      } catch (e) {
        console.error("Clerk sync failed:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    isLoaded,
    isSignedIn,
    userId,
    getToken,
    dispatch,
    navigate,
    location.pathname,
    token,
  ]);

  return null;
}
