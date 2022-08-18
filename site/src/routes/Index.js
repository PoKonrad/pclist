import { AppBar, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PcTable from "../components/PcTable";
import api from "../scripts/api";

const Index = () => {
  const [addDataCollapse, setAddDataCollapse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <>
      <AppBar position="static">
        <Container
          maxWidth="1x"
          sx={{
            height: "4rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography>Computer List</Typography>
          <Button
            variant="text"
            color="inherit"
            onClick={() => setAddDataCollapse(!addDataCollapse)}
          >
            Add Computer
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              api.logOut();
              navigate("/login", { replace: true });
            }}
          >
            Log Off
          </Button>
          <Button></Button>
        </Container>
      </AppBar>
      <Container
        sx={{
          display: "flex",
          marginTop: "2rem",
        }}
      >
        <PcTable newDialogShown={addDataCollapse} />
      </Container>
    </>
  );
};

export default Index;
