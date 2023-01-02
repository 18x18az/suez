import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
import { bifrost } from '../ws';

const TeamList = () => {
    useEffect(() => {
        bifrost.get(['teams']);
    });

    return(
        <div>
        { /*<h1>18x18az Suez</h1>*/}
        <Box sx={{ width: '100%', marginBottom: '20vh' }}>
            <nav>
                <List>
                    <Divider />
                    <ListItem>
                        <ListItemButton component="a" href="#">
                        <ListItemText primary="127C" secondary="Lemon Bots" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <ListItemButton component="a" href="#">
                        <ListItemText primary="538K" secondary="Mechanical Mayhem" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <ListItemButton component="a" href="#">
                        <ListItemText primary="6030J" secondary="Jesters" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </List>
            </nav>
        </Box>
        </div>
    );
};

export default TeamList;