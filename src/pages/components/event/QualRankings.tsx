import { ITeams, IPath, IRankingData, IRankings } from '@18x18az/rosetta';
import { Box } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Component } from 'react';
import { bifrost } from '../../../ws';
import Waiting from '../Waiting';
import { Link } from 'react-router-dom';

interface QRankingsProps {
    teams: ITeams | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface QRankingsState {
    rankings: IRankings | null
}

function formatWPAPSP(data: IRankingData): string {
    let wp = data.avgWP;
    let ap = data.avgAP;
    let sp = data.avgSP;
    return wp + " / " + ap + " / " + sp;
}

export class QualRankings extends Component<QRankingsProps, QRankingsState> {
    constructor(props: QRankingsProps) {
        super(props);

        bifrost.get(['teams']);
        bifrost.get(['rankings']);
        this.state = {
            rankings: null
        }
    }

    static getDerivedStateFromProps(nextProps: QRankingsProps, prevState: QRankingsState) {
        if (nextProps.lastMessagePath) {
            if (nextProps.lastMessagePath[0] === "rankings") {
                return ({
                    rankings: nextProps.lastMessageBody
                })
            }
        }

        return null;
    }

    render() {
        if (this.state.rankings && this.props.teams) {

            return(
                <div>
                { /*<h1>18x18az Suez</h1>*/}
                <Box sx={{ width: '100%'}}>
                    <nav>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Team</TableCell>
                                    <TableCell align='center'>W-L-T</TableCell>
                                    <TableCell align='center'>WP / AP / SP</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                this.state.rankings.map((rankingData: IRankingData) => {
                                    return (
                                        <TableRow component={Link} to={`/teams/${this.props.teams![rankingData.team].number}`}
                                                    sx={{ textDecoration: 'none' }}>
                                            <TableCell align='left'><b>{rankingData.rank}.</b> {this.props.teams![rankingData.team].number}</TableCell>
                                            <TableCell align='center'>{rankingData.record}</TableCell>
                                            <TableCell align='center'>{formatWPAPSP(rankingData)}</TableCell>
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

}