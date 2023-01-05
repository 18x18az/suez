import './App.css';
import TopNav from './pages/components/TopNav';
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
import { SkillsRankings } from './pages/components/event/SkillsRankings';
import { QualRankings } from './pages/components/event/QualRankings';
import { Team } from './pages/components/Team';
import { Home } from './pages/components/event/Home';
import { Box } from '@mui/material';

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
        teams: payload,
        lastMessagePath: path,
        lastMessagePayload: payload
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
        <TopNav/>
          <Routes>
            <Route path="/"
              element={<Home
                teams={this.state.teams}
                matches={this.state.matches}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
            />}/>
            {/* how to do routes for teams: https://reactrouter.com/en/main/route/route */ }
            <Route path="/teams"
              element={<TeamList
                teams={this.state.teams}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
            />}/>
            <Route path = "/rankings/qual"
              element={<QualRankings
                teams={this.state.teams}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
            />}/>
            <Route path="/rankings/skills"
              element={<SkillsRankings
                teams={this.state.teams}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
            />}/>
            <Route path="/teams/:number"
              element={<Team
                teams={this.state.teams}
                lastMessagePath={this.state.lastMessagePath}
                lastMessageBody={this.state.lastMessagePayload}
              />}/>
          </Routes>
        </BrowserRouter>
      </div>
      </ThemeProvider>
    );
  }

}

export default App;
