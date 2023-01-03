import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const TopNav = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        <Tab label="Queuing" component={Link} to={"/"}/>
        <Tab label="Qual Rankings" component={Link} to={"/rankings/qual"}/>
        <Tab label="Skills Rankings" component={Link} to={"/rankings/skills"}/>
        <Tab label="Team List"component={Link} to={"/teams"}/>
      </Tabs>
    </Box>
    </Box>
    );
};

export default TopNav;