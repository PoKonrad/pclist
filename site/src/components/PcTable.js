import { Button, ButtonGroup, IconButton, Input, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../scripts/api.js'
import PcTableRow from './PcTableRow.js';

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

    useEffect(() => {
        const getData = async () => {
            const resp = await api.get('/api/data/0-5')
            setRows(resp.data)
        }
        getData()
        console.log(rows)
    }, [])
    

  return (
    <TableContainer component={Paper} sx={{width: '100rem'}}>
        <Table aria-label='Table containing computers'>
            <TableHead>
                <TableRow>
                    <TableCell><Typography>PC Name</Typography></TableCell>
                    <TableCell><Typography>CPU</Typography></TableCell>
                    <TableCell><Typography>GPU</Typography></TableCell>
                    <TableCell><Typography>RAM</Typography></TableCell>
                    <TableCell align='right'><Input></Input></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows ? rows.map((row) => (
                    <PcTableRow row={row} />
                )) : ""}
            </TableBody>
        </Table>
        <TablePagination count={500}></TablePagination>
    </TableContainer>
  )
 }

export default PcTable