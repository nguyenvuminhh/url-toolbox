import { Grid2, Box, TextField, Button, Typography } from '@mui/material'
import { backgroundColor, paneColor } from '../../theme'
import { useState } from 'react'
import useField from '../../util/useField'
import { newShortenedUrl } from '../../services/url'

const NewUrlPane = () => {
    const longUrlField = useField("text")
    const shortUrlField = useField("text")
    const handleSubmit = async (e) => {
        e.preventDefault()
        await newShortenedUrl({ 
            longUrl: longUrlField.field.value, 
            shortUrl: shortUrlField.field.value
        })
        shortUrlField.reset()
        longUrlField.reset()
        console.log('okok')
    }
    
    return (
        <Grid2 item size={10}>
        
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
                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
                    <Typography variant='h3' >URL Shortener</Typography>
                    <TextField
                        label="Long URL"
                        variant="outlined"
                        {...longUrlField.field}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Shortened URL Tag"
                        variant="outlined"
                        {...shortUrlField.field}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Create
                    </Button>
                </Box>
            </Box>
        </Grid2>
    )
}

export default NewUrlPane
