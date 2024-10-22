import { useState } from 'react'
import { Grid2, Box, TextField, Button, Typography } from '@mui/material'
import { backgroundColor, paneColor } from '../../theme'
import useField from '../../util/useField'

const NewUrlPane = () => {
    const checkingUrlField = useField('text')
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ checkingUrl, shortTag })
        setCheckingUrl('')
        setShortTag('')
    }
    return (
        <Grid2 item size={10}>
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    backgroundColor: backgroundColor,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
                    <Typography variant='h3' >Phising Detector</Typography>
                    <TextField
                        label="URL"
                        variant="outlined"
                        {...checkingUrlField.field}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Check
                    </Button>
                </Box>
            </Box>
        </Grid2>
    )
}

export default NewUrlPane
