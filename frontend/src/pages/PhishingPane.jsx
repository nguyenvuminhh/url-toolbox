import { useState } from 'react'
import { Grid2, Box, TextField, Button, Typography } from '@mui/material'
import { backgroundColor, paneColor } from '../theme'

const NewUrlPane = () => {
    const [checkingUrl, setCheckingUrl] = useState('')

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
                display: 'flex',
                backgroundColor: backgroundColor,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                    height: '100%',
                    display: 'flex',
                    backgroundColor: backgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                    }}
                >
                <Typography variant='h3' >Phishing Detector</Typography>

                <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                    <div>
                    <TextField
                        label="URL"
                        variant="outlined"
                        value={checkingUrl}
                        onChange={(e) => setCheckingUrl(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    </div>
                    
                    <div>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Check
                    </Button>
                    </div>
                </form>
                </Box>
            </Box>
        </Grid2>
    )
}

export default NewUrlPane
