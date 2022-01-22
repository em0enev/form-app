import { Card, CardContent, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Profile() {
  const id = localStorage.getItem("id");

  const [userData, setUserData] = useState({
    // TEST DATA
    // email: "mail",
    // first_name: "first",
    // last_name: "second",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`https://reqres.in/api/users/${id}`);

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          throw new Error(
            `${res.status}: ${res.statusText} \n${await res.text()}`
          );
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchUserData();
  }, [id]);

  return (
    <Container>
      <Card sx={{ marginTop: "2rem" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography>Email : {userData["email"]}</Typography>
          <Typography>First name : {userData["first_name"]}</Typography>
          <Typography>Last name : {userData["last_name"]}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
