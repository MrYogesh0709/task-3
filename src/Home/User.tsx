import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { UserType } from "../hook/getUsers";
import UserDetailsDrawer from "./UserDetailsDrawer";
import { useState } from "react";

const User = ({ user }: { user: UserType }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={user.avatar}
          alt={user.profile.firstName.charAt(0)}
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
                handleDrawerOpen();
              }}
            >
              Other Info...
            </Button>
          </Typography>
        </Box>
      </Box>
      <Divider aria-hidden="true" />
      <UserDetailsDrawer
        user={user}
        open={drawerOpen}
        onClose={handleDrawerClose}
      />
    </>
  );
};

export default User;
