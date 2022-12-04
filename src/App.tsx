import './App.css';

import Events from './pages/Events';
import EventHome from './pages/components/EventHome';
import SimpleBottomNavigation from './BottomNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/events" element={<Events />} />
          {/* this is not the best way to do the below: https://reactrouter.com/en/main/route/route */ }
          <Route path = "/events/*" element={<EventHome robotEventsCode={"RE-VRC-22-9266"} />} />
          <Route path = "/teams" element={<Teams />} />
        </Routes>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
