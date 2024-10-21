import { useNavigate } from "react-router-dom"
import LoginForm from "./LoginForm.jsx"

const LoginPage = () => {
    const navigate = useNavigate()
    if (localStorage.getItem('token')) {
        navigate('/my-profile')
        return null
    }
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default LoginPage