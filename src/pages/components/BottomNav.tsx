import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Diversity3Icon from '@mui/icons-material/Diversity3';
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
          label="Live Event"
          icon={<EmojiEventsIcon />}
          value="Live Event"
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Team List"
          icon={<Diversity3Icon />}
          value="Team List"
          component={Link}
          to="/teams"
        />
      </BottomNavigation>
    </Box>
  );
}