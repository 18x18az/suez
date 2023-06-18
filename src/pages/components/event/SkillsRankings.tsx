import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ITeams, IPath, ISkillsRankings, ISkillsRankingData } from '@18x18az/rosetta';
import { Component } from 'react';
import { bifrost } from '../../../ws';
import Waiting from '../Waiting';
import { Link } from 'react-router-dom';

interface SRankingsProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface SRankingsState {
    rankings: ISkillsRankings | null
}

export class SkillsRankings extends Component<SRankingsProps, SRankingsState> {
    constructor(props: SRankingsProps) {
        super(props);

        bifrost.get(['skills']);
        this.state = {
            rankings: null
        }
    }

    static getDerivedStateFromProps(nextProps: SRankingsProps, prevState: SRankingsState) {
        if (nextProps.lastMessagePath) {
            if (nextProps.lastMessagePath[0] === "skills") {
                return ({
                    rankings: nextProps.lastMessageBody
                })
            }
        }

        return null;
    }

    render() {
        if (this.props.teams && this.state.rankings) {
            return (
                <div>
                <Box sx={{ width: '100%' }}>
                    <nav>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width='40%' align='left'>Team</TableCell>
                                    <TableCell width='20%' align='center'>Total</TableCell>
                                    <TableCell width='20%' align='center'>Highest Coding</TableCell>
                                    <TableCell width='20%' align='center'>Highest Driving</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.rankings.map((skillsData: ISkillsRankingData) => {
                                        return (
                                            <TableRow component={Link} to={`/teams/${this.props.teams![skillsData.team].number}`}
                                                        sx={{ textDecoration: 'none' }}>
                                                <TableCell><b><span style={{fontSize: '1.5rem'}}>{skillsData.rank}.</span></b> <span style={{fontSize: '1rem'}}>{this.props.teams![skillsData.team].number}</span></TableCell>
                                                <TableCell align='center'>{skillsData.total}</TableCell>
                                                <TableCell align='center'>{skillsData.highProgramming}</TableCell>
                                                <TableCell align='center'>{skillsData.highDriver}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </nav>
                </Box>
                </div>
            );
        }
        else {
            return (
                <Waiting />
            )
        }

    }
};