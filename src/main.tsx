import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  installGlobalErrorHandlers,
  logger,
  serializeError,
} from "./utils/logger";

installGlobalErrorHandlers();
logger.info("Portal started", { user_agent: navigator.userAgent }, "lifecycle");

createRoot(document.getElementById("root")!, {
  onUncaughtError: (error, errorInfo) => {
    logger.critical(
      "Uncaught React render error",
      { ...serializeError(error), component_stack: errorInfo.componentStack },
      "react",
    );
  },
  onCaughtError: (error, errorInfo) => {
    logger.error(
      "React error caught by an error boundary",
      { ...serializeError(error), component_stack: errorInfo.componentStack },
      "react",
    );
  },
  onRecoverableError: (error, errorInfo) => {
    logger.warning(
      "React recovered from an error",
      { ...serializeError(error), component_stack: errorInfo.componentStack },
      "react",
    );
  },
}).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
