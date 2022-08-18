import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../scripts/api.js'
import PcTableRow from './PcTableRow.js';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NewPc from './NewPc.js';

const PcTable = ({ newDialogShown }) => {

    const [rows, setRows] = useState()
    const [page, setPage] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const resp = await api.get(`/api/data/${page * 5}-5`)
            setRows(resp.data)
        }
        getData()
    }, [page])

    const handleSearch = async (e) => {
        const resp = await api.get(`/api/data/${page * 5}-5/${e.target.value}`)
        setRows(resp.data)
    }

    const refreshTabData = async () => {
        const resp = await api.get(`/api/data/${page * 5}-5`)
        setRows(resp.data)
    }


  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    }}>
    <NewPc show={newDialogShown} refreshTabData={refreshTabData}></NewPc>
    <TableContainer component={Paper} sx={{width: '100%'}}>
        <Table aria-label='Table containing computers'>
            <TableHead>
                <TableRow>
                    <TableCell><Typography>PC Name</Typography></TableCell>
                    <TableCell><Typography>CPU</Typography></TableCell>
                    <TableCell><Typography>GPU</Typography></TableCell>
                    <TableCell><Typography>RAM</Typography></TableCell>
                    <TableCell align='right'><TextField label='Search' onChange={handleSearch}></TextField></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows ? rows.map((row) => (
                    <PcTableRow row={row} refreshTabData={refreshTabData} />
                )) : ""}
            </TableBody>
            <TableFooter>
                <IconButton onClick={() => page === 0 ? null : setPage(page - 1)}><KeyboardArrowLeftIcon /></IconButton>
                <IconButton onClick={() => setPage(page + 1)}><KeyboardArrowRightIcon /></IconButton>
            </TableFooter>
        </Table>
    </TableContainer>
    </Box>
  )
 }

export default PcTable