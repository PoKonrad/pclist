import { Button, ButtonGroup, IconButton, Input, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../scripts/api.js'
import PcTableRow from './PcTableRow.js';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// const rows = [
//     {
//         name: 'fghjghj',
//         cpu: 'fghj',
//         gpu: '4324',
//         ram: '16GB'
//     },
//     {
//         name: 'fgjhgfjh',
//         cpu: 'fgjhghj',
//         gpu: '4324',
//         ram: '16GB'
//     },
//     {
//         name: 'gfjh',
//         cpu: 'ghjghj',
//         gpu: '4324',
//         ram: '16GB'
//     }
// ]

const PcTable = () => {

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


  return (
    <TableContainer component={Paper} sx={{width: '100rem'}}>
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
                    <PcTableRow row={row} />
                )) : ""}
            </TableBody>
            <TableFooter>
                <IconButton onClick={() => page === 0 ? null : setPage(page - 1)}><KeyboardArrowLeftIcon /></IconButton>
                <IconButton onClick={() => setPage(page + 1)}><KeyboardArrowRightIcon /></IconButton>
            </TableFooter>
        </Table>
    </TableContainer>
  )
 }

export default PcTable