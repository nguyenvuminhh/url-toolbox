import { Box, Button, Grid2, Stack, Typography } from "@mui/material"
import { backgroundColor, textColor } from "../../theme"
import UrlButton from "./UrlButton"
import { useQuery } from "@tanstack/react-query"
import { getAllUrls } from "../../services/user"

const AnalysisPane = () => {
    //TODO: add actual url
    const fetchAllUrls = useQuery({
        queryKey: ['fetchAllUrls'],
        queryFn: getAllUrls,
        refetchOnWindowFocus: false
    })
    const userUrls = fetchAllUrls.data
    if (!userUrls) {
        return <p>loading...</p>
    }
    return (
        <Grid2 item size={10}>
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    backgroundColor: backgroundColor,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ width:'50%', maxWidth: 700, mx: 'auto', mt: 4 }}>
                <Typography variant='h3'>Your URLs</Typography>
                <Stack spacing={2} >
                    {userUrls.map(urlObj => <UrlButton key={urlObj.shortUrl} path={'/'+urlObj.shortUrl} />)}

                </Stack>
            </Box>
            </Box>
        </Grid2>

    )
}

export default AnalysisPane