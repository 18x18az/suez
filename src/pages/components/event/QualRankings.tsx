import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

const QualRankings = () => {
    return(
        <div>
        { /*<h1>18x18az Suez</h1>*/}
        <Box sx={{ width: '100%', marginBottom: '20vh' }}>
            <nav>
                <List>
                    <Divider />
                    <ListItem>
                        <ListItemButton component="a" href="#">
                        <ListItemText primary="1: 99067B" secondary="(6-0-0) 12 WPs 55 APs 140 SPs" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <ListItemButton component="a" href="#">
                        <ListItemText primary="2: 7996D" secondary="(5-1-0) 10 WPs 60 APs 290 SPs" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </List>
            </nav>
        </Box>
        </div>
    );
};

export default QualRankings;