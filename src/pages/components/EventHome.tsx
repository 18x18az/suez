import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Queuing from './event/Queuing';
import Rankings from './event/Rankings';
import QualRankings from './event/QualRankings';
import SkillsRankings from './event/SkillsRankings';
import TeamList from '../Teams';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const EventHome = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" centered={true}>
        <Tab label="Queuing" {...a11yProps(0)} />
        <Tab label="Qual Rankings" {...a11yProps(1)} />
        <Tab label="Skills Rankings" {...a11yProps(2)} />
        <Tab label="Team List" {...a11yProps(3)} />
      </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
      <Queuing />
    </TabPanel>
    <TabPanel value={value} index={1}>
    <QualRankings/>
    </TabPanel>
    <TabPanel value={value} index={2}>
    <SkillsRankings/>
    </TabPanel>
    <TabPanel value={value} index={3}>
    <TeamList/>
    </TabPanel>
    </Box>
    );
};

export default EventHome;