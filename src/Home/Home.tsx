import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useGetUsers, { UserType } from "../hook/getUsers";
import User from "./User";
import { useState } from "react";

function Home() {
  const [users, loading, isError, errorMessage] = useGetUsers();
  const theme = useTheme();
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPageCount = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedUser(null);
  };

  const handleUserClick = (user: UserType) => {
    setSelectedUser(user);
  };
  const formattedCreatedAt =
    selectedUser && new Date(selectedUser.createdAt).toLocaleString();

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  if (loading) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size="7em" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h3" sx={{ paddingTop: 2 }}>
          {errorMessage}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      {users.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            All User
          </Typography>
          <Divider aria-hidden="true" />
          {/* all users */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: `${selectedUser && isLargeScreen ? "50%" : "100%"}`,
              }}
            >
              {displayedUsers.map((user: UserType, i: number) => (
                <User user={user} key={i} handleClick={handleUserClick} />
              ))}
            </Box>
            {isLargeScreen && selectedUser && (
              <Divider orientation="vertical" flexItem />
            )}
            {isLargeScreen && selectedUser && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  width: "50%",
                }}
              >
                <Box p={2} width="100%">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Avatar
                      src={selectedUser.avatar}
                      alt={`${selectedUser.profile.firstName} Avatar`}
                    />
                    <Typography variant="h5">
                      {selectedUser.profile.firstName}{" "}
                      {selectedUser.profile.lastName}
                    </Typography>
                  </Box>

                  <Divider />
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={`Username: ${selectedUser.profile.username}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Email: ${selectedUser.profile.email}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Job Title: ${selectedUser.jobTitle}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Bio: ${selectedUser.Bio}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Created At: ${formattedCreatedAt}`}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            )}
          </Box>
          {/* pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
              my: 2,
            }}
          >
            {Array.from({ length: totalPageCount }, (_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" color="textSecondary">
            No Data to Show
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Home;
