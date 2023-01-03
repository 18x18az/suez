import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { AppBar } from '@mui/material';

const currentTab = () => {
  let path = window.location.pathname;
  if (path === "/") return 0;
  else if (path === "/rankings/qual") return 1;
  else if (path === "/rankings/skills") return 2;
  else if (path.substring(0,6) === "/teams") return 3;
}
const TopNav = () => {
  const [value, setValue] = useState(currentTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <AppBar position="sticky">
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        <Tab label="Queuing" component={Link} to={"/"}/>
        <Tab label="Qual Rankings" component={Link} to={"/rankings/qual"}/>
        <Tab label="Skills Rankings" component={Link} to={"/rankings/skills"}/>
        <Tab label="Team List"component={Link} to={"/teams"}/>
      </Tabs>
      </AppBar>
    </Box>
    </Box>
    );
};

export default TopNav;