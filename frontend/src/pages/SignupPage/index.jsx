import { useNavigate } from "react-router-dom"
import SignupForm from "./SignupForm"

const SignupPage = () => {
    const navigate = useNavigate()

    if (localStorage.getItem('token')) {
        navigate('/my-profile')
        return null
    }
    return (
        <div>
            <SignupForm />
        </div>
    )
}

export default SignupPage