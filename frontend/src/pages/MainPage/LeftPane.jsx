import { Box, Button, Grid2, Typography } from "@mui/material"
import { backgroundColor, paneColor, primaryColor, textColor } from "../../theme"
import SectionButton from "./SectionButton"
import logo from '../../full-logo.svg'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const LoginAndSignupButtons = () => {
    const navigate = useNavigate()
    const redirectSignup = () => {
        navigate('/signup')
    }
    const redirectLogin = () => {
        navigate('/login')
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 'auto' }}>
            <Button variant="contained" onClick={redirectLogin} sx={{ mb: 1, backgroundColor:primaryColor, color:backgroundColor }}>
                Login
            </Button>
            <Typography variant="body2" color={textColor} sx={{ mb: 1 }}>
                or
            </Typography>
            <Button variant="outlined" onClick={redirectSignup} sx={{ borderColor:primaryColor, color:textColor }}>
                Signup
            </Button>
        </Box>
    )
}

const LogoutButton = ({ setLoginState }) => {
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('name')
        localStorage.removeItem('id')
        setLoginState(false)
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 'auto' }}>
            <Button variant="contained" onClick={logout} sx={{ mb: 1, backgroundColor:primaryColor, color:backgroundColor }}>
                Logout
            </Button>
            
        </Box>
    )
}


const LeftPane = () => {
    const [loginState, setLoginState] = useState(!!localStorage.getItem('token'))
    return (
        <Grid2 item="true" size={2}>
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
                    <SectionButton sectionName={'URLs Analysis'} path='/analysis' />
                </Box>
                {loginState ? <LogoutButton setLoginState={setLoginState}/> : <LoginAndSignupButtons />}
            </Box>
        </Grid2>
    )
}

export default LeftPane
