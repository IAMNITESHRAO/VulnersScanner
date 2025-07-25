'use client'
import React from 'react'
import { Box, Radio } from '@mui/material'

const DefaultRadio = () => {
  // 2
  const [checked, setChecked] = React.useState(true)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
      }}>
      <Radio
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Radio
        disabled
        inputProps={{ 'aria-label': 'disabled checked checkbox' }}
      />
      <Radio
        color='default'
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />
    </Box>
  )
}

export default DefaultRadio
