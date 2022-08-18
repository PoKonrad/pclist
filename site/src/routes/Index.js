import { Container } from '@mui/system'
import React from 'react'
import PcTable from '../components/PcTable'

const Index = () => {
  return (
    <Container sx={{
      display: 'flex',
      marginTop: '2rem'
    }}>
    <PcTable />
    </Container>
  )
}

export default Index