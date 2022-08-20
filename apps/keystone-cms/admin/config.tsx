import React from "react";
import { AdminConfig } from "@keystone-6/core/types";
import { CustomNavigation } from "./components/CustomNavigation";

function CustomLogo() {
  return (
    <img
      width="75"
      height="25"
      src="https://res.cloudinary.com/djfxpvrca/image/upload/v1646103850/logly-uploads/logly-logo_a8j2fo.png"
    />
  );
}

export const components: AdminConfig["components"] = {
  Logo: CustomLogo,
  Navigation: CustomNavigation,
};
