import { Outlet, NavLink, useNavigation, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  LinearProgress,
  Button,
} from "@mui/material";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import Loading from "../components/loading/Loading";
import { configMenu } from "./configMenu";

export default function MainLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const location = useLocation();

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flex: 1,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FmdGoodRoundedIcon sx={{ color: "error.main" }} /> EXAM WEB APP
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {configMenu.map((item) => {
              return (
                <Button
                  component={NavLink}
                  to={item.path}
                  sx={{
                    textTransform: "uppercase",
                    color: "white",
                    px: 2,
                    borderRadius: 2,
                    transition: "background-color 0.3s",
                    "&.active":
                      location.pathname.toLowerCase() ===
                      item.path.toLowerCase()
                        ? { backgroundColor: "rgba(255,255,255,0.25)" }
                        : "",
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
        {isLoading && <Loading />}
      </AppBar>

      <Box component="main" sx={{ py: 3 }}>
        <Container maxWidth={false}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
