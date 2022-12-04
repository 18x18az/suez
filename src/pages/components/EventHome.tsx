import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import QualRankings from './event/QualRankings'

type EventProps = {
    robotEventsCode: String;
};
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
const EventHome = ({ robotEventsCode }: EventProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
        <Tab label="Info" {...a11yProps(0)} />
        <Tab label="Rankings" {...a11yProps(1)} />
        <Tab label="Schedule" {...a11yProps(2)} />
        <Tab label="Results" {...a11yProps(3)} />
      </Tabs>
    </Box>
      <TabPanel value={value} index={0}>
      Info
    </TabPanel>
    <TabPanel value={value} index={1}>
    <QualRankings/>
    </TabPanel>
    <TabPanel value={value} index={2}>
    Schedule
    </TabPanel>
    <TabPanel value={value} index={3}>
    Results
    </TabPanel>
    </Box>
    );
};

export default EventHome;