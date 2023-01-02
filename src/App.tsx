import './App.css';
import EventHome from './pages/components/EventHome';
import SimpleBottomNavigation from './pages/components/BottomNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamList from './pages/Teams';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Component } from 'react';
import { ITeams, IMatchList, IPath } from '@18x18az/rosetta';
import { bifrost } from './ws';

interface IProps {
}

interface IState {
  teams: ITeams | null
  matches: IMatchList | null
  lastMessagePath: IPath | null
  lastMessagePayload: any
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      teams: null,
      matches: null,
      lastMessagePath: null,
      lastMessagePayload: null
    }
    bifrost.postCb = this.messageHandler.bind(this);
    bifrost.get(['teams']);
    bifrost.get(['matches']);
  }

  messageHandler(path: IPath, payload: any) {
    console.log(path);
    console.log(payload);
    const route = path[0];
    if (route === "teams") {
      this.setState({
        teams: payload
      });
    } else if (route === "matches") {
      this.setState({
        matches: payload
      })
    } else {
      this.setState({
        lastMessagePath: path,
        lastMessagePayload: payload
      });
    }

    return null
  }
  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path = "/" element={<EventHome />} />
            {/* this is not the best way to do the below: https://reactrouter.com/en/main/route/route */ }
            <Route path = "/events/*" element={<EventHome />} />
            <Route path = "/teams" element={<TeamList />} />
          </Routes>
          <SimpleBottomNavigation />
        </BrowserRouter>
      </div>
      </ThemeProvider>
    );
  }

}

export default App;
