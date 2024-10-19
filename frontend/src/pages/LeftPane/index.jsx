import { Box, Button, Grid2, Typography } from "@mui/material"
import { backgroundColor, paneColor, primaryColor, textColor } from "../../theme"
import SectionButton from "./SectionButton"
import logo from '../../full-logo.svg'

const LeftPane = () => {
    return (
        <Grid2 item size={2}>
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: paneColor,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2, 
                    boxSizing: 'border-box',
                    borderRadius: 5
                }}
            >
                <Box sx={{ width: '100%', padding: '9px 0 19px 0' }}>
                    <a href="/" target="_blank">
                        <img src={logo} className="logo" alt="Vite logo" width='100%' />
                    </a>
                </Box>
                
                <Box sx={{ width: '100%' }}>
                    <SectionButton sectionName={'URL Shortener'} path='/' />
                    <SectionButton sectionName={'Phising Detector'} path='/phishing-detector' />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 'auto' }}>
                    <Button variant="contained"  sx={{ mb: 1, backgroundColor:primaryColor, color:backgroundColor }}>
                        Login
                    </Button>
                    <Typography variant="body2" color={textColor} sx={{ mb: 1 }}>
                        or
                    </Typography>
                    <Button variant="outlined" color='#2f27ce' sx={{ borderColor:primaryColor, color:textColor }}>
                        Signup
                    </Button>
                </Box>
            </Box>
        </Grid2>
    )
}

export default LeftPane
