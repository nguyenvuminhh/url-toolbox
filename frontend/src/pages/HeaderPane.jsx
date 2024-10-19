import { Box, Grid2 } from "@mui/material"

const HeaderPane = () => {
    return (
        <Grid2 item xl={12}>
            <Box
                sx={{
                    backgroundColor: 'lightgray',
                    height: '100%',
                    width:'100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5
                }}
            >
            Top Bar (33333333333333)
            </Box>
       </Grid2>
    )
}

export default HeaderPane