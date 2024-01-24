import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import useGetUsers from "../hook/getUsers";
import User from "./User";
import { useState } from "react";

function Home() {
  const [users, loading, isError, errorMessage] = useGetUsers();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPageCount = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          <Typography variant="h3">All User</Typography>
          <Divider aria-hidden="true" />
          {/* users */}
          {displayedUsers.map((user, i) => (
            <User user={user} key={i} />
          ))}
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
