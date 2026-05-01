import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index.js";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/clerk-react";

const store = configureStore({
  reducer: rootReducer,
});

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const appTree = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  clerkPublishableKey ? (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {appTree}
    </ClerkProvider>
  ) : (
    appTree
  )
);
