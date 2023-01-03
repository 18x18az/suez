import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ITeams, IPath, ISkillsRankings, ISkillsRankingData } from '@18x18az/rosetta';
import { Component } from 'react';
import { bifrost } from '../../../ws';
import Waiting from '../Waiting';

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
                { /*<h1>18x18az Suez</h1>*/}
                <Box sx={{ width: '100%', marginBottom: '20vh' }}>
                    <nav>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Team</TableCell>
                                    <TableCell align='center'>Total</TableCell>
                                    <TableCell align='center'>Highest Programming</TableCell>
                                    <TableCell align='center'>Highest Driver</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.rankings.map((skillsData: ISkillsRankingData) => {
                                        return (
                                            <TableRow>
                                                <TableCell><b>{skillsData.rank}.</b> {this.props.teams![skillsData.team].number}</TableCell>
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