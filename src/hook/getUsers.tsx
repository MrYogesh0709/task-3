import axios from "axios";
import { useEffect, useState } from "react";

export type UserType = {
  createdAt: string;
  avatar: string;
  Bio: string;
  jobTitle: string;
  profile: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  id: string;
};

type UsersType = UserType[];
const URL = "https://602e7c2c4410730017c50b9d.mockapi.io";
const useGetUsers = () => {
  const [users, setUsers] = useState<UsersType>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setIsError(false);
        setErrorMessage("");
        const { data } = await axios(`${URL}/users`);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error || "something went wrong");
        setLoading(false);
        setIsError(true);
        setErrorMessage("Something Went Wrong try again...");
      }
    };
    getData();
  }, []);
  return [users, loading, isError, errorMessage] as const;
};

export default useGetUsers;
