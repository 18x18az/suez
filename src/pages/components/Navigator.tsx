import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import './Navigator.css';

const Navigator = () => {
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab color="primary" variant="extended" aria-label="add" className="fab">
          Navigate
        </Fab>
      </Box>
    );
};

export default Navigator;