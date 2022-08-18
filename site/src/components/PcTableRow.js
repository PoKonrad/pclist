import {
  TableCell,
  IconButton,
  ButtonGroup,
  TableRow,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import EditPc from "./EditPc";
import api from "../scripts/api";

const PcTableRow = ({ row, refreshTabData }) => {
  const [edit, setEdit] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData.roles.includes("admin")) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, []);

  const handleEditButton = () => {
    setEdit(!edit);
  };

  const handleDelete = async () => {
    try {
      await api.post(`/api/data/${row.id}/delete`);
      setDeleteDialog(false);
      await refreshTabData();
    } catch (error) {
      // To do
    }
  };
  const [deleteDialog, setDeleteDialog] = useState(false);
  return (
    <>
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.cpu}</TableCell>
        <TableCell>{row.gpu}</TableCell>
        <TableCell>{row.ram}</TableCell>
        <TableCell sx={{ padding: "0.5rem" }} align="right">
          <ButtonGroup>
            <IconButton disabled={!admin} onClick={handleEditButton}>
              <EditIcon />
            </IconButton>
            <IconButton
              disabled={!admin}
              onClick={() => {
                setDeleteDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <EditPc
            show={edit}
            placeholders={row}
            refreshTabData={refreshTabData}
            id={row.id}
          />
        </TableCell>
      </TableRow>

      <Dialog open={deleteDialog}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            onClick={() => {
              setDeleteDialog(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PcTableRow;
