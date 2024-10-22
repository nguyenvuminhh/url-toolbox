import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { textColor } from "../../theme"

const UrlButton = ({ path }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/analysis' + path)
    }
    return (
        <Button
            fullWidth
            variant="contained" 
            color={textColor} 
            sx={{ mb: 1, p:1.5, textTransform: 'none'  }} 
            onClick={handleClick}
        >
            {path}
        </Button>
    )
}

export default UrlButton