import { useNavigate } from "react-router-dom"
import useField from "../../util/useField"
import { signUp } from "../../services/user"
import { TextField, Button, Box, Typography } from "@mui/material"

const SignupForm = () => {
    const nameField = useField("text")
    const usernameField = useField("text")
    const passwordField = useField("password")
    const confirmPasswordField = useField("password")
    const emailField = useField("email")
    const phoneNumberField = useField("tel")

    const navigate = useNavigate()
    const redirect = () => {
        navigate('/login')
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        if (passwordField.field.value !== confirmPasswordField.field.value) {
            return null
        }
        await signUp({
            username: usernameField.field.value,
            password: passwordField.field.value,
            name: nameField.field.value,
            email: emailField.field.value,
            phoneNumber: phoneNumberField.field.value
        })
        usernameField.reset()
        passwordField.reset()
        confirmPasswordField.reset()
        nameField.reset()
        emailField.reset()
        phoneNumberField.reset()
        navigate('/login')
    }

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">Sign Up</Typography>
            <TextField label="Name" fullWidth margin="normal" {...nameField.field} />
            <TextField label="Username" fullWidth margin="normal" {...usernameField.field} />
            <TextField label="Password" fullWidth margin="normal" {...passwordField.field} />
            <TextField label="Confirm Password"  fullWidth margin="normal" {...confirmPasswordField.field} />
            <TextField label="Email" fullWidth margin="normal" {...emailField.field} />
            <TextField label="Phone Number" fullWidth margin="normal" {...phoneNumberField.field} />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Sign Up
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
                Already have an account?
            </Typography>
            <Button variant="outlined" onClick={redirect} fullWidth sx={{ mt: 1 }}>
                Log in
            </Button>
        </Box>
    )
}

export default SignupForm
