import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
        { /*<h1>18x18az Suez</h1>*/}
        <Box sx={{ width: '100%', marginBottom: '20vh' }}>
            <nav>
                <h2>Upcoming Events</h2>
                <List>
                    <ListItem component={Link} to="/events/RE-VRC-22-9266" style={{ textDecoration: 'none', color: '#fff'}}>
                        <ListItemButton component="a" href="#">
                        <ListItemText primary="Desert Ridge High School Jingle Spin up Blended MS&HS, In-Person, with Standard Judging" secondary="December 10 2022" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton component={Link} to="/events/RE-VRC-22-9269" style={{ textDecoration: 'none', color: '#fff'}}>
                        <ListItemText primary="Desert Ridge High School Let's Spin up Blended MS&HS, In-Person, with Standard Judging" secondary="January 7 2023" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton component="a" href="#">
                        <ListItemText primary="2022-2023 Arizona College Prep High School VRC Qualifier (Blended) (In-person Judging) " secondary="January 14 2023" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <ListItemButton component="a" href="#">
                        <ListItemText primary="Arizona College Prep Middle School VRC Qualifier (Blended, In-Person Judging) " secondary="January 21 2023" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </List>
            </nav>
        </Box>
        </div>


    );
};

export default Home;