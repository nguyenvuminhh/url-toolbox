import { Box, Grid2 } from "@mui/material"
import LeftPane from "./LeftPane"
import NewUrlPane from "./NewUrlPane"
import PhishingPane from "./PhishingPane"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const MainPane = () => {
    return (
        <Grid2 container spacing={1} sx={{ height: '97vh', width: '100%' }}>
            <LeftPane />
            <Routes>
                <Route path="/" element={<NewUrlPane />} />
                <Route path="/phishing-detector" element={<PhishingPane />} />
                {/* <Route path="/analysis" element={<Analysis />} />
                <Route path="/analysis/:id" element={<UrlAnalysis />} /> */}
            </Routes>
        </Grid2>
    )
}

export default MainPane
