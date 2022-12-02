import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EventIcon from '@mui/icons-material/Event';
import { Link } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: window.innerWidth,  position: "fixed", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          value="home"
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Events"
          icon={<EventIcon />}
          value="events"
          component={Link}
          to="/events"
        />
        <BottomNavigationAction
          label="Teams"
          icon={<Diversity3Icon />}
          value="teams"
          component={Link}
          to="/teams"
        />
      </BottomNavigation>
    </Box>
  );
}