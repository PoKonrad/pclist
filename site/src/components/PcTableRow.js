import { TableCell, IconButton, ButtonGroup, TableRow } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react'
import EditPc from './EditPc';
import api from '../scripts/api'

const PcTableRow = ({row}) => {
    const [edit, setEdit] = useState(false)

    const handleEditButton = () => {
        setEdit(!edit)
    }

    const handleDelete = async () => {
        try{
            api.post(`/api/data/${row.id}/delete`)
        } catch(error) {
            // To do
        }
    }

  return (
    <>
    <TableRow
        key={row.id}
    >
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.cpu}</TableCell>
    <TableCell>{row.gpu}</TableCell>
    <TableCell>{row.ram}</TableCell>
    <TableCell sx={{padding: '0.5rem'}} align='right'>
        <ButtonGroup>
            <IconButton onClick={handleEditButton} ><EditIcon/></IconButton>
            <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
        </ButtonGroup>
    </TableCell>
    </TableRow>
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
        <EditPc show={edit} placeholders={row} />
        </TableCell>
    </TableRow>
    </>
  )
}

export default PcTableRow