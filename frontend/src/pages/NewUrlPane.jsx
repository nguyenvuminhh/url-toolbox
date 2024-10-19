import { Grid2, Box, TextField, Button, Typography } from '@mui/material'
import { backgroundColor, paneColor } from '../theme'
import { useState } from 'react'

const NewUrlPane = () => {
    const [longUrl, setLongUrl] = useState('')
    const [shortTag, setShortTag] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ longUrl, shortTag })
        setLongUrl('')
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
            <Typography variant='h3' >URL Shortener</Typography>

            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                <div>
                <TextField
                    label="Long URL"
                    variant="outlined"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                </div>
                <div>
                <TextField
                    label="Shortened URL Tag"
                    variant="outlined"
                    value={shortTag}
                    onChange={(e) => setShortTag(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                </div>
                <div>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create
                </Button>
                </div>
            </form>
            </Box>
        </Box>
        </Grid2>
    )
}

export default NewUrlPane
