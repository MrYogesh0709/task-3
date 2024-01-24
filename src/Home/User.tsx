import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { UserType } from "../hook/getUsers";
import UserDetailsDrawer from "./UserDetailsDrawer";
import { useState } from "react";

const User = ({
  user,
  handleClick,
}: {
  user: UserType;
  handleClick: (user: UserType) => void;
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickWithScroll = (user: UserType) => {
    handleClick(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Avatar
          src={user.avatar}
          alt={user.profile.firstName.charAt(0)}
          sx={{ mt: 2 }}
        ></Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" color="text.primary">
            {user.profile.firstName} {user.profile.lastName}
          </Typography>
          <Typography color="text.secondary">{user.jobTitle}</Typography>
          <Typography color="text.secondary">
            {user.Bio.substring(0, 100)}
          </Typography>
          <Typography color="text.secondary">
            <Button
              component="span"
              color="inherit"
              sx={{ p: 0, textTransform: "none" }}
              onClick={() => {
                {
                  isSmallScreen && handleDrawerOpen();
                }
                handleClickWithScroll(user);
              }}
            >
              Other Info...
            </Button>
          </Typography>
        </Box>
      </Box>
      <Divider aria-hidden="true" />
      {isSmallScreen && (
        <UserDetailsDrawer
          user={user}
          open={drawerOpen}
          onClose={handleDrawerClose}
        />
      )}
    </>
  );
};

export default User;
