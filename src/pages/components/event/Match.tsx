import { IMatchInfo, ITeams } from "@18x18az/rosetta";
import { TableRow, TableCell, Table } from "@mui/material";
import './Match.css';

interface TeamProps {
    number: string
    color: string
}

const Team = (props: TeamProps) => {
    return (
        <p className={props.color}>{props.number}</p>
    )
}
interface MatchProps {
    // match: IMatchInfo
    teams: ITeams
}

export const Match = (props: MatchProps) => {
    return (
        <TableRow>
            <TableCell align="center">
                <Team number={"RED1"} color={"redMatch"}/>
                <Team number={"RED2"} color={"redMatch"}/>
            </TableCell>
            <TableCell align="center">
                <h2 className="matchName">Q1</h2>
            </TableCell>
            <TableCell align="center">
                <Team number={"BLUE1"} color={"blueMatch"}/>
                <Team number={"BLUE2"} color={"blueMatch"}/>
            </TableCell>
        </TableRow>
    )
}