import { IAllianceTeams, IMatchInfo, ITeams, TeamId } from "@18x18az/rosetta";
import { TableRow, TableCell, Table } from "@mui/material";
import { makeShortMatchName } from "../../../utils/TextGenerator";
import './Match.css';

interface TeamProps {
    id: TeamId
    color: string
    teams: ITeams
}

const Team = (props: TeamProps) => {
    return (
        <p className={props.color}>{props.teams[props.id].number}</p>
    )
}
interface MatchProps {
    match: IMatchInfo
    teams: ITeams
}

export const Match = (props: MatchProps) => {
    const matchName = makeShortMatchName(props.match);
    const red: IAllianceTeams | string = props.match.red;
    const blue: IAllianceTeams | string = props.match.blue;
    return (
        <TableRow>
            <TableCell align="center">
                <Team id={(red as IAllianceTeams).team1} color={"redMatch"} teams={props.teams}/>
                <Team id={(red as IAllianceTeams).team2} color={"redMatch"} teams={props.teams}/>
            </TableCell>
            <TableCell align="center">
                <h2 className="matchName">{matchName}</h2>
            </TableCell>
            <TableCell align="center">
                <Team id={(blue as IAllianceTeams).team1} color={"blueMatch"} teams={props.teams}/>
                <Team id={(blue as IAllianceTeams).team2} color={"blueMatch"} teams={props.teams}/>
            </TableCell>
        </TableRow>
    )
}