import { TextField, Typography, Button, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import api from '../scripts/api'

const NewPc = ({ show, refreshTabData }) => {
  const [name, setName] = useState('');
  const [cpu, setCpu] = useState('');
  const [gpu, setGpu] = useState('');
  const [ram, setRam] = useState('');
  const [inputsDisabled, setInputsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
  try {
    setInputsDisabled(true)
    await api.post('/api/data', {
        name: name,
        cpu: cpu,
        gpu: gpu,
        ram: ram
    }) 
    setInputsDisabled(false)
    await refreshTabData()
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
          Add items.
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
            onChange={(e) => setName(e.target.value)}
            disabled={inputsDisabled}
          ></TextField>
          <TextField
            label="CPU"
            onChange={(e) => setCpu(e.target.value)}
            disabled={inputsDisabled}
          ></TextField>
          <TextField
            label="GPU"
            onChange={(e) => setGpu(e.target.value)}
            disabled={inputsDisabled}
          ></TextField>
          <TextField
            label="RAM"
            onChange={(e) => setRam(e.target.value)}
            disabled={inputsDisabled}
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
