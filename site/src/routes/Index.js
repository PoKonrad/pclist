import { AppBar, Button, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import PcTable from '../components/PcTable'
import NewPc from '../components/NewPc'

const Index = () => {
  const [addDataCollapse, setAddDataCollapse] = useState(false)
  return (
    <>
    <AppBar position="static">
        <Container
          maxWidth="1x"
          sx={{ height: "4rem", display: "flex", alignItems: "center", gap: '1rem' }}
        >
          <Typography>Computer List</Typography>
          <Button variant="text" color="inherit">User List</Button>
          <Button variant="text" color="inherit" onClick={() => setAddDataCollapse(!addDataCollapse)}>Add Computer</Button>
          <Button variant="text" color="inherit">Log Off</Button>
          <Button></Button>
        </Container>
      </AppBar>
        <NewPc show={addDataCollapse}></NewPc>
    <Container sx={{
      display: 'flex',
      marginTop: '2rem'
    }}>
    <PcTable />
    </Container>
    </>
  )
}

export default Index