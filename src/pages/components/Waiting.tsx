import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
const Waiting = () => {
    return (
        <Box>
            <h1>Waiting for data...</h1>
            <CircularProgress />
        </Box>
    )
}

export default Waiting;