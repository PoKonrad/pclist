import { Button, ButtonGroup, IconButton, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'

const rows = [
    {
        name: 'fghjghj',
        cpu: 'fghj',
        gpu: '4324',
        ram: '16GB'
    },
    {
        name: 'fgjhgfjh',
        cpu: 'fgjhghj',
        gpu: '4324',
        ram: '16GB'
    },
    {
        name: 'gfjh',
        cpu: 'ghjghj',
        gpu: '4324',
        ram: '16GB'
    }
]

const PcTable = () => {
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
                {rows.map((row) => (
                    <TableRow
                        key={row.id}
                    >
                    <TableCell>{row.name}</TableCell>        
                    <TableCell>{row.cpu}</TableCell>        
                    <TableCell>{row.gpu}</TableCell>        
                    <TableCell>{row.ram}</TableCell>        
                    <TableCell sx={{padding: '0.5rem'}} align='right'>
                        <ButtonGroup>
                            <IconButton><EditIcon /></IconButton>
                            <IconButton><DeleteIcon /></IconButton>
                        </ButtonGroup>
                    </TableCell>            
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default PcTable