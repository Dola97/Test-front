import Cookies from "js-cookie";
import React from "react";
import { USER } from "../../constants";

type AllowedRoles = "Viewer" | "Editor";

export const withRoleBasedRendering =
  (allowedRoles: AllowedRoles[]) =>
  <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const RoleBasedComponent: React.FC<P> = (props) => {
      const user: any = Cookies.get(USER);
      const parsedInfos = JSON.parse(user);

      const userRole: AllowedRoles = parsedInfos?.roles;

      if (allowedRoles.includes(userRole)) {
        return <WrappedComponent {...props} />;
      } else {
        return <h1>You don't have permission to access this component.</h1>;
      }
    };

    return RoleBasedComponent;
  };
