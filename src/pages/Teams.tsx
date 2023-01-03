import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useEffect, Component, Fragment } from 'react';
import { bifrost } from '../ws';
import { ITeams, IPath, ITeam } from '@18x18az/rosetta';
import { CircularProgress } from '@mui/material';
import Waiting from './components/Waiting';

interface TeamListProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface TeamListState {
    teams: ITeams | null
}

class TeamList extends Component<TeamListProps, TeamListState> {
    constructor(props: TeamListProps) {
        super(props);
        this.state = {
            teams: props.teams
        }
        bifrost.get(['teams']);
    }

    static getDerivedStateFromProps(nextProps: TeamListProps, prevState: TeamListState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "teams") {
                console.log(nextProps.lastMessageBody);
                return { teams: nextProps.lastMessageBody };
            }
            else {
                return { teams: prevState.teams };
            }
        }
        else {
            return { teams: prevState.teams };
        }
    }

    render() {
        console.log(this.state.teams)
        if (this.state.teams) {
            let teams: ITeam[] = [];

            for (const property in this.state.teams) {
                let team: ITeam = {
                    number: this.state.teams[property].number,
                    name: this.state.teams[property].name,
                    location: this.state.teams[property].location,
                    school: this.state.teams[property].school
                };
                teams.push(team);
            }
            console.log(teams);
            return(
                <div>
                { /*<h1>18x18az Suez</h1>*/}
                <Box sx={{ width: '100%', marginBottom: '20vh' }}>
                    <nav>
                    <List>
                    {
                        teams.map((team: ITeam) => {
                            return (
                                <Fragment>
                                    <ListItem>
                                    <ListItemButton component="a" href="#">
                                    <ListItemText primary={team.number} secondary={team.name}/>
                                    </ListItemButton>
                                    </ListItem>
                                    <Divider />
                                </Fragment>
                            )
                        })
                    }
                    </List>
                    </nav>
                </Box>
                </div>
            );
        }
        else {
            return(
                <Waiting />
            );
        }

    }


};

export default TeamList;