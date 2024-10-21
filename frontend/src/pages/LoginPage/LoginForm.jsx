import { useNavigate } from "react-router-dom"
import { Button, TextField, Box, Typography } from "@mui/material"
import useField from "../../util/useField"
import { login } from "../../services/login"

const LoginForm = () => {
    const navigate = useNavigate()
    const usernameField = useField("text")
    const passwordField = useField("password")
    const redirect = () => {
        navigate('/signup')
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        const resData = await login({
            username: usernameField.field.value,
            password: passwordField.field.value
        })
        localStorage.setItem("id", resData.id)
        localStorage.setItem("name", resData.name)
        localStorage.setItem("token", resData.token)
        localStorage.setItem("username", resData.username)
        usernameField.reset()
        passwordField.reset()
        navigate('/')
    }

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 2 }}>Log In</Typography>
            <TextField label="Username" variant="outlined" fullWidth margin="normal" {...usernameField.field} />
            <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" {...passwordField.field}/>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Log in
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Don't have an account?
            </Typography>
            <Button variant="outlined" onClick={redirect} fullWidth sx={{ mt: 1 }}>
                Sign up
            </Button>
        </Box>
    )
}

export default LoginForm
