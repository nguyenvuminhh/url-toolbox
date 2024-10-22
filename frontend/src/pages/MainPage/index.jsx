import { Box, Grid2 } from "@mui/material"
import LeftPane from "./LeftPane"
import NewUrlPane from "./NewUrlPane"
import PhishingPane from "./PhishingPane"

import { BrowserRouter as Router, Route, Routes, useParams, useMatch } from "react-router-dom"
import AnalysisPane from "./AnalysisPane"
import DetailedAnalysisPane from "./DetailedAnalysisPane"

const MainPane = () => {
    const match = useMatch('/analysis/:url') 
    const url = match ? match.params.url : null
// TODO: clear all cache after log out
    return (
        <Grid2 container spacing={1} sx={{ height: '97vh', width: '100%' }}>
            <LeftPane />
            <Routes>
                <Route path="/" element={<NewUrlPane />} />
                <Route path="/phishing-detector" element={<PhishingPane />} />
                <Route path="/analysis" element={<AnalysisPane />} />
                <Route path="/analysis/:url" element={<DetailedAnalysisPane path={'/' + url}/>} />
            </Routes>
        </Grid2>
    )
}

export default MainPane
