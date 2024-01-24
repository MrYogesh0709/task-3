import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { UserType } from "../hook/getUsers";
import { Close } from "@mui/icons-material";

interface UserDetailsDrawerProps {
  user: UserType;
  open: boolean;
  onClose: () => void;
}

const UserDetailsDrawer = ({ user, open, onClose }: UserDetailsDrawerProps) => {
  const formattedCreatedAt = new Date(user.createdAt).toLocaleString();
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={2} width="100%">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Avatar src={user.avatar} alt={`${user.profile.firstName} Avatar`} />
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
        <Typography variant="h5">
          {user.profile.firstName} {user.profile.lastName}
        </Typography>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary={`Username: ${user.profile.username}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Email: ${user.profile.email}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Job Title: ${user.jobTitle}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Bio: ${user.Bio}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Created At: ${formattedCreatedAt}`} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default UserDetailsDrawer;
