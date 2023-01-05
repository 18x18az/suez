import { IFieldState, IMatchList, IPath, ITeams } from '@18x18az/rosetta';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Component } from 'react';
import { bifrost } from '../../../ws';
import Waiting from '../Waiting';
import { Match } from './Match';
import { getNextMatches } from '../../../utils/Match';

interface QueuingProps {
    teams: ITeams | null,
    matches: IMatchList | null,
    lastMessagePath: IPath | null,
    lastMessageBody: any
}

interface QueuingState {
    field: IFieldState | null
}

export class Queuing extends Component<QueuingProps, QueuingState> {
    constructor(props: QueuingProps) {
        super(props);
        bifrost.get(["field"]);
        bifrost.get(["matches"]);
        this.state = {
            field: null
        }
    }

    static getDerivedStateFromProps(nextProps: QueuingProps, prevState: QueuingState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "field") {
                return ({
                    field: nextProps.lastMessageBody
                })
            }
        }

        return null;
    }

    render() {
        if (this.state.field && this.props.teams && this.props.matches) {
            const teams = this.props.teams;
            const state = this.state.field;
            const match = this.props.matches[state.match];
            const nextMatches = getNextMatches(this.props.matches, match, 5);

            let upcomingMatchItems = [];
            if (nextMatches) {
                for (let i = 0; i < nextMatches.length; i++) {
                    const match = nextMatches[i];
                    const matchItem = <Match teams={teams} match={match} />
                    upcomingMatchItems.push(matchItem);
                }
            }

            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={5}>
                                <h1 style={{ margin: 0 }}>Upcoming Matches</h1>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {upcomingMatchItems}
                    </TableBody>
                </Table>
            )
        }
        else {
            return (
                <Waiting />
            )
        }
    }
}