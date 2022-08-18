import { TextField, Typography, Button, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import api from '../scripts/api'

const NewPc = ({ show, placeholders, id }) => {
  const [name, setName] = useState(placeholders.name);
  const [cpu, setCpu] = useState(placeholders.cpu);
  const [gpu, setGpu] = useState(placeholders.gpu);
  const [ram, setRam] = useState(placeholders.ram);

  const handleSubmit = async (e) => {
    e.preventDefault()
  try {
    await api.post(`/api/${id}/edit`, {
        name: name,
        cpu: cpu,
        gpu: gpu,
        ram: ram
    }) 
} catch(error) {
    // To do
    }
}
  return (
    <Collapse in={show}>
      <Box
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            margin: "2rem",
          }}
        >
          Add or edit items.
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <TextField
            label="PC Name"
            defaultValue={placeholders?.name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            label="CPU"
            defaultValue={placeholders?.cpu}
            onChange={(e) => setCpu(e.target.value)}
          ></TextField>
          <TextField
            label="GPU"
            defaultValue={placeholders?.gpu}
            onChange={(e) => setGpu(e.target.value)}
          ></TextField>
          <TextField
            label="RAM"
            defaultValue={placeholders?.ram}
            onChange={(e) => setRam(e.target.value)}
          ></TextField>
          <Button
            type="submit"
            sx={{
              padding: "0.5rem",
              margin: "0.5rem",
            }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Collapse>
  );
};

export default NewPc;
