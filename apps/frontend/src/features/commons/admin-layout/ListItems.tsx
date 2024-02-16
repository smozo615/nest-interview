import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";


import { useRouter } from "next/router";
import Link from "next/link";
import { Tooltip } from "@material-ui/core";
import {  DashboardCustomizeRounded,  Person, PersonSearch } from "@mui/icons-material";
import { ROUTER_LINK_EMPLOYEES, ROUTER_LINK_CUSTOMERS, ROUTER_LINK_TIMESHEETS } from "@ocmi/frontend/constants/routes-link.constants";
import { TITLE_MODULE_EMPLEADOS, TITLE_MODULE_CUSTOMER, TITLE_MODULE_NOMINA } from "@ocmi/frontend/constants/title.constants";

export const ListItems = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Tooltip title={TITLE_MODULE_EMPLEADOS}>
        <ListItemButton
          selected={router.pathname === ROUTER_LINK_EMPLOYEES}
          component={Link}
          href={ROUTER_LINK_EMPLOYEES}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={TITLE_MODULE_EMPLEADOS} />
        </ListItemButton>
      </Tooltip>

      <Tooltip title={TITLE_MODULE_CUSTOMER}>
        <ListItemButton
          selected={router.pathname === ROUTER_LINK_CUSTOMERS}
          component={Link}
          href={ROUTER_LINK_CUSTOMERS}
        >
          <ListItemIcon>
            <PersonSearch />
          </ListItemIcon>
          <ListItemText primary={TITLE_MODULE_CUSTOMER} />
        </ListItemButton>
      </Tooltip>
      <Tooltip title={TITLE_MODULE_NOMINA}>
        <ListItemButton
          selected={router.pathname === ROUTER_LINK_TIMESHEETS}
          component={Link}
          href={ROUTER_LINK_TIMESHEETS}
        >
          <ListItemIcon>
            <DashboardCustomizeRounded />
          </ListItemIcon>
          <ListItemText primary={TITLE_MODULE_NOMINA} />
        </ListItemButton>
      </Tooltip>

    </React.Fragment>
  );
};
