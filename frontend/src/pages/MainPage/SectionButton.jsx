import { Button } from "@mui/material"
import { highlightColor, paneColor, textColor } from "../../theme"
import { useNavigate, useLocation } from "react-router-dom"

const SectionButton = ({ sectionName, path }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(path)
    }
    const isInPath = useLocation().pathname === path

    return (
        <Button 
            fullWidth 
            variant="text" 
            color={textColor} 
            sx={{ mb: 1, backgroundColor: isInPath ? highlightColor: paneColor }} 
            onClick={handleClick}
        >
            {sectionName}
        </Button>
    )
}

export default SectionButton