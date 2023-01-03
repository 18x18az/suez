import { Box } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText, Divider} from '@mui/material';
import { Component, Fragment } from 'react';
import { bifrost } from '../ws';
import { ITeams, IPath, ITeam } from '@18x18az/rosetta';
import Waiting from './components/Waiting';
import { Link } from 'react-router-dom';

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
            return(
                <div>
                { /*<h1>18x18az Suez</h1>*/}
                <Box sx={{ width: '100%'}}>
                    <nav>
                    <List>
                    {
                        teams.map((team: ITeam) => {
                            return (
                                <Fragment>
                                    <ListItem>
                                    <ListItemButton component={Link} to={`/teams/${team.number}`}>
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