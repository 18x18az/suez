import { IFieldState, IMatchList, IPath, ITeams } from '@18x18az/rosetta';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Component } from 'react';
import { bifrost } from '../../../ws';
import Waiting from '../Waiting';
import { Match } from './Match';

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
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={3}>
                                Upcoming Matches
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <Match teams={this.props.teams}/>

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