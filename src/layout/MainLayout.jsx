import { Outlet, NavLink, useNavigation } from "react-router-dom";
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

export default function MainLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

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
            <Button sx={{ textTransform: "uppercase" }}>map</Button>
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
