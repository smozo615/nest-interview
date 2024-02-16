import { ReactNode, useState, useEffect } from "react";
import { Box, CssBaseline, Divider, Grid, List, Toolbar } from "@mui/material";

import AppBar from "./AppBar";
import Drawer from "./Drawer";
import { Copyright } from "@mui/icons-material";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { ListItems } from "./ListItems";
import { AppStore } from "@ocmi/frontend/redux/store";
import { setDrawerOpen } from "@ocmi/frontend/redux/slices/app.slice";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const appState = useSelector((state: AppStore) => state.appState);
  // const sessionState = useSelector((state: AppStore) => state.authState);
  const dispatcher = useDispatch();
  // const router = useRouter();
  const [open, setOpen] = useState(appState.drawerOpen);

  const toggleDrawer = () => {
    // setOpen(!appState.drawerOpen);
    dispatcher(setDrawerOpen(!appState.drawerOpen));
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("render layout");

    // if (!sessionState.accessToken) {
    //   router.push(ROUTE_LINK_LOGIN);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOpen(appState.drawerOpen);
  }, [appState.drawerOpen]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open} toggleDrawer={toggleDrawer} />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: [0],
              py: 1,
            }}
          >
            {!!open ? (
              <Image
                src="/img/logo-classic.png"
                alt="Logo"
                priority={true}
                width={220}
                height={95}
              />
            ) : null}
          </Toolbar>
          <Divider />
          <List component="nav" sx={{ minHeight: "100vh" }}>
            <ListItems />
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
            overflow: "auto",
            width: "100%",
            position: "relative",
          }}
        >
          <Toolbar />
          <Grid container sx={{ p: 2, zIndex: 1000, position: "relative" }}>
            <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
              {children}
            </Box>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </>
  );
}
